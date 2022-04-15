import request from 'request'
import utils from './utils'
import { oilPrice } from '../models/oilprice'
import xlsx from 'xlsx'
import { spawn } from 'child_process'
import errors from './errors'
import DfInfo from '../models/dfinfo'
import tradesService from '../services/tradesService'

export default {
    addOilPrice: (oilPriceService: any) => {
        request({
            uri: utils.oil_api_url_data(),
            headers: {
                'Authorization': `Token ${utils.oil_token()}`,
                'Content-Type': 'application/json'
            }
        }, (error, response, body) => {
            const data = JSON.parse(body)
            if (data.status === 'success') {
                const prices: any[] = data.data.prices
                oilPriceService.saveList(prices.map(it => ({ ...it, created_at: Date.parse(it.created_at) } as oilPrice)))
            } else {
                console.log(error)
                process.exit(1)
            }
        })
    },
    addBits: (name: string, Exchange: any, bitsService: any) => {
        const file = xlsx.readFile(name)
        const csvData: any[] = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
        try {
            bitsService.saveList(
                csvData.map(it => ({ timestamp: it.unix || it['Unix Timestamp'], symbol: it.symbol || it.Symbol, open: it.open || it.Open, high: it.high || it.High, low: it.low || it.Low, close: it.close || it.Close, volume_USD: it['Volume USD'], volume_BTC: it['Volume BTC'] })),
                Exchange
            )
        } catch (e) {
            throw e
        }

    },

    saveFileToDB: async (name: string) => {
        try {
            const start = 0, end = 9000
            const python = spawn('python3.8', ['python/readCSV.py', `docs/${name}`, `${start}`, `${end}`])

            const data = await new Promise((resolve, reject) => {
                python.stdout.on('data', resolve)
                python.stderr.on('data', reject)
            })

            const x: any[] = JSON.parse(data.toString())
            if (!x.length)
                throw new errors.InternalError('cannot read file')

            const tableName = name.replace('.csv', '')

        } catch (e) {
            throw e
        }

    },

    saveInfoToDB: async () => {
        try {
            const start = 0, end = 20
            const python = spawn('python3.8', ['python/readCSV.py', `docs/dfinfo.csv`, `${start}`, `${end}`])

            const data = await new Promise((resolve, reject) => {
                python.stdout.on('data', resolve)
                python.stderr.on('data', reject)
            })

            const x: any[] = JSON.parse(data.toString())
            const obj = {} as any

            x.forEach(it => {
                const k = String(it.Title).trim()
                obj[k] = k === 'key' ? Number(it.Value) : it.Value
            })

            await DfInfo.create(x)

            return true

        } catch (e) {
            throw e
        }
    },
    saveTradeToDB: async () => {
        try {
            let start = 0, end = 9000
            while (true) {
                const python =
                    spawn('python3.8', ['python/readCSV.py', `docs/Binance_BTCUSDT_minute_sorted_trades.csv`, `${start}`, `${end}`])

                const data = await new Promise((resolve, reject) => {
                    python.stdout.on('data', resolve)
                    python.stderr.on('data', reject)
                })

                const x: any[] = JSON.parse(data.toString())
                if (!x.length) return true

                await tradesService.saveList(x)
                start = end
                end += 9000
            }

        } catch (e) {
            throw e
        }
    },
    getAllFile: async (name: string, startDate: number, endDate: number) => {
        let data: any[] = []
        try {
            const python = spawn('python3.8', ['python/partitionData.py', name, `${startDate}`, `${endDate}`])
            const exitCode = await new Promise((resolve, reject) => {
                python.on('close', resolve);
            });
            if (exitCode)
                throw new errors.InternalError('cannot read file')
            const file = xlsx.readFile('docs/proper-data.csv')
            data = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
        } catch (e) {
            throw e
        }

        return data
    }
}
import request from 'request'
import utils from './utils'
import fs from 'fs'
import csv from 'csv-parser'
import { oilPrice } from '../models/oilprice'

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
        const csvData = []
        fs.createReadStream(name)
            .pipe(csv())
            .on('data', it => {
                csvData.push(it)
            }).on('end', () => {
                try {
                    bitsService.saveList(
                        csvData.map(it => ( { timestamp: it.unix || it['Unix Timestamp'], symbol: it.symbol || it.Symbol, open: it.open || it.Open, high: it.high || it.High, low: it.low || it.Low, close: it.close || it.Close, volume_USD: it['Volume USD'], volume_BTC: it['Volume BTC'] })),
                        Exchange
                        )
                } catch(e){
                    throw e
                }
            })
    }
}
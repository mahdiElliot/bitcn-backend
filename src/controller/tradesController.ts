import tradeService from '../services/tradeService'
import { trade } from '../models/trade'
import { Request, Response } from 'express'
import statusCodes from '../utils/status-codes'
import functions from '../utils/functions'
import tradesService from '../services/tradesService'

const trades = (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 9000
    const page = Number(req.query.page) || 1
    const startTime = Number(req.query.start) || 0
    const endTime = Number(req.query.end) || 0
    // tradeService.findAll(page, limit, startTime, endTime).then(data => {
    //     res.status(statusCodes.SUCCESSFUL).send(data)
    // }).catch((e: any) => {
    //     res.status(e.status).send(e)
    // })
    tradesService.findAll(page, limit, startTime, endTime).then(data => {
        res.status(statusCodes.SUCCESSFUL).send(data)
    }).catch((e: any) => {
        res.status(e.status).send(e)
    })
}

const saveTrades = (req: Request, res: Response) => {
    const d = req.body
    if (!d.data) {
        res.status(statusCodes.BAD_REQUEST).send({ message: 'invalid data' })
        return
    }
    const data = typeof (d.data) === 'string' ? JSON.parse(d.data) : d.data

    if (!data || !data.length) {
        res.status(statusCodes.BAD_REQUEST).send({ message: 'invalid data' })
        return
    }

    tradesService.saveList(data).then(data => {
        res.status(statusCodes.SUCCESSFUL).send({ message: 'saved' })
    }).catch(e => {
        res.status(statusCodes.INTERNAL_SERVER).send({ message: e.message || 'failed to save' })
    })
}

const deleteTrades = (req: Request, res: Response) => {
    tradesService.deleteAll().then(() => {
        res.status(statusCodes.SUCCESSFUL).send({message: 'all deleted'})
    }).catch(e => {
        res.status(statusCodes.INTERNAL_SERVER).send({ message: e.message || 'failed to delete' })
    })
}

const newtrades = (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 9000
    const page = Number(req.query.page || 1)
    const startTime = Number(req.query.start || 0)
    const endTime = Number(req.query.end || 0)
    // let data = functions.getAllFile('docs/Binance_BTCUSDT_minute_sorted_trades.csv', startTime, endTime)
    // .filter(it => {
    //     let c = Number(it.unix) >= startTime
    //     if (endTime)
    //         c = c && Number(it.unix) <= endTime
    //     return c
    // })
    functions.getAllFile('docs/Binance_BTCUSDT_minute_sorted_trades.csv', startTime, endTime).then((d: any[]) => {
        const data = limit ? d.slice((page - 1) * limit, page * limit - 1) : [...d]
        res.status(statusCodes.SUCCESSFUL).send({
            total: data.length, data: data.map(it => {
                const t = {
                    timestamp: Number(it.unix),
                    buy: it.buy_signal == 1, sell: it.sell_signal == 1,
                    ...it
                } as any
                delete t.buy_signal
                delete t.sell_signal
                delete t.unix
                delete t.__EMPTY
                delete t.date
                delete t.symbol
                return t
            })
        })

    }).catch((e: any) => {
        res.status(e.status).send(e)
    })
}

export default {
    trades,
    newtrades,
    saveTrades,
    deleteTrades
}
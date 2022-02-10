import tradeService from '../services/tradeService'
import { trade } from '../models/trade'
import { Request, Response } from 'express'
import statusCodes from '../utils/status-codes'
import functions from '../utils/functions'

const trades = (req: Request, res: Response) => {
    const limit = req.query.limit
    const page = Number(req.query.page || 1)
    const startTime = Number(req.query.start || 0)
    const endTime = Number(req.query.end || 0)
    tradeService.findAll(page, Number(limit || 0), startTime, endTime).then(data => {
        res.status(statusCodes.SUCCESSFUL).send(data)
    }).catch((e: any) => {
        res.status(e.status).send(e)
    })
}

const newtrades = (req: Request, res: Response) => {
    const limit = req.query.limit
    const page = Number(req.query.page || 1)
    const startTime = Number(req.query.start || 0)
    const endTime = Number(req.query.end || 0)
    const data = functions.getAllFile('docs/Binance_BTCUSDT_minute_sorted_trades.csv')
    res.status(statusCodes.SUCCESSFUL).send({
        total: data.length, data: data.map(it => (
            {
                timestamp: Number(it.unix),
                open: it.open,
                close: it.close,
                low: it.low,
                high: it.high,
                volume_btc: it['Volume BTC'], volume_usdt: it['Volume USDT'],
                buy: it.buy_signal == 1, sell: it.sell_signal == 1,
                tradecount: it.tradecount,
                slowk: it.slowk,
                slowd: it.slowd,
                k: it.k,
                j: it.j,
                d: it.d,
                profit: it.profit,
                profit_percent: it.profit_percent,
                SMMA_21: it.SMMA_21,
                MA_50: it.MA_50,
                MA_21: it.MA_21
            } as trade)).sort((a, b) => (a['timestamp'] >= b['timestamp'] ? -1 : 1))
    })
}

export default {
    trades,
    newtrades
}
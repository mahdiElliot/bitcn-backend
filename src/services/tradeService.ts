import Trade, { trade } from '../models/trade'
import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'
import { Op } from 'sequelize'

const findAll = async (offset: number = 1, limit: number = 0, startRange: number = 0, endRange: number = 0) => {
    let data = []
    let total = 0
    const order: any = [['unix', 'DESC']]
    try {
        let cond: any = {}
        if (startRange) {
            if (endRange)
                cond = { unix: { [Op.gte]: startRange, [Op.lte]: endRange } }
            else
                cond = { unix: { [Op.gte]: startRange } }
        } else if (endRange)
            cond = { unix: { [Op.lte]: endRange } }

        const d = await Trade.findAll({ order, where: cond })
        total = d.length
        data = limit ? d.slice((offset - 1) * limit, offset * limit - 1) : d
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
    return {
        total, data: data.map(it => (
            {
                timestamp: Number(it.unix),
                open: it.open,
                close: it.close,
                low: it.low,
                high: it.high,
                volume_btc: it['Volume BTC'], volume_usdt: it['Volume USDT'],
                buy: it.buy_signal == 1, sell: it.sell_signal == 1,
                tradecount: it.tradecount,
                trade_order: it.trade_order,
                slowk: it.slowk,
                slowd: it.slowd,
                k: it.k,
                j: it.j,
                d: it.d,
                middle: it.middle,
                lower: it.lower,
                upper: it.upper,
                profit: it.profit,
                profit_percent: it.profit_percent,
                SMMA_21: it.SMMA_21,
                MA_50: it.MA_50,
                MA_21: it.MA_21
            } as trade))
    }
}

export default {
    findAll
}
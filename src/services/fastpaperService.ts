import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'
import FastPaperBuy from '../models/fast_paper_buy'
import FastPaperSell from '../models/fast_paper_sell'
import { Op } from 'sequelize'

export type FastPaper = {
    timestamp: number
    market: string
    asset_amount: number
    usdt_balance: number
    buy_sell_amount: number
    price: number
    buy: boolean
}

const findAll = async (offset: number = 1, limit: number = 0, startRange: number = 0, endRange: number = 0, buy: boolean = true) => {
    let data = []
    let total = 0
    const order: any[] = [['timestampp', 'DESC']]
    try {
        const Tbl = buy ? FastPaperBuy : FastPaperSell
        let cond: any = {}
        if (startRange) {
            if (endRange)
                cond = { timestampp: { [Op.gte]: startRange, [Op.lte]: endRange } }
            else
                cond = { timestampp: { [Op.gte]: startRange } }
        } else if (endRange)
            cond = { timestampp: { [Op.lte]: endRange } }

        const d = await Tbl.findAll({ order, where: cond })
        total = d.length
        data = limit ? d.slice((offset - 1) * limit, offset * limit - 1) : d
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
    return {
        total, data: data.map(it =>
        ({
            timestamp: it.timestampp, market: it.market, asset_amount: it.asset_amount,
            usdt_balance: it.usdt_balance, buy_sell_amount: it.buy_amount || it.sell_amount, price: it.price, buy
        } as FastPaper))
    }
}

export default {
    findAll
}
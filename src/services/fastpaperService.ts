import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'
import FastPaperBuy from '../models/fast_paper_buy'
import FastPaperSell from '../models/fast_paper_sell'

export type FastPaper = {
    timestamp: number
    market: string
    asset_amount: number
    usdt_balance: number
    buy_sell_amount: number
    price: number
    buy: boolean
}

const findAll = async (offset: number = 1, limit: number = 0, buy: boolean = true) => {
    let data = []
    const order: any[] = [['timestampp', 'DESC']]
    try {
        const Tbl = buy ? FastPaperBuy : FastPaperSell
        data = limit === 0 ? await Tbl.findAll({ order }) : await Tbl.findAll({ offset, limit, order })
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
    return data.map(it =>
    ({
        timestamp: it.timestampp, market: it.market, asset_amount: it.asset_amount,
        usdt_balance: it.usdt_balance, buy_sell_amount: it.buy_amount || it.sell_amount, price: it.price, buy
    } as FastPaper))
}

export default {
    findAll
}
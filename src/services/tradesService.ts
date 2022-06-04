import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'
import Trade from '../models/trades'

const saveList = async (data: any[]) => {
    try {
        await Trade.insertMany(data)
    } catch (e) {
        throw e
    }
}

const findAll = async (offset: number = 1, limit: number = 1000, startRange: number = 0, endRange: number = 0,
    key: number, srt = 'timestamp', asc = 1, tradesFilter = 0) => {
    let data = []
    let count = 0
    try {
        let filter: any = {}
        if (startRange) {
            if (endRange)
                filter = { unix: { $gte: startRange, $lte: endRange } }
            else
                filter = { unix: { $gte: startRange } }
        } else if (endRange)
            filter = { unix: { $lte: endRange } }

        filter = { ...filter, key }
        if (tradesFilter)
            filter = {
                ...filter, $or: [
                    { buy_signal: 1 },
                    { sell_signal: 1 },
                    { stoploss_signal: 1 }
                ]
            }
        if (srt === 'timestamp') srt = 'unix'
        const sort = {} as any
        sort[srt] = asc
        data = await Trade.find(filter, null).sort(sort).skip((offset - 1) * limit).limit(limit).exec()
        count = await Trade.count({ key }).exec()
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }

    return {
        total: count, data: data.map(it => {
            const t = {
                timestamp: Number(it.unix),
                buy: it.buy_signal == 1,
                sell: it.sell_signal == 1 || it.stoploss_signal == 1,
                ...it._doc
            }
            delete t.unix
            delete t.date
            delete t.symbol
            delete t._id
            delete t.key


            return t
        })
    }
}

const findTrade = async (key: number, trade_order = 1) => {
    let data = []
    try {
        data = await Trade.find({ key, trade_order }, null).exec()
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
    return {
        data: data.map(it => {
            const t = {
                timestamp: Number(it.unix),
                buy: it.buy_signal == 1,
                sell: it.sell_signal == 1 || it.stoploss_signal == 1,
                ...it._doc
            }
            delete t.unix
            delete t.date
            delete t.symbol
            delete t._id
            delete t.key


            return t
        })
    }
}

const deleteAll = async (key: number) => {
    try {
        await Trade.deleteMany({ key }).exec()
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
}

export default {
    saveList,
    findAll,
    findTrade,
    deleteAll
}
import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'
import Trade from '../models/trades'

const saveList = async (data: any[]) => {
    try {
        await Trade.insertMany(data)
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
}

const findAll = async (offset: number = 1, limit: number = 1000, startRange: number = 0, endRange: number = 0, key: number) => {
    let data = []
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
        data = await Trade.find(filter, null, { sort: { unix: 1 }, limit, skip: (offset - 1) * limit }).exec()

    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }

    return {
        total: data.length, data: data.map(it => {
            const t = {
                timestamp: Number(it.unix),
                buy: it.buy_signal == 1,
                sell: it.sell_signal == 1,
                ...it._doc
            }
            delete t.buy_signal
            delete t.sell_signal
            delete t.unix
            delete t.date
            delete t.symbol
            delete t._id
            delete t.key


            return t
        })
    }
}

const deleteAll = async () => {
    try {
        await Trade.deleteMany().exec()
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
}

export default {
    saveList,
    findAll,
    deleteAll
}
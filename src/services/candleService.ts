import { candle } from '../models/candle'
import Candle from '../models/candle'
import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'

const saveList = async (list: candle[]) => {
    try {
        for (const item of list) {
            const o = Candle
                .build(
                    {
                        timestampp: item.timestamp, market: item.market, openp: item.open, high: item.high,
                        low: item.low, closep: item.close, volume: item.volume, usdvol: item.usdvol
                    }
                )
            await o.save()
        }
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
}

const save = async (item: candle) => {
    try {
        const o = Candle
            .build(
                {
                    timestampp: item.timestamp, market: item.market, openp: item.open, high: item.high,
                    low: item.low, closep: item.close, volume: item.volume, usdvol: item.usdvol
                }
            )
        await o.save()
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
}

const findAll = async (offset: number = 1, limit: number = 0) => {
    let data = []
    try {
        data = limit === 0 ? await Candle.findAll() : await Candle.findAll({ offset, limit })
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
    return data.map(it => ({ timestamp: it.timestampp, market: it.market, open: it.openp, close: it.closep, low: it.low, high: it.high, volume: it.volume, usdvol: it.usdvol } as candle))
}

export default {
    saveList,
    save,
    findAll
}
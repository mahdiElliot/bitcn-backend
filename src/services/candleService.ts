import { candle } from '../models/candle'
import Candle from '../models/candle'
import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'
import { Op } from 'sequelize'

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

const findAll = async (offset: number = 1, limit: number = 0, startRange: number = 0, endRange: number = 0) => {
    let data = []
    let total = 0
    const order: any = [['timestampp', 'DESC']]
    try {
        let cond: any = {}
        if (startRange) {
            if (endRange)
                cond = { timestampp: { [Op.gte]: startRange, [Op.lte]: endRange } }
            else
                cond = { timestampp: { [Op.gte]: startRange } }
        } else if (endRange)
            cond = { timestampp: { [Op.lte]: endRange } }

        const d = await Candle.findAll({ order, where: cond })
        total = d.length
        data = limit ? d.slice((offset - 1) * limit, offset * limit - 1) : d
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
    return { total, data: data.map(it => ({ timestamp: it.timestampp, market: it.market, open: it.openp, close: it.closep, low: it.low, high: it.high, volume: it.volume, usdvol: it.usdvol } as candle)) }
}

export default {
    saveList,
    save,
    findAll
}
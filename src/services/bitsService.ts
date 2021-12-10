import {bits} from '../models/bitfinex'
import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'

const saveList = async (list: bits[], Exchange: any) => {
    try {
        for (const item of list) {
            const o = Exchange
                .build(
                    { timestamp: item.timestamp, symbol: item.symbol, open: item.open, high: item.high,
                        low: item.low, close: item.close, volume_USD: item.volume_USD, volume_BTC: item.volume_BTC}
                )
            await o.save()
        }
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
}

const save = async (item: bits, Exchange: any) => {
    try {
        const o = Exchange
        .build(
            { timestamp: item.timestamp, symbol: item.symbol, open: item.open, high: item.high,
                low: item.low, close: item.close, volume_USD: item.volume_USD, volume_BTC: item.volume_BTC}
        )
    await o.save()
    } catch(e){
        throw new Errors.InternalError(errorMsgs.database_error())
    }
}

export default {
    saveList,
    save
}
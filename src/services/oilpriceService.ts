import { oilPrice } from '../models/oilprice'
import OilPrice from '../models/oilprice'
import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'

const saveList = async (list: oilPrice[]) => {
    try {
        for (const item of list) {
            const o = OilPrice
                .build(
                    { created_at: item.created_at, price: item.price, formatted: item.formatted, currency: item.currency, code: item.code, ttype: item.type }
                )
            await o.save()
        }
    } catch (e) {
        throw new Errors.InternalError(errorMsgs.database_error())
    }
}

export default {
    saveList
}
import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'
import { Op } from 'sequelize'
import Indicator, { indicator } from '../models/indicator'

const save = async (item: indicator) => {
    try {
        const data = await Indicator.create(item)
        return data
    } catch (e) {
        throw e
    }
}

const findAll = async () => {
    try {
        const data = await Indicator.find().exec()
        return data
    } catch (e) {
        throw e
    }
}

const deleteOne = async (name: string) => {
    try {
        return await Indicator.deleteOne({ name }).exec()
    } catch (e) {
        throw e
    }
}

export default {
    save,
    findAll,
    deleteOne
}
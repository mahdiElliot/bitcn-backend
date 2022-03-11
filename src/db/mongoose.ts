import mongoose from 'mongoose'
import config from '../config/config'

export default async () => {
    try {
        await mongoose.connect(config.MONGOOSE)
    } catch (e) {
        throw e
    }
}


import mongoose from 'mongoose'

export type indicator = {
    name: string
    type: boolean
}

const indicatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: { // true <=> first indicator, false <=> second indicator
        type: Boolean,
        required: true
    }
}, { strict: false, versionKey: false, id: false })

const Indicator = mongoose.model('indicator', indicatorSchema)

export default Indicator
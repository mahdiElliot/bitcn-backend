import mongoose from 'mongoose'

const DfInfoSchema = new mongoose.Schema({
    key: {
        type: Number,
        unique: true,
        required: true,
    },
    'Start Date': {
        type: String,
        required: true
    },
    'End Date': {
        type: String,
        requried: true,
    },
    Symbol: {
        type: String,
        required: true
    }
}, { strict: false, versionKey: false,id: false })

const DfInfo = mongoose.model('dfinfo', DfInfoSchema)

export default DfInfo
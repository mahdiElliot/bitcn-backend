import mongoose from 'mongoose'

const DfInfoSchema = new mongoose.Schema({
    Title: {
        type: String,
        unique: true,
        required: true
    },
    Value: {
        type: String,
        required: false
    }
}, {versionKey: false, _id: false, id: false })

const DfInfo = mongoose.model('dfinfo', DfInfoSchema)

export default DfInfo
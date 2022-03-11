import mongoose from 'mongoose'

const tradeSchema = new mongoose.Schema({
    unix: {
        type: Number,
        unique: true,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    open: {
        type: Number,
        required: true,
    },
    close: {
        type: Number,
        required: true
    },
    low: {
        type: Number,
        required: true
    },
    high: {
        type: Number,
        required: true
    },
    'Volume BTC': {
        type: Number,
        allowNull: false,

    },
    'Volume USDT': {
        type: Number,
        allowNull: false
    },
    buy_signal: {
        type: Number,
        allowNull: false,
    },
    sell_signal: {
        type: Number,
        allowNull: false,
    },
    usdt: {
        type: Number,
        allowNull: false
    },
    btc: {
        type: Number
    },
}, { strict: false, versionKey: false, _id: false })

const Trade = mongoose.model('trades', tradeSchema)

export default Trade
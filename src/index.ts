import express from "express"
import dotenv from 'dotenv'
dotenv.config()

import oilPriceService from './services/oilpriceService'
import bitsService from './services/bitsService'
import functions from './utils/functions'
import sequelize from './db/index'
import Bitfinex from './models/bitfinex'
import Bitstamp from "./models/bitstamp"
import Bittrex from "./models/bittrex"
import Poloniex from "./models/poloniex"
import Itbit from "./models/itbit"

const port = process.env.PORT || 8081

const app = express()

// middlewares
app.use(express.json())

const initDatabaseTables = () => {
    functions.addOilPrice(oilPriceService)
    functions.addBits('docs/Bitfinex_BTCUSD_1h.csv', Bitfinex, bitsService)
    functions.addBits('docs/Bitstamp_BTCUSD_1h.csv', Bitstamp, bitsService)
    functions.addBits('docs/Bittrex_BTCUSD_1h.csv', Bittrex, bitsService)
    functions.addBits('docs/Poloniex_BTCUSDT_1h.csv', Poloniex, bitsService)
    functions.addBits('docs/Itbit_BTCUSD_1h.csv', Itbit, bitsService)
}

const start = async () => {
    try {
        await sequelize.sync()

        // initDatabaseTables()

        app.listen(port, () => {

        })
        app.get('/', (req, res) => {

        })
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

start()
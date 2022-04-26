import express from "express"
import bodyParser from 'body-parser'
// import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import mongoose from './db/mongoose'

import routes from './routes'

import oilPriceService from './services/oilpriceService'
import bitsService from './services/bitsService'
import functions from './utils/functions'
import sequelize from './db/index'
import Bitfinex from './models/bitfinex'
import Bitstamp from "./models/bitstamp"
import Bittrex from "./models/bittrex"
import Poloniex from "./models/poloniex"
import Itbit from "./models/itbit"
import requestToken from "./middleware/requestToken"
import busbody from 'connect-busboy'
import winston from 'winston'

const port = process.env.PORT || 8081

const app = express()

// middlewares
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(requestToken)
app.use(busbody({
    highWaterMark: 2 * 1024 * 1024
}))

app.use('/api', routes)
app.use(express.urlencoded({extended: true}))
// app.use(cors())

const initDatabaseTables = () => {
    functions.addOilPrice(oilPriceService)
    functions.addBits('docs/Bitfinex_BTCUSD_1h.csv', Bitfinex, bitsService)
    functions.addBits('docs/Bitstamp_BTCUSD_1h.csv', Bitstamp, bitsService)
    functions.addBits('docs/Bittrex_BTCUSD_1h.csv', Bittrex, bitsService)
    functions.addBits('docs/Poloniex_BTCUSDT_1h.csv', Poloniex, bitsService)
    functions.addBits('docs/Itbit_BTCUSD_1h.csv', Itbit, bitsService)
}


process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex)
    process.exit(1)
})

process.on('unhandledRejection', (ex: any) => {
    winston.error(ex.message, ex)
    process.exit(1)
})

winston.add(new winston.transports.File({filename: 'w1'}))


const start = async () => {
    try {
        await sequelize.sync()

        await mongoose()

        // initDatabaseTables()
        app.get('/', (req, res) => {

        })

        app.listen(port, () => {

        })

    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

start()
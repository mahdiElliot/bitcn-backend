import express from "express"
import dotenv from 'dotenv'
import oilPriceService from './services/oilpriceService'
import bitsService from './services/bitsService'
import { oilPrice } from './models/oilprice'
import utils from './utils/utils'
import request from 'request'
import sequelize from './db/index'
import fs from 'fs'
import csv from 'csv-parser'
import Bitfinex from './models/bitfinex'
import Bitstamp from "./models/bitstamp"
import Bittrex from "./models/bittrex"
import Gemini from "./models/gemini"
import Poloniex from "./models/poloniex"
import Itbit from "./models/itbit"

const port = process.env.PORT || 8081

const app = express()

// middlewares
app.use(express.json())

dotenv.config()

const addOilPrice = () => {
    request({
        uri: utils.oil_api_url_data(),
        headers: {
            'Authorization': `Token ${utils.oil_token()}`,
            'Content-Type': 'application/json'
        }
    }, (error, response, body) => {
        const data = JSON.parse(body)
        if (data.status === 'success') {
            const prices: any[] = data.data.prices
            oilPriceService.saveList(prices.map(it => ({ ...it, created_at: Date.parse(it.created_at) } as oilPrice)))
        } else {
            console.log(error)
            process.exit(1)
        }
    })
}

const addBits = (name: string, Exchange: any) => {
    const csvData = []
    fs.createReadStream(name)
        .pipe(csv())
        .on('data', it => {
            csvData.push(it)
            // try {
            //     bitsService.save(
            //         { timestamp: it.unix, symbol: it.symbol, open: it.open, high: it.high, low: it.low, close: it.close, volume_USD: it['Volume USD'], volume_BTC: it['Volume BTC'] },
            //         Exchange
            //     )
            // } catch (e) {
            //     throw e
            // }
        }).on('end', () => {
            try {
                bitsService.saveList(
                    csvData.map(it => ( { timestamp: it.unix, symbol: it.symbol, open: it.open, high: it.high, low: it.low, close: it.close, volume_USD: it['Volume USD'], volume_BTC: it['Volume BTC'] })),
                    Exchange
                    )
            } catch(e){
                throw e
            }
        })
}

const start = async () => {
    try {
        await sequelize.sync()

        // addOilPrice()
        // addBits('docs/Bitfinex_BTCUSD_1h.csv', Bitfinex)
        addBits('docs/Bitstamp_BTCUSD_1h.csv', Bitstamp)
        // addBits('docs/Bittrex_BTCUSD_1h.csv', Bittrex)
        // addBits('docs/gemini_BTCUSD_1hr.csv', Gemini)
        // addBits('docs/Poloniex_BTCUSDT_1h.csv', Poloniex)
        // addBits('docs/Itbit_BTCUSD_1h.csv', Itbit)
        // app.listen(port, () => {

        // })
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

start()
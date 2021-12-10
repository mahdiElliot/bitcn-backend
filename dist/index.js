"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const oilpriceService_1 = __importDefault(require("./services/oilpriceService"));
const bitsService_1 = __importDefault(require("./services/bitsService"));
const utils_1 = __importDefault(require("./utils/utils"));
const request_1 = __importDefault(require("request"));
const index_1 = __importDefault(require("./db/index"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
dotenv_1.default.config({ path: './.env' });
const port = process.env.PORT || 8081;
const app = (0, express_1.default)();
console.log(process.env.COIN_DB_USER);
// middlewares
app.use(express_1.default.json());
const addOilPrice = () => {
    (0, request_1.default)({
        uri: utils_1.default.oil_api_url_data(),
        headers: {
            'Authorization': `Token ${utils_1.default.oil_token()}`,
            'Content-Type': 'application/json'
        }
    }, (error, response, body) => {
        const data = JSON.parse(body);
        if (data.status === 'success') {
            const prices = data.data.prices;
            oilpriceService_1.default.saveList(prices.map(it => (Object.assign(Object.assign({}, it), { created_at: Date.parse(it.created_at) }))));
        }
        else {
            console.log(error);
            process.exit(1);
        }
    });
};
const addBits = (name, Exchange) => {
    const csvData = [];
    fs_1.default.createReadStream(name)
        .pipe((0, csv_parser_1.default)())
        .on('data', it => {
        csvData.push(it);
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
            bitsService_1.default.saveList(csvData.map(it => ({ timestamp: it.unix, symbol: it.symbol, open: it.open, high: it.high, low: it.low, close: it.close, volume_USD: it['Volume USD'], volume_BTC: it['Volume BTC'] })), Exchange);
        }
        catch (e) {
            throw e;
        }
    });
};
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_1.default.sync();
        // addOilPrice()
        // addBits('docs/Bitfinex_BTCUSD_1h.csv', Bitfinex)
        // addBits('docs/Bitstamp_BTCUSD_1h.csv', Bitstamp)
        // addBits('docs/Bittrex_BTCUSD_1h.csv', Bittrex)
        // addBits('docs/gemini_BTCUSD_1hr.csv', Gemini)
        // addBits('docs/Poloniex_BTCUSDT_1h.csv', Poloniex)
        // addBits('docs/Itbit_BTCUSD_1h.csv', Itbit)
        // app.listen(port, () => {
        // })
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
});
// start()
//# sourceMappingURL=index.js.map
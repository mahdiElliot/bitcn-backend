"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const utils_1 = __importDefault(require("./utils"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
exports.default = {
    addOilPrice: (oilPriceService) => {
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
                oilPriceService.saveList(prices.map(it => (Object.assign(Object.assign({}, it), { created_at: Date.parse(it.created_at) }))));
            }
            else {
                console.log(error);
                process.exit(1);
            }
        });
    },
    addBits: (name, Exchange, bitsService) => {
        const csvData = [];
        fs_1.default.createReadStream(name)
            .pipe((0, csv_parser_1.default)())
            .on('data', it => {
            csvData.push(it);
        }).on('end', () => {
            try {
                bitsService.saveList(csvData.map(it => ({ timestamp: it.unix || it['Unix Timestamp'], symbol: it.symbol || it.Symbol, open: it.open || it.Open, high: it.high || it.High, low: it.low || it.Low, close: it.close || it.Close, volume_USD: it['Volume USD'], volume_BTC: it['Volume BTC'] })), Exchange);
            }
            catch (e) {
                throw e;
            }
        });
    }
};
//# sourceMappingURL=functions.js.map
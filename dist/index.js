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
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes"));
const oilpriceService_1 = __importDefault(require("./services/oilpriceService"));
const bitsService_1 = __importDefault(require("./services/bitsService"));
const functions_1 = __importDefault(require("./utils/functions"));
const index_1 = __importDefault(require("./db/index"));
const bitfinex_1 = __importDefault(require("./models/bitfinex"));
const bitstamp_1 = __importDefault(require("./models/bitstamp"));
const bittrex_1 = __importDefault(require("./models/bittrex"));
const poloniex_1 = __importDefault(require("./models/poloniex"));
const itbit_1 = __importDefault(require("./models/itbit"));
const port = process.env.PORT || 8081;
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use('/api', routes_1.default);
const initDatabaseTables = () => {
    functions_1.default.addOilPrice(oilpriceService_1.default);
    functions_1.default.addBits('docs/Bitfinex_BTCUSD_1h.csv', bitfinex_1.default, bitsService_1.default);
    functions_1.default.addBits('docs/Bitstamp_BTCUSD_1h.csv', bitstamp_1.default, bitsService_1.default);
    functions_1.default.addBits('docs/Bittrex_BTCUSD_1h.csv', bittrex_1.default, bitsService_1.default);
    functions_1.default.addBits('docs/Poloniex_BTCUSDT_1h.csv', poloniex_1.default, bitsService_1.default);
    functions_1.default.addBits('docs/Itbit_BTCUSD_1h.csv', itbit_1.default, bitsService_1.default);
};
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_1.default.sync();
        // initDatabaseTables()
        app.get('/', (req, res) => {
        });
        app.listen(port, () => {
        });
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
});
start();
//# sourceMappingURL=index.js.map
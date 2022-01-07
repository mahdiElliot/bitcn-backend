"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const oilpriceService_1 = __importDefault(require("../services/oilpriceService"));
const candleService_1 = __importDefault(require("../services/candleService"));
const status_codes_1 = __importDefault(require("../utils/status-codes"));
const router = express_1.default.Router();
router.get('/prices', (req, res) => {
    oilpriceService_1.default.findAll().then(data => {
        res.status(status_codes_1.default.SUCCESSFUL).send(data);
    });
});
router.get('/candleinfo', (req, res) => {
    candleService_1.default.findAll().then(data => {
        res.status(status_codes_1.default.SUCCESSFUL).send(data);
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map
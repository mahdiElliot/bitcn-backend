"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const oilpriceService_1 = __importDefault(require("../services/oilpriceService"));
const candleService_1 = __importDefault(require("../services/candleService"));
const fastpaperService_1 = __importDefault(require("../services/fastpaperService"));
const status_codes_1 = __importDefault(require("../utils/status-codes"));
const router = express_1.default.Router();
router.get('/prices', (req, res) => {
    oilpriceService_1.default.findAll().then(data => {
        res.status(status_codes_1.default.SUCCESSFUL).send(data);
    });
});
router.get('/candleinfo', (req, res) => {
    const limit = req.query.limit;
    const page = Number(req.query.page) || 1;
    candleService_1.default.findAll(page, Number(limit || 0)).then(data => {
        res.status(status_codes_1.default.SUCCESSFUL).send({ total: data.length, data });
    }).catch((e) => {
        res.status(e.status).send(e);
    });
});
router.get('/fastpaper', (req, res) => {
    const limit = req.query.limit;
    const page = Number(req.query.page) || 1;
    const transfer = req.query.transfer || '';
    if (transfer === '') {
        fastpaperService_1.default.findAll(page, Number(limit || 0), true).then(data => {
            fastpaperService_1.default.findAll(page, Number(limit || 0), false).then(data2 => {
                data.push(...data2);
                data.sort((a, b) => b.timestamp - a.timestamp);
                res.status(status_codes_1.default.SUCCESSFUL).send({ total: data.length, data });
            }).catch((e) => {
                res.status(e.status);
            });
        }).catch((e) => {
            res.status(e.status).send(e);
        });
        return;
    }
    fastpaperService_1.default.findAll(page, Number(limit || 0), transfer === 'buy').then(data => {
        res.status(status_codes_1.default.SUCCESSFUL).send({ total: data.length, data });
    }).catch((e) => {
        res.status(e.status).send(e);
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map
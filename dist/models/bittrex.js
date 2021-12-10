"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../db/index"));
const sequelize_1 = __importDefault(require("sequelize"));
const Bittrex = index_1.default.define('bittrex', {
    timestamp: {
        type: sequelize_1.default.BIGINT,
        primaryKey: true
    },
    symbol: {
        type: sequelize_1.default.STRING,
    },
    open: {
        type: sequelize_1.default.FLOAT,
        allowNull: false
    },
    high: {
        type: sequelize_1.default.FLOAT,
        allowNull: false
    },
    low: {
        type: sequelize_1.default.FLOAT,
        allowNull: false
    },
    close: {
        type: sequelize_1.default.FLOAT,
        allowNull: false
    },
    volume_USD: {
        type: sequelize_1.default.FLOAT,
        allowNull: false
    },
    volume_BTC: {
        type: sequelize_1.default.FLOAT,
        allowNull: false
    }
});
exports.default = Bittrex;
//# sourceMappingURL=bittrex.js.map
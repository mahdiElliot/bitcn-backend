"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../db/index"));
const sequelize_1 = __importDefault(require("sequelize"));
const OilPrice = index_1.default.define('oilprice', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at: {
        type: sequelize_1.default.BIGINT,
        allowNull: false,
    },
    price: {
        type: sequelize_1.default.FLOAT,
        allowNull: false
    },
    formatted: {
        type: sequelize_1.default.STRING
    },
    currency: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    code: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    ttype: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.default = OilPrice;
//# sourceMappingURL=oilprice.js.map
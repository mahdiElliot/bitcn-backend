"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const sequelize = new sequelize_1.Sequelize(config_1.default.DB_DB, config_1.default.DB_USER, config_1.default.DB_PASS, {
    host: config_1.default.DB_HOST,
    port: Number(config_1.default.DB_PORT),
    dialect: 'postgres',
    logging: process.env.MODE === 'dev'
});
exports.default = sequelize;
//# sourceMappingURL=index.js.map
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
const oilprice_1 = __importDefault(require("../models/oilprice"));
const errors_1 = __importDefault(require("../utils/errors"));
const error_english_1 = __importDefault(require("../utils/error-messages/error-english"));
const saveList = (list) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const item of list) {
            const o = oilprice_1.default
                .build({ created_at: item.created_at, price: item.price, formatted: item.formatted, currency: item.currency, code: item.code, ttype: item.type });
            yield o.save();
        }
    }
    catch (e) {
        throw new errors_1.default.InternalError(error_english_1.default.database_error());
    }
});
exports.default = {
    saveList
};
//# sourceMappingURL=oilpriceService.js.map
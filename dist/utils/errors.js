"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const status_codes_1 = __importDefault(require("./status-codes"));
function InternalError(message) {
    this.message = message;
    this.status = status_codes_1.default.INTERNAL_SERVER;
}
exports.default = {
    InternalError
};
//# sourceMappingURL=errors.js.map
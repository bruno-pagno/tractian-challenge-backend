"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const machineSchema = new mongoose_1.default.Schema({
    name: { type: 'string', required: true },
    description: { type: 'string', required: true },
    model: { type: 'string', required: true },
    status: { type: 'string', required: true },
    health: { type: 'number', required: true },
    image: { type: 'string', required: true },
    facility: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Company', required: true },
    responsible: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: false });
const Machine = mongoose_1.default.model('Machine', machineSchema);
exports.default = Machine;
//# sourceMappingURL=machine.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const facilitySchema = new mongoose_1.default.Schema({
    name: { type: 'string', required: true },
    location: { type: 'string', required: true },
    company: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Company', required: true },
}, { timestamps: false });
const Facility = mongoose_1.default.model('Facility', facilitySchema);
exports.default = Facility;
//# sourceMappingURL=facility.js.map
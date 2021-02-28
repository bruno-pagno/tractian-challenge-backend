"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var facilitySchema = new mongoose_1.default.Schema({
    name: { type: 'string', required: true },
    location: { type: 'string', required: true },
    company: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Company', required: true },
}, { timestamps: false });
var Facility = mongoose_1.default.model('Facility', facilitySchema);
exports.default = Facility;

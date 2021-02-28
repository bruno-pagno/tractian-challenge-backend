"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// For demosntration purposes, the name of the company will be a primary key, 
// althrough its not true in real life
var companySchema = new mongoose_1.default.Schema({
    name: { type: 'string', required: true, unique: true },
    description: { type: 'string', required: true },
    sector: { type: 'string', required: true },
    logo: { type: 'string', required: true }
}, { timestamps: true });
var Company = mongoose_1.default.model('Company', companySchema);
exports.default = Company;

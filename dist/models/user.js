"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    age: { type: 'number', required: true },
    company: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Company', required: true },
}, { timestamps: false });
var User = mongoose_1.default.model('User', userSchema);
exports.default = User;

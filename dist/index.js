"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
require('dotenv').config();
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
// routers
var company_1 = __importDefault(require("./routers/company"));
var user_1 = __importDefault(require("./routers/user"));
var facility_1 = __importDefault(require("./routers/facility"));
var machine_1 = __importDefault(require("./routers/machine"));
app.use(company_1.default, user_1.default, facility_1.default, machine_1.default);
require('./database/database');
var PORT = process.env.PORT || 3333;
app.listen(PORT, function () {
    console.log("Server is up on port " + PORT);
});

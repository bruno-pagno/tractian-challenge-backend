"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
const company_1 = __importDefault(require("./routers/company"));
const user_1 = __importDefault(require("./routers/user"));
const facility_1 = __importDefault(require("./routers/facility"));
const machine_1 = __importDefault(require("./routers/machine"));
app.use(company_1.default, user_1.default, facility_1.default, machine_1.default);
require('./database/database');
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
//# sourceMappingURL=index.js.map
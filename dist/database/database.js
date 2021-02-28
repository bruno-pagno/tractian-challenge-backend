"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoURL = process.env.MONGO_URL;
mongoose_1.default.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("Sucessfully connected into the database!"))
    .catch((error) => {
    console.log('Failed to connect to the database', error.message);
    process.exit(1);
});
//# sourceMappingURL=database.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_1 = __importDefault(require("../models/company"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.get('/user', async (req, res) => {
    try {
        const users = await user_1.default.find();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
router.post('/user/create', async (req, res) => {
    try {
        const { name, email, age, company } = req.body;
        const searchedCompany = await company_1.default.findOne({ name: company });
        if (!searchedCompany)
            throw new Error('Invalid company name');
        const companyId = searchedCompany._id;
        const newUser = new user_1.default({ name, email, age, company: companyId });
        await newUser.save();
        res.send({ 'sucess': 'new user created' });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_1 = __importDefault(require("../models/company"));
const multer_1 = __importDefault(require("multer"));
const user_1 = __importDefault(require("../models/user"));
const facility_1 = __importDefault(require("../models/facility"));
const router = express_1.default.Router();
const upload = multer_1.default({
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error('Please upload an image'));
        cb(null, true);
    }
});
router.get('/company', async (req, res) => {
    try {
        const companies = await company_1.default.find();
        res.status(200).send(companies);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
router.post('/company/create', upload.single('image'), async (req, res) => {
    try {
        const { name, description, sector } = req.body;
        const companyAlreadyRegistered = await company_1.default.findOne({ name });
        if (companyAlreadyRegistered)
            throw new Error('company already registered on the database');
        const logo = req.file.buffer.toString('base64');
        console.log(logo);
        const newCompany = new company_1.default({ name, description, sector, logo });
        await newCompany.save();
        res.send({ 'sucess': 'company has been created' });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
router.post('/company/info', async (req, res) => {
    try {
        const { name } = req.body;
        let company = await company_1.default.findOne({ name });
        const users = await user_1.default.find({ company });
        const nUsers = users.length;
        const facilities = await facility_1.default.find({ company });
        const nFacilities = facilities.length;
        res.send({ 'sucess': 'company found', nUsers, users, facilities, nFacilities, company });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=company.js.map
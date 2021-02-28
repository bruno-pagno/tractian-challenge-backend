"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_1 = __importDefault(require("../models/company"));
const multer_1 = __importDefault(require("multer"));
const facility_1 = __importDefault(require("../models/facility"));
const machine_1 = __importDefault(require("../models/machine"));
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
router.get('/machine/:company/:facility', async (req, res) => {
    try {
        const { company, facility } = req.params;
        const searchedCompany = await company_1.default.findOne({ name: company });
        if (!searchedCompany)
            throw new Error("Invalid company");
        const companyId = searchedCompany._id;
        const searchedFacility = await facility_1.default.findOne({ name: facility, company: companyId });
        if (!searchedFacility)
            throw new Error("Invalid facility");
        const machines = await machine_1.default.find({ facility: searchedFacility._id });
        res.send({ machines });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
router.post('/machine/create', upload.single('image'), async (req, res) => {
    try {
        const { name, description, model, status, health, facility, company, responsible } = req.body;
        const searchedCompany = await company_1.default.findOne({ name: company });
        if (!searchedCompany)
            throw new Error("Invalid company");
        const companyId = searchedCompany._id;
        const searchedFacility = await facility_1.default.findOne({ name: facility, company: companyId });
        if (!searchedFacility)
            throw new Error("Invalid facility");
        const facilityId = searchedFacility._id;
        const image = req.file.buffer.toString('base64');
        const newMachine = new machine_1.default({ name, description, model, status, health, responsible, facility: facilityId, image });
        await newMachine.save();
        res.send({ 'sucess': 'machine has been created' });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=machine.js.map
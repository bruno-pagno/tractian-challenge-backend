"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_1 = __importDefault(require("../models/company"));
const facility_1 = __importDefault(require("../models/facility"));
const router = express_1.default.Router();
router.post('/facility/create', async (req, res) => {
    try {
        const { name, location, company } = req.body;
        const searchedCompany = await company_1.default.findOne({ name: company });
        if (!searchedCompany)
            throw new Error('Invalid company name');
        const facilityNameAlreadyInUse = await facility_1.default.findOne({ company: searchedCompany._id, name });
        if (facilityNameAlreadyInUse)
            throw new Error('name already in use');
        const companyId = searchedCompany._id;
        const newFacility = new facility_1.default({ name, location, company: companyId });
        await newFacility.save();
        res.send({ 'sucess': 'new facility created' });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
router.post('/facility/company', async (req, res) => {
    try {
        const { company } = req.body;
        const searchedCompany = await company_1.default.findOne({ name: company });
        if (!searchedCompany)
            throw new Error('Invalid company name');
        const facilities = await facility_1.default.findOne({ company: searchedCompany._id });
        res.send({ facilities });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=facility.js.map
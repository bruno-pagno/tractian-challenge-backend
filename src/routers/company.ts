import express from 'express'
import multer from "multer"
import * as companyController from '../controllers/company'
import {upload} from '../util/fileupload'

const router = express.Router();

router.get('/company', companyController.getAllCompanies)
router.post('/company/create', upload.single('image'), companyController.createCompany)
router.post('/company/info', companyController.getCompanyInfo) 
router.delete('/company', companyController.deleteCompany)

export default router;
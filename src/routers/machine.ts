import express, {Response, Request} from 'express'
import Company from '../models/company'
import multer from "multer"
import Facility from '../models/facility';
import Machine from '../models/machine';

const router = express.Router();

const upload = multer({
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error('Please upload an image'))
        
        cb(null, true)
    }
})

router.get('/machine/:company/:facility', async(req: Request, res: Response): Promise<any> => {
    try {
        const {company, facility} = req.params
        
        const searchedCompany = await Company.findOne({name: company})
        if(!searchedCompany)
            throw new Error("Invalid company")

        const companyId = searchedCompany._id

        const searchedFacility = await Facility.findOne({name: facility, company: companyId})
        if(!searchedFacility)
            throw new Error("Invalid facility")
        
        const machines = await Machine.find({facility: searchedFacility._id})
        res.send({machines}) 
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/machine/create', upload.single('image'), async(req: Request, res: Response): Promise<any> => {
    try {
        const {name, description, model, status, health, facility, company, responsible} = req.body 
        const searchedCompany = await Company.findOne({name: company})
        if(!searchedCompany)
            throw new Error("Invalid company")

        const companyId = searchedCompany._id
        const searchedFacility = await Facility.findOne({name: facility, company: companyId})
        if(!searchedFacility)
            throw new Error("Invalid facility")

        const facilityId = searchedFacility._id
        const image = req.file.buffer.toString('base64')
        const newMachine = new Machine({name, description, model, status, health, responsible, facility: facilityId, image })
        await newMachine.save()
        res.send({'sucess': 'machine has been created'})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

export default router;
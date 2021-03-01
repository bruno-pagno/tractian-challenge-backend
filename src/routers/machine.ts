import express, {Response, Request} from 'express'
import Company from '../models/company'
import multer from "multer"
import Facility from '../models/facility';
import Machine from '../models/machine';
import User from '../models/user';

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

router.delete('/machine', async(req: Request, res: Response): Promise<any> => {
    try {
        const machineId = req.body.machine 
        await Machine.deleteOne({_id: machineId})
        res.send({'sucess': 'machine deleted' })
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.patch('/machine', upload.single('image'), async(req: Request, res: Response): Promise<any> => {
    try {
        const machineId = req.body.machine 
        if (!machineId)
            throw new Error('invalid machine')

        if(req.file && req.file.buffer){
            const image = req.file.buffer.toString('base64')
            await Machine.findOneAndUpdate({_id: machineId}, {image})
        }

        if(req.body.name !== undefined)
            await Machine.findOneAndUpdate({_id: machineId}, {name: req.body.name})

        if(req.body.description !== undefined)
            await Machine.findOneAndUpdate({_id: machineId}, {description: req.body.description})

        if(req.body.model !== undefined)
            await Machine.findOneAndUpdate({_id: machineId}, {model: req.body.model})
        
        if(req.body.status !== undefined)
            await Machine.findOneAndUpdate({_id: machineId}, {status: req.body.status})

        if(req.body.health !== undefined){
            await Machine.findOneAndUpdate({_id: machineId}, {health: req.body.health})
        }

        if(req.body.responsible !== undefined)
            await Machine.findOneAndUpdate({_id: machineId}, {model: req.body.responsible})


        res.send({'sucess': 'machine updated'})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})


export default router;
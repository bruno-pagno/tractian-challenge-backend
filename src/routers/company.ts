import express, {Response, Request} from 'express'
import Company from '../models/company'
import multer from "multer"
import User from '../models/user';
import Facility from '../models/facility';

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

router.get('/company', async(req: Request, res: Response): Promise<any> => {
    try {
        const companies = await Company.find() 
        res.status(200).send(companies)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/company/create', upload.single('image'), async(req: Request, res: Response): Promise<any> => {
    try {
        const {name, description, sector} = req.body 
        
        const companyAlreadyRegistered = await Company.findOne({name})
        if(companyAlreadyRegistered)
            throw new Error('company already registered on the database')

        const logo = req.file.buffer.toString('base64')
        console.log(logo)
        const newCompany = new Company({name, description, sector, logo})
        await newCompany.save()
        res.send({'sucess': 'company has been created'})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/company/info', async(req: Request, res: Response): Promise<any> => {
    try {
        const {name} = req.body 
        let company = await Company.findOne({name}) 
        const users =  await User.find({company})
        const nUsers = users.length
        const facilities = await Facility.find({company})
        const nFacilities = facilities.length

        res.send({'sucess': 'company found', nUsers, users, facilities, nFacilities, company })
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.delete('/company', async(req: Request, res: Response): Promise<any> => {
    try {
        const companyId = req.body.company 
        await Company.deleteOne({_id: companyId})
        res.send({'sucess': 'company deleted' })
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})


export default router;
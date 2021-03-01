import Company from '../models/company'
import User from '../models/user'
import Facility from '../models/facility'
import {Request, Response} from 'express'

export async function getAllCompanies (req: Request, res: Response) {
    try {
        const companies = await Company.find() 
        res.status(200).send(companies)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export async function createCompany(req: Request, res: Response) {
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
}

export async function getCompanyInfo(req: Request, res: Response) {
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
}

export async function deleteCompany(req: Request, res: Response) {
    try {
        const companyId = req.body.company 
        await Company.deleteOne({_id: companyId})
        res.send({'sucess': 'company deleted' })
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}
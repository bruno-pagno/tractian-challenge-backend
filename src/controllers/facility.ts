import Company from '../models/company'
import Facility from '../models/facility'
import {Request, Response} from 'express'

export async function createFacility(req: Request, res: Response) {
    try {
        const {name, location, company} = req.body 
        const searchedCompany = await Company.findOne({name: company})
        if(!searchedCompany)
            throw new Error('Invalid company name')
            
        const facilityNameAlreadyInUse = await Facility.findOne({company: searchedCompany._id, name})

        if(facilityNameAlreadyInUse)
            throw new Error('name already in use')
        
        const companyId = searchedCompany._id
        const newFacility = new Facility({name, location, company: companyId})
        await newFacility.save()
        res.send({'sucess': 'new facility created'})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

export async function getFacilityByNameAndCompany(req: Request, res: Response) {
    try {
        const {company} = req.body 
        const searchedCompany = await Company.findOne({name: company})
        if(!searchedCompany)
            throw new Error('Invalid company name')
            
        const facilities = await Facility.findOne({company: searchedCompany._id})
        res.send({facilities})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

export async function deleteFacility(req: Request, res: Response) {
    try {
        const facilityId = req.body.facility 
        await Facility.deleteOne({_id: facilityId})
        res.send({'sucess': 'facility deleted' })
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}
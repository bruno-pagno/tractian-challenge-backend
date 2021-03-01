import Company from '../models/company'
import User from '../models/user'
import {Request, Response} from 'express'

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await User.find() 
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)
    }
}

export async function createUser (req: Request, res: Response) {
    try {
        const {name, email, age, company} = req.body 
        const searchedCompany = await Company.findOne({name: company})
        if(!searchedCompany)
            throw new Error('Invalid company name')
            
        const companyId = searchedCompany._id
        const newUser = new User({name, email, age, company: companyId})
        await newUser.save()
        res.send({'sucess': 'new user created'})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const userId = req.body.user 
        await User.deleteOne({_id: userId})
        res.send({'sucess': 'user deleted' })
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}
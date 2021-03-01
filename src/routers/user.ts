import express, {Response, Request} from 'express'
import Company from '../models/company';
import User from '../models/user'
import * as userController from '../controllers/users'

const router = express.Router();

router.get('/user', userController.getAllUsers)
router.post('/user/create', userController.createUser)
router.delete('/user', userController.deleteUser)

export default router;
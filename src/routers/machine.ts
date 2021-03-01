import express from 'express'
import {upload} from '../util/fileupload'
import * as machineController from '../controllers/machine'

const router = express.Router();

router.get('/machine/:company/:facility', machineController.getMachinesByCompanyAndFacility)
router.post('/machine/create', upload.single('image'), machineController.createMachine)
router.delete('/machine', machineController.deleteMachineById)
router.patch('/machine', upload.single('image'), machineController.updateMachineById)


export default router;
import express from 'express'
import * as facilityController from '../controllers/facility'

const router = express.Router();

router.post('/facility/create', facilityController.createFacility)
router.post('/facility/company', facilityController.getFacilityByNameAndCompany)
router.delete('/facility', facilityController.deleteFacility)

export default router;
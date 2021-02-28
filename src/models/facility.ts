import mongoose from "mongoose"

const facilitySchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    location: {type: 'string', required: true},
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
}, { timestamps: false })

const Facility = mongoose.model('Facility', facilitySchema)
export default Facility
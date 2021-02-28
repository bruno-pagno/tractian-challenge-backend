import mongoose from "mongoose"

// For demosntration purposes, the name of the company will be a primary key, 
// althrough its not true in real life
const companySchema = new mongoose.Schema({
    name: {type: 'string', required: true, unique:true }, 
    description: {type: 'string', required: true},
    sector: {type: 'string', required: true},
    logo: {type: 'string', required: true}
}, { timestamps: true })

const Company = mongoose.model('Company', companySchema)
export default Company
import mongoose from "mongoose"

const machineSchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    description: {type: 'string', required: true},
    model: {type: 'string', required: true},
    status: {type: 'string', required: true},
    health: {type: 'number', required: true},
    image: {type: 'string', required: true},
    facility: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
    responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, { timestamps: false })

const Machine = mongoose.model('Machine', machineSchema)
export default Machine
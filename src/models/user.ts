import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    email: {type: 'string', required: true, unique: true},
    age: {type: 'number', required: true},
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
}, { timestamps: false })

const User = mongoose.model('User', userSchema)
export default User
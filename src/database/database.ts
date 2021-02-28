import mongoose from 'mongoose'

const mongoURL: string = process.env.MONGO_URL! 
mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log("Sucessfully connected into the database!"))
    .catch((error) => {
        console.log('Failed to connect to the database', error.message)
        process.exit(1)
    })
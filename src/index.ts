import express from "express"
import bodyParser from 'body-parser'
import cors from 'cors'
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(cors())

// routers
import companyRouter from './routers/company'
import userRouter from './routers/user'
import facilityRouter from './routers/facility'
import machineRouter from './routers/machine'

app.use(companyRouter, userRouter, facilityRouter, machineRouter);

require('./database/database')

const PORT = process.env.PORT || 3333
app.listen(PORT, ()=> {
    console.log(`Server is up on port ${PORT}`)
})
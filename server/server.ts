import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { config } from './config'
import { PetRouter } from './routes/api/PetRouter'

// Init express app
const app = express()
    
// Connect to Database
mongoose.connect(config.databaseURI, {useNewUrlParser: true})
    .then(() => console.log('Connected to DB'))

// BodyParser middleware
app.use(bodyParser.json())

// Pet routes
app.use('/api/pets', PetRouter)

// Listen port 
app.listen(config.expressPort, () => console.log('Application listen on port ' + config.expressPort))
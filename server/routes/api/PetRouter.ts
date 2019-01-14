import express, { Request, Response } from 'express'
import { PetModel } from '../../models/PetModel'

// Export routes
export const PetRouter = express.Router()

// @route   GET api/pets
// @desc    Get All pets
// @acess   Public
PetRouter.get('/', (req:Request, res:Response) => {
    // Get all pets sorted DESC entryDate
    PetModel.find()
        .sort({entryDate: -1})
        .then(pets => res.json(pets))
        .catch(error => res.json({message:error.message}))
})

// @route   GET api/pets/:rfid
// @desc    Get One pet by its RFID
// @acess   Public
PetRouter.get('/:rfid', (req:Request, res:Response) => {
    // Get the pet by its RFID
    PetModel.findOne({rfid:req.params.rfid})
        .then(pet => res.json(pet))
        .catch(error => res.json({message:error.message}))
})

// @route   POST api/pets
// @body    JSON of the PET to insert
// @desc    Add a pet
// @acess   Public (TODO: make it private with auth)
PetRouter.post('/', (req:Request, res:Response) => {
    // Create Pet from request body
    const newPet = new PetModel({
        rfid: req.body.rfid,
        species: req.body.species,
        race: req.body.race,
        height: req.body.height,
        weight: req.body.weight,
        description: req.body.description,
        entryDate: req.body.entryDate,
        birthDate: req.body.birthDate
    })
    // Persist the pet in DB
    newPet.save()
        .then(success => res.json(success))
        .catch(error => res.json({message:error.message}))
})

// @route   PUT api/pets
// @body    JSON of the the pet to update (RFID has to be provided)
// @desc    Update a pet
// @acess   Public (TODO: make it private with auth)
PetRouter.put('/', (req:Request, res:Response) => {
    // Find and persist in DB
    PetModel.findOneAndUpdate({rfid:req.body.rfid}, {$set:{
        species: req.body.species,
        race: req.body.race,
        height: req.body.height,
        weight: req.body.weight,
        description: req.body.description,
        entryDate: req.body.entryDate,
        birthDate: req.body.birthDate
    }}, {new:true})
        .then(success => res.json(success))
        .catch(error => res.json({message:error.message}))
})

// @route   DELETE api/pets/
// @body    JSON with RFID of Pet to delete
// @desc    Delete a pet
// @acess   Public (TODO: make it private with auth)
PetRouter.delete('/', (req:Request, res:Response) => {
    // Find and delete
    PetModel.findOneAndDelete({rfid:req.body.rfid})
        .then(success => res.json(success))
        .catch(error => res.json(error))
})
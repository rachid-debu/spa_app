"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var PetModel_1 = require("../../models/PetModel");
// Export routes
exports.PetRouter = express_1.default.Router();
// @route   GET api/pets
// @desc    Get All pets
// @acess   Public
exports.PetRouter.get('/', function (req, res) {
    // Get all pets sorted DESC entryDate
    PetModel_1.PetModel.find()
        .sort({ entryDate: -1 })
        .then(function (pets) { return res.json(pets); })
        .catch(function (error) { return res.json(error); });
});
// @route   GET api/pets/:rfid
// @desc    Get One pet by its RFID
// @acess   Public
exports.PetRouter.get('/:rfid', function (req, res) {
    // Get the pet by its RFID
    PetModel_1.PetModel.findOne({ rfid: req.params.rfid })
        .then(function (pet) { return res.json(pet); })
        .catch(function (error) { return res.json(error); });
});
// @route   POST api/pets
// @body    JSON of the PET to insert
// @desc    Add a pet
// @acess   Public (TODO: make it private with auth)
exports.PetRouter.post('/', function (req, res) {
    // Create Pet from request body
    var newPet = new PetModel_1.PetModel({
        rfid: req.body.rfid,
        species: req.body.species,
        race: req.body.race,
        height: req.body.height,
        weight: req.body.weight,
        description: req.body.description,
        entryDate: req.body.entryDate,
        birthDate: req.body.birthDate
    });
    // Persist the pet in DB
    newPet.save()
        .then(function (success) { return res.json(success); })
        .catch(function (error) { return res.json(error); });
});
// @route   PUT api/pets
// @body    JSON of the the pet to update (RFID has to be provided)
// @desc    Update a pet
// @acess   Public (TODO: make it private with auth)
exports.PetRouter.put('/', function (req, res) {
    // Find and persist in DB
    PetModel_1.PetModel.findOneAndUpdate({ rfid: req.body.rfid }, { $set: {
            species: req.body.species,
            race: req.body.race,
            height: req.body.height,
            weight: req.body.weight,
            description: req.body.description,
            entryDate: req.body.entryDate,
            birthDate: req.body.birthDate
        } }, { new: true })
        .then(function (success) { return res.json(success); })
        .catch(function (error) { return res.json(error); });
});
// @route   DELETE api/pets/
// @body    JSON with RFID of Pet to delete
// @desc    Delete a pet
// @acess   Public (TODO: make it private with auth)
exports.PetRouter.delete('/', function (req, res) {
    // Find and delete
    PetModel_1.PetModel.findOneAndDelete({ rfid: req.body.rfid })
        .then(function (success) { return res.json(success); })
        .catch(function (error) { return res.json(error); });
});

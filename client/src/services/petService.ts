import PetModel from '../models/PetModel'
import axios from 'axios'

// This class contains all API call methods for Pets
export default class PetService {

    // GET /api/pets/:rfid
    // Find a Pet by RFID
    static async fetchPet(rfid:string) {
        return await axios.get('/api/pets/' + rfid)
            .then((res) => {return res.data})
            .catch((err) => {return err})
    }

    // GET /api/pets
    // Find all pets
    static async fetchPets() {
        return await axios.get('/api/pets/')
            .then((res) => {return res.data})
            .catch((err) => {return err})
    }

    // POST /api/pets
    // Add a Pet
    static async addPet(pet: PetModel) {
        console.log('a pet will be added', pet)
        
        return await axios.post('/api/pets/', pet)
            .then((res) => {return res.data})
            .catch((err) => {return err})
    }

    // PUT /api/pets
    // Edit a Pet
    static async editPet(pet: PetModel) {
        console.log('a pet will be edited', pet)

        return await axios.put('/api/pets/', pet)
            .then((res) => {return res.data})
            .catch((err) => {return err})
    }
}
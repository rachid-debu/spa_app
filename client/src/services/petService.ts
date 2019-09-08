import axios from 'axios';
import PetModel from '../models/PetModel';

// This class contains all API call methods for Pets
export default class PetService {
	// GET /api/pets/:rfid
	// Find a Pet by RFID
	public static async fetchPet(rfid: string) {
		return axios
			.get('/api/pets/' + rfid)
			.then((res: any) => {
				return res.data;
			})
			.catch((err: any) => {
				return err;
			});
	}

	// GET /api/pets
	// Find all pets
	public static async fetchPets() {
		return axios
			.get('/api/pets/')
			.then((res: any) => {
				return res.data;
			})
			.catch((err: any) => {
				return err;
			});
	}

	// POST /api/pets
	// Add a Pet
	public static async addPet(pet: PetModel) {
		console.log('a pet will be added', pet);

		return axios
			.post('/api/pets/', pet)
			.then((res: any) => {
				return res.data;
			})
			.catch((err: any) => {
				return err;
			});
	}

	// PUT /api/pets
	// Edit a Pet
	public static async editPet(pet: PetModel) {
		console.log('a pet will be edited', pet);

		return axios
			.put('/api/pets/', pet)
			.then((res: any) => {
				return res.data;
			})
			.catch((err: any) => {
				return err;
			});
	}
}

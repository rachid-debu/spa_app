import { Action, Dispatch } from "redux";
import PetModel from "../models/PetModel";
import PetService from "../services/petService";

// Action names
export const FETCH_PETS = 'FETCH_PETS'
export const FETCH_PETS_SUCCESS = 'FETCH_PETS_SUCCESS'
export const FETCH_PETS_ERROR = 'FETCH_PETS_ERROR'
export const FETCH_PET = 'FETCH_PET'
export const FETCH_PET_SUCCESS = 'FETCH_PET_SUCCESS'
export const FETCH_PET_ERROR = 'FETCH_PET_ERROR'
export const ADD_PET = 'ADD_PET'
export const ADD_PET_SUCCESS = 'ADD_PET_SUCCESS'
export const ADD_PET_ERROR = 'ADD_PET_ERROR'
export const EDIT_PET = 'EDIT_PET'
export const EDIT_PET_SUCCESS = 'EDIT_PET_SUCCESS'
export const EDIT_PET_ERROR = 'EDIT_PET_ERROR'

export interface PetFindActionOptions {
    rfid: string
}

export interface PetAction extends Action {
    type: string,
    pet?: PetModel,
    pets?: PetModel[],
    error?: Error
}

// Fetch PETS actions
function dispatchFetchPetsProgress(): PetAction {
    return {
        type: FETCH_PETS
    }
}
function dispatchFetchPetsSuccess(pets: PetModel[]): PetAction {
    return {
        type: FETCH_PETS_SUCCESS,
        pets
    }
}
function dispatchFetchPetsError(error: Error): PetAction {
    return {
        type: FETCH_PETS_ERROR,
        error
    }
}

// Fetch PET actions
function dispatchFetchPetProgress(): PetAction {
    return {
        type: FETCH_PET
    }
}
function dispatchFetchPetSuccess(pet: PetModel): PetAction {
    return {
        type: FETCH_PET_SUCCESS,
        pet
    }
}
function dispatchFetchPetError(error: Error): PetAction {
    return {
        type: FETCH_PET_ERROR,
        error
    }
}

// Add PET actions
function dispatchAddPetProgress(pet: PetModel): PetAction {
    return {
        type: ADD_PET,
        pet
    }
}
function dispatchAddPetSuccess(pet: PetModel): PetAction {
    return {
        type: ADD_PET_SUCCESS,
        pet
    }
}
function dispatchAddPetError(error: Error): PetAction {
    return {
        type: ADD_PET_ERROR,
        error
    }
}

// Edit PET actions
function dispatchEditPetProgress(pet: PetModel): PetAction {
    return {
        type: EDIT_PET,
        pet
    }
}
function dispatchEditPetSuccess(pet: PetModel): PetAction {
    return {
        type: EDIT_PET_SUCCESS,
        pet
    }
}
function dispatchEditPetError(error: Error): PetAction {
    return {
        type: EDIT_PET_ERROR,
        error
    }
}

// Action get ALL pets (GET /api/pets)
export function actionFetchPets() {
    return async (dispatch: Dispatch<PetAction>) => {
        dispatch(dispatchFetchPetsProgress())
        return PetService.fetchPets()
            .then((pets: PetModel[]) => {
                return dispatch(dispatchFetchPetsSuccess(pets))
            })
            .catch((error: Error) => { 
                return dispatch(dispatchFetchPetsError(error))
            })
    }
}

// Action get ONE pet (from rfid) (GET /api/pets/:rfid)
export function actionFetchPet(rfid:string) {
    return async (dispatch: Dispatch<PetAction>) => {
        dispatch(dispatchFetchPetProgress())
        return PetService.fetchPet(rfid)
            .then((pet: PetModel) => {
                return dispatch(dispatchFetchPetSuccess(pet))
            })
            .catch((error: Error) => {
                return dispatch(dispatchFetchPetError(error))
            })
    }
}

// Action add ONE pet (POST /api/pets)
export function actionAddPet(pet: PetModel) {
    console.log('add');
    console.log(pet);
    
    return async (dispatch: Dispatch<PetAction>) => {
        dispatch(dispatchAddPetProgress(pet))
        return PetService.addPet(pet)
            .then((pet: PetModel) => {
                return dispatch(dispatchAddPetSuccess(pet))
            })
            .catch((error: Error) => { 
                return dispatch(dispatchAddPetError(error))
            })
    }
}

// Action edit ONE pet (PUT /api/pets)
export function actionEditPet(pet: PetModel) {
    console.log('edit');
    console.log(pet);
    
    
    return async (dispatch: Dispatch<PetAction>) => {
        dispatch(dispatchEditPetProgress(pet))
        return PetService.editPet(pet)
            .then((pet: PetModel) => {
                return dispatch(dispatchEditPetSuccess(pet))
            })
            .catch((error: Error) => { 
                return dispatch(dispatchEditPetError(error))
            })
    }
}
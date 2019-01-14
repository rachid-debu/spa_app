import { FETCH_PET, FETCH_PET_ERROR, FETCH_PET_SUCCESS, FETCH_PETS, FETCH_PETS_SUCCESS, FETCH_PETS_ERROR, PetAction } from "../actions/petActions";
import PetModel from "../models/PetModel";

export interface AppState {
    type?: string,
    pet?: PetModel,
    pets?: PetModel[]
    error?: Error
}

export default (state = {}, action: PetAction) => {
    switch (action.type) {
        case FETCH_PET:
            return Object.assign({}, state, {type: action.type})
        case FETCH_PET_SUCCESS:
            return Object.assign({}, state, {pet: action.pet})
        case FETCH_PET_ERROR:
            return Object.assign({}, state, {error: action.error})
        
        case FETCH_PETS:
            return Object.assign({}, state, {type: action.type})
        case FETCH_PETS_SUCCESS:
            return Object.assign({}, state, {pets: action.pets})
        case FETCH_PETS_ERROR:
            return Object.assign({}, state, {error: action.error})
        
        default:
            return state
    }
}
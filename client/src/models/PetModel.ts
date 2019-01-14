type speciesAllowed = ["Cat", "Dog", "Bird"]

export default interface PetModel {
    rfid: string,
    species: speciesAllowed,
    race: string,
    height: number,
    weight: number,
    description: string,
    entryDate: Date,
    birthDate: Date
}
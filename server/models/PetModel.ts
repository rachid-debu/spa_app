import mongoose, { Schema, model } from 'mongoose'

const PetSchema = new Schema({
    rfid: {
        type: String,
        required: [true, 'RFID number is required']
    },
    species: {
        type: String,
        required: true,
        trim: true
    },
    race: {
        type: String
    },
    height: {
        type: Number,
        min: [0, 'Height must be a positive value'],
        required: [true, 'Height is required']
    },
    weight: {
        type: Number,
        min: [0, 'Weight must be a positive value'],
        required: [true, 'Weight is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    entryDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    birthDate: {
        type: Date
    }
})

// RFID validation is 2-step (we need 2 different messages)
// UNIQUE validation
PetSchema.path('rfid').validate((value:string) => {
    return mongoose.model('Pet').countDocuments({rfid:value})
        .then((count) => {return !count})
        .catch((err) => {return err})
}, 'RFID must be unique')
// FORMAT validation
PetSchema.path('rfid').validate((value:string) => {
    return (/\d{3}\.\d{12}/).test(value)
}, 'RFID must be 000.000000000000')

export const PetModel = model('Pet', PetSchema)
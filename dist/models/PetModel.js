"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var speciesAllowed = ["Cat", "Dog", "Bird"];
var PetSchema = new mongoose_1.Schema({
    rfid: {
        type: String,
        required: [true, 'RFID number is required'],
    },
    species: {
        type: String,
        required: true,
        trim: true,
        enum: {
            values: speciesAllowed,
            message: "We only allow " + speciesAllowed.join(" or ")
        }
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
});
// RFID validation is 2-step (we need 2 different messages)
// UNIQUE validation
PetSchema.path('rfid').validate(function (value) {
    return mongoose_1.default.model('Pet').countDocuments({ rfid: value })
        .then(function (count) { return !count; })
        .catch(function (err) { return err; });
}, 'RFID must be unique');
// FORMAT validation
PetSchema.path('rfid').validate(function (value) {
    return (/\d{3}\.\d{12}/).test(value);
}, 'RFID must be 000.000000000000');
exports.PetModel = mongoose_1.model('Pet', PetSchema);

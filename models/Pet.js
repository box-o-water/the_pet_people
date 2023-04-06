const { Schema, model } = require('mongoose');

const petSchema = new Schema({
    animalType: {
        type: String,
        required: true
    },
    Breed: {
        type: String,
        required: true
    },
    Size: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    age: {
        type: Number,
        required: true
    },
    isNeutered: {
        type: Boolean,
        default: false
    }
});

const Pet = model('Pet', petSchema)

module.exports = Pet;
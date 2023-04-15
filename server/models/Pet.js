const { Schema, model } = require('mongoose');

const petSchema = new Schema({
    animalType: {
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    size: {
        type: String,
    },
    img: {
        type: String,
    },
    age: {
        type: Date,
        required: true
    },
    isFixed: {
        type: Boolean,
        default: false
    },
});

const Pet = model('Pet', petSchema)

module.exports = Pet;
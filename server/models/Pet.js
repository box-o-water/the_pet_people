const { mongoose, model } = require('mongoose');

const petSchema = new mongoose.Schema({
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
    gender: {
        type: String,
        enum: ['female', 'male', 'other'],
        required: true
    },
    size: {
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
    isFixed: {
        type: Boolean,
        default: false
    },
});

const Pet = model('Pet', petSchema)

module.exports = Pet;
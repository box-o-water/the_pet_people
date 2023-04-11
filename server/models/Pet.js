const { Schema, model, mongoose } = require('mongoose');

const petSchema = new Schema({
    animalType: {
        type: String,
        required: true
    },
    name: {
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
    renter: {
        type:  mongoose.Schema.Types.String,
        ref: "Renter",
        required: true
      }
});

const Pet = model('Pet', petSchema)

module.exports = Pet;
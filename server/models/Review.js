const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema({
    landlord:{
        type: String,
        required: true,
    },
    reviewContents: {
        type: String,
        required: true,
        minlength: 10,
        trim: true,
    },
    rating:{
        type: Number,
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});


const Review = model('Review', reviewSchema)

module.exports = Review;
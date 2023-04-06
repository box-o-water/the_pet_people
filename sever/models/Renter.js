const { Schema, model, mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const renterSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
      },
    img: {
        type: String,
    },
    location: {
        type: String,
    },
    // references the pet model to generate an array with all the renters pets.
    pet: [
        { 
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Pet',
        },
      ],
      // references the review model to generate an array with all the renters reviews.
      reviews: [
        { 
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Review',
        },
      ]
});

// encrypts password before save
renterSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// compares passwords for login
renterSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Renter = model('Renter', renterSchema)

module.exports = Renter;
const { AuthenticationError } = require('apollo-server-express');
const { Pet, Renter, Review } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // finds all renters
    renters: async () => {
      return await Renter.find()
      .populate({
        path: 'pets',
        model: 'Pet',
      })
      .populate({
        path: 'reviews',
        model: 'Review',
      });
    },
    // finds all pets
    pets: async () => {
      return await Pet.find({});
    },
    // finds all reviews
    reviews: async () => {
      return await Review.find({});
    }
  },

  Mutation: {
    // Renters are Users, but for future purposes we are calling them Renters
    addRenter: async (parent, { username, email, password }) => {
      const renter = await Renter.create({ username, email, password });
      const token = signToken(renter);
      return { token, renter };
    },
    login: async (parent, { email, password }) => {
      const renter = await Renter.findOne({ email });

      if (!renter) {
        console.log("wrong username");
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await renter.checkPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
        console.log("wrong password");
      }
      console.log(renter)
      const token = signToken(renter);

      return { token, renter };
    }
  }
};

module.exports = resolvers;

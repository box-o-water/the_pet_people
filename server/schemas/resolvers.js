const { Pet, Renter, Review } = require('../models');

const resolvers = {
  Query: {
    Renters: async () => {
      return await Renter.find({});

    },
    Pets: async () => {

      return await Pet.find({});
    },
    Reviews: async () => {
      return await Review.find({});
    }
  },

};

module.exports = resolvers;

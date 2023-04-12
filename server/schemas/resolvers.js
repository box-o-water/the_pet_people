const { Pet, Renter, Review } = require('../models');

const resolvers = {
  Query: {
    // finds all renters
    Renters: async () => {
      return await Renter.find({})
      .populate({
        path: 'pets',
        select: 'petName breed age',
        model: 'Pet',
      })
      .populate({
        path: 'reviews',
        select: 'reviewContents',
        model: 'Review',
      });
    },
    // finds all pets
    Pets: async () => {
      return await Pet.find({});
    },
    // finds all reviews
    Reviews: async () => {
      return await Review.find({});
    }
  },

};

module.exports = resolvers;

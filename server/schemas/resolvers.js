const { Pet, Renter, Review } = require('../models');

const resolvers = {
  Query: {
    // finds all renters
    renters: async () => {
      return await Renter.find()
      .populate({
        path: 'pets',
        model: 'pet',
      })
      .populate({
        path: 'reviews',
        model: 'review',
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
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.checkPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;

const { AuthenticationError } = require("apollo-server-express");
// const { Pet, User, Review } = require('../models');
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // // finds all users
    // users: async () => {
    //   return await User.find()
    //     .populate({
    //       path: "pets",
    //       model: "Pet",
    //     })
    //     .populate({
    //       path: "reviews",
    //       model: "Review",
    //     });
    // },
    // // finds all pets
    // pets: async () => {
    //   return await Pet.find({});
    // },
    // // finds all reviews
    // reviews: async () => {
    //   return await Review.find({});
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    // users are Users, but for future purposes we are calling them users
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        console.log("wrong username");
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.checkPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
        console.log("wrong password");
      }
      console.log(user);
      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;

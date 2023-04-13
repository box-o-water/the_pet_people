const { AuthenticationError } = require("apollo-server-express");
// const { Pet, Renter, Review } = require('../models');
const { Renter, Pet } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // // finds all renters
    renters: async () => {
      return await Renter.find()
        .populate({
          path: "pets",
          model: "Pet",
        })
        .populate({
          path: "reviews",
          model: "Review",
        });
    },

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
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await renter.checkPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
        console.log("wrong password");
      }
      console.log(renter);
      const token = signToken(renter);

      return { token, renter };
    },
    // updates the renters information
    updateRenter: async (parent, { username, email, password, img, location }, context) => {
      try {
        const renter = await Renter.findById(context._id);
    
        if (!renter) {
          throw new AuthenticationError('You must be logged in to update your profile.');
        }
    
        renter.username = username || renter.username;
        renter.email = email || renter.email;
        renter.password = password || renter.password
        renter.img = img || renter.img;
        renter.location = location || renter.location;
    
        await renter.save();
    
        const token = signToken(renter);
    
        return { token, renter };
      } catch (error) {
        console.log(error);
      }
    },
    addPet: async (parent, { petName, animalType, breed, gender, size, img, age, isFixed }, context) => {
      try {
        // Check if user is authenticated
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to add a pet.');
        }
    
        // Create a new Pet document
        const newPet = new Pet({
          petName,
          animalType,
          breed,
          gender,
          size,
          img,
          age,
          isFixed
        });
    
        // Save the new Pet document to the database
        const savedPet = await newPet.save();
    
        // Update the owner's pets array with the new Pet ID
        const updatedRenter = await Renter.findOneAndUpdate(
          { username: context.user.username },
          { $push: { pets: savedPet._id } },
          { new: true }
        );
    
        return { token: signToken(updatedRenter), renter: updatedRenter };
      } catch (error) {
        console.log(error);
      }
    },

  }
};
module.exports = resolvers;

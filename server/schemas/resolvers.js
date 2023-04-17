const { AuthenticationError } = require("apollo-server-express");
const { UserInputError } = require("apollo-server-errors");
const { User, Pet, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // find all users
    users: async () => {
      return await User.find()
        .populate({
          path: "pets",
          model: "Pet",
        })
        .populate({
          path: "reviews",
          model: "Review",
        });
    },
    // find a single user by id
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return await User.find(params)
        .populate({
          path: "pets",
          model: "Pet",
        })
        .populate({
          path: "reviews",
          model: "Review",
        });
    },

    // find the logged-in user

    me: async (parent, args, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate({
            path: "pets",
            model: "Pet",
          })
          .populate({
            path: "reviews",
            model: "Review",
          });
        return data;
      }
    },
  },

  Mutation: {
    // add a user
    addUser: async (parent, { username, email, password }) => {
      try {
        let user = await User.findOne({ username });

        if (user) {
          // If the username already exists, generate a new unique username
          const randomNumber = Math.floor(Math.random() * 1000);
          username = `${username}${randomNumber}`;
        }

        user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },

    // log in a user
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email })
          .populate({
            path: "pets",
            model: "Pet",
          })
          .populate({
            path: "reviews",
            model: "Review",
          });

        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const correctPw = await user.checkPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },

    // delete a user
    deleteUser: async (parent, { username }) => {
      try {
        // Find the user to be deleted
        const user = await User.findOne({ username });

        if (!user) {
          throw new UserInputError("User not found.");
        }

        // Remove the user's pets and reviews from the database
        await Pet.deleteMany({ _id: { $in: user.pets } });
        await Review.deleteMany({ _id: { $in: user.reviews } });

        // Delete the user document from the database
        await User.deleteOne({ _id: user._id });

        return { message: "User and associated data successfully deleted." };
      } catch (error) {
        console.log(error);
      }
    },

    // updates the Users information
    updateUser: async (parent, { username, email, location }, context) => {
      try {
        const user = await User.findById(context.user._id).select(
          "-__v -password"
        );

        if (!user) {
          throw new AuthenticationError(
            "You must be logged in to update your profile."
          );
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.img = img || user.img;
        user.location = location || user.location;

        const updatedUser = await user.save();

        return { token: signToken(updatedUser) };
      } catch (error) {
        console.log(error);
      }
    },

    // add a pet to the user
    addPet: async (
      parent,
      { petName, animalType, breed, size, age },
      context
    ) => {
      try {
        // Check if user is authenticated
        if (!context.user._id) {
          throw new AuthenticationError("You must be logged in to add a pet.");
        }
        console.log({ petName, animalType, breed, size, age });
        // Create a new Pet document
        const newPet = new Pet({
          petName,
          animalType,
          breed,
          size,
          age,
        });

        // Save the new Pet document to the database
        const savedPet = await newPet.save();

        // Update the owner's pets array with the new Pet ID
        const updatedUser = await User.findOneAndUpdate(
          { username: context.user.username },
          { $push: { pets: savedPet._id } },
          { new: true }
        );

        return {
          token: signToken(updatedUser),
          user: updatedUser,
        };
      } catch (error) {
        console.log(error);
      }
    },

    // update a pet that already exists
    updatePet: async (
      parent,
      { petName, animalType, breed, size, age, _id },
      context
    ) => {
      try {
        const userId = context.user._id;

        const user = await User.findById(userId);

        if (!user) {
          throw new AuthenticationError(
            "You must be logged in to update your pet."
          );
        }

        const pet = await Pet.findById(_id);

        if (!pet) {
          throw new UserInputError("Pet not found.");
        }

        pet.petName = petName || pet.petName;
        pet.animalType = animalType || pet.animalType;
        pet.breed = breed || pet.breed;
        pet.size = size || pet.size;
        pet.age = age || pet.age;

        // Save the updated Pet document to the database
        const updatedPet = await pet.save();

        return;
      } catch (error) {
        console.log(error);
      }
    },

    // delete a pet
    deletePet: async (parent, { petId }, context) => {
      try {
        console.log(petId);
        const deletedPet = await Pet.findByIdAndDelete(petId);
        // Remove the pet from the user's pets array

        return deletedPet;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to delete pet");
      }
    },

    // add a review to a user
    addReview: async (
      parent,
      { landlord, reviewContents, rating, userReviewed }
    ) => {
      try {
        // find the user being reviewed
        const user = await User.findOne({ username: userReviewed });
        if (!user) {
          console.log("User does not exist");
          return null;
        }
        // Create a new Review document
        const newReview = new Review({
          landlord,
          reviewContents,
          rating,
        });
        // Save the new Review document to the database
        const savedReview = await newReview.save();

        // Update the user's reviews array with the new Review ID
        await User.findByIdAndUpdate(
          { _id: user._id },
          { $push: { reviews: savedReview._id } },
          { new: true }
        );

        return;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
module.exports = resolvers;

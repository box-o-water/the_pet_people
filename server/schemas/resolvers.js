const { AuthenticationError } = require("apollo-server-express");
const { User, Pet, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // // finds all users
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
    user: async (parent, { username }) => {
      const params = username ? { username } : {};
      return User.find(params);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate({
            path: "pets",
            model: "Pet",
          });

        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    // users are Users, but for future purposes we are calling them users
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
    // deletes user
    deleteUser: async (parent, { username }) => {
      try {
        // Find the user to be deleted
        const user = await User.findOne({ username });
  
        if (!user) {
          throw new UserInputError('User not found.');
        }
  
        // Remove the user's pets and reviews from the database
        await Pet.deleteMany({ _id: { $in: user.pets } });
        await Review.deleteMany({ _id: { $in: user.reviews } });
  
        // Delete the user document from the database
        await User.deleteOne({ _id: user._id });
  
        return { message: 'User and associated data successfully deleted.' };
      } catch (error) {
        console.log(error);
      }
    },
    // updates the Users information
    updateUser: async (parent, { username, email, img, location }, context) => {
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

    // adds a pet to the database
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
           user: updatedUser
        };
      } catch (error) {
        console.log(error);
      }
    },
    // updates pet that already exists
    updatePet: async (
      parent,
      { _id, petName, animalType, breed, size, img, age, isFixed },
      context
    ) => {
      try {
        const user = await User.findById(context._id);

        if (!user) {
          throw new AuthenticationError(
            "You must be logged in to update your pet."
          );
        }
        console.log(animalType)
        const pet = await Pet.findById(_id);

        if (!pet) {
          throw new UserInputError("Pet not found.");
        }

        pet.petName = petName || pet.petName;
        pet.animalType = animalType || pet.animalType;
        pet.breed = breed || pet.breed;
        pet.size = size || pet.size;
        pet.img = img || pet.img;
        pet.age = age || pet.age;
        pet.isFixed = isFixed || pet.isFixed;

        // Save the updated Pet document to the database
        const updatedPet = await pet.save();

        return { pet: updatedPet, user: user };
      } catch (error) {
        console.log(error);
      }
    },
    deletePet: async (parent, { petId }, context) => {
      try {
        console.log(petId)
        const deletedPet = await Pet.findByIdAndDelete(petId);
        // Remove the pet from the user's pets array
    
        return deletedPet;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to delete pet");
      }
    },
    // adds a review to a user
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
        const updatedUser = await User.findByIdAndUpdate(
          { _id: user._id },
          { $push: { reviews: savedReview._id } },
          { new: true }
        );

        return {
          _id: savedReview._id,
          landlord: savedReview.landlord,
          rating: savedReview.rating,
          reviewContents: savedReview.reviewContents,
        };
      } catch (error) {
        console.log(error);
      }
    },

    //next mutation goes here
  },
};
module.exports = resolvers;

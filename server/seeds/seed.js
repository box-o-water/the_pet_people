const db = require("../config/connection");
const { User, Review, Pet } = require("../models");

const renterData = require("./users.json");
const reviewData = require("./reviews.json");
const petData = require("./pets.json");

db.once("open", async () => {
  // clean database
  await User.deleteMany({});
  await Review.deleteMany({});
  await Pet.deleteMany({});

  // bulk create each model
  const users = await User.insertMany(renterData);
  const reviews = await Review.insertMany(reviewData);
  const pets = await Pet.insertMany(petData);

  for (newReview of reviews) {
    // randomly add a review to each user
    const tempRenter = users[Math.floor(Math.random() * users.length)];
    tempRenter.reviews.push(newReview._id);
    await tempRenter.save();
  }

  for (newPet of pets) {
    const tempRenter = users[Math.floor(Math.random() * users.length)];
    tempRenter.pets.push(newPet._id);
    await tempRenter.save();
  }
  console.log();
  console.log("all done!");
  process.exit(0);
});

const db = require('../config/connection');
const { Renter, Review, Pet } = require('../models');

const renterData = require('./renters.json');
const reviewData = require('./reviews.json');
const petData = require('./pets.json');

db.once('open', async () => {
  // clean database
  await Renter.deleteMany({});
  await Review.deleteMany({});
  await Pet.deleteMany({});

  // bulk create each model
  const renters = await Renter.insertMany(renterData);
  const reviews = await Review.insertMany(reviewData);
  const pets = await Pet.insertMany(petData);

  for (newReview of reviews) {
    // randomly add a review to each renter
    const tempRenter = renters[Math.floor(Math.random() * renters.length)];
    tempRenter.reviews.push(newReview._id);
    await tempRenter.save();

  }

  for (newPet of pets){
    const tempRenter = renters[Math.floor(Math.random() * renters.length)];
    tempRenter.pets.push(newPet._id);
    await tempRenter.save();
  }
  console.log(  )
  console.log('all done!');
  process.exit(0);
});

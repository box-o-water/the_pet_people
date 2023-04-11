const db = require('../config/connection');
const { Renter, Pet, Review } = require('../models');

const renterData = require('./renterData.json');
const petData = require('./petData.json');
const reviewData = require('./reviewData.json');

db.once('open', async () => {
  // clean database
  await Renter.deleteMany({});
  await Pet.deleteMany({});
  await Review.deleteMany({});

  // bulk create each model
  await Renter.insertMany(renterData);
  await Pet.insertMany(petData);
  await Review.insertMany(reviewData);

  console.log('all done!');
  process.exit(0);
});

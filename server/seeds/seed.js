const db = require('../config/connection');

const Renter = require('../models/Renter');
const Review = require('../models/Review');
const Pet = require('../models/Pet');

const seedData = {
  renters: [
    {
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: "password",
      img: 'https://via.placeholder.com/150',
      location: 'New York, NY'
    },
    {
      username: 'janedoe',
      email: 'janedoe@example.com',
      password: "password",
      img: 'https://via.placeholder.com/150',
      location: 'San Francisco, CA'
    },
    {
      username: 'bobsmith',
      email: 'bobsmith@example.com',
      password: "password",
      img: 'https://via.placeholder.com/150',
      location: 'Chicago, IL'
    }
  ],
  reviews: [
    {
      landlord: 'John Doe',
      reviewContents: 'Amazing Tenant, well trained animals, and they cleaned up after them.',
      rating: 10
    },
    {
      landlord: 'Jane Doe',
      reviewContents: 'Terrible their animals destroyed the place.',
      rating: 1
    },
    {
      landlord: 'Bob Smith',
      reviewContents: 'Average landlord, nothing special.',
      rating: 3
    }
  ],
  pets: [
    {
      petName: 'Buddy',
      animalType: 'Dog',
      gender: "male",
      breed: 'Golden Retriever',
      size: 'Large',
      img: 'https://via.placeholder.com/150',
      age: 3,
      isFixed: true
    },
    {
      petName: 'Fluffy',
      animalType: 'Cat',
      gender: "male",
      breed: 'Persian',
      size: 'Medium',
      img: 'https://via.placeholder.com/150',
      age: 2,
      isFixed: true
    },
    {
      petName: 'Charlie',
      animalType: 'Dog',
      gender: "female",
      breed: 'Chihuahua',
      size: 'Small',
      img: 'https://via.placeholder.com/150',
      age: 5,
      isFixed: false
    }
  ]
};

const seedRenters = async () => {
  try {
    const renters = await Renter.insertMany(seedData.renters);
    console.log(`${renters.length} renters seeded successfully!`);
  } catch (error) {
    console.log(error);
  }
}

const seedReviews = async () => {
  try {
    const renters = await Renter.find();
    const reviews = seedData.reviews.map(review => {
      const randomRenter = renters[Math.floor(Math.random() * renters.length)];
      return { ...review, reviews: randomRenter._id };
    });
    await Review.insertMany(reviews);
    console.log(`${reviews.length} reviews seeded successfully!`);
  } catch (error) {
    console.log(error);
  }
}

const seedPets = async () => {
  try {
    const renters = await Renter.find();
    const pets = seedData.pets.map(pet => {
      const randomRenter = renters[Math.floor(Math.random() * renters.length)];
      return { ...pets, pets: randomRenter._id };
    });
    await Pet.insertMany(pets);
    console.log(`${pets.length} reviews seeded successfully!`);
  } catch (error) {
    console.log(error);
  }
}

db.once('open', async () => {
  // clean database
  await Renter.collection.drop();
  await Pet.collection.drop();
  await Review.collection.drop();

  await seedRenters();
  await seedPets();
  await seedReviews();


  console.log('all done!');
  process.exit(0);
});

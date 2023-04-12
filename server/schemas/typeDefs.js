const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Renter {
    _id: ID
    username: String
    email: String
    img: String
    location: String
    pets: [Pet]
    reviews: [Review]
  }

  type Review {
    _id: ID
    landlord: String
    reviewContents: String
    createdAt: String
    rating: Int
  }

  type Pet {
    _id: ID
    petName: String
    animalType: String
    breed: String
    size: String
    img: String
    age: Int
    isFixed: Boolean
  }

  type Query {
    Renters: [Renter]
    Reviews: [Review]
    Pets: [Pet]
  }
`;



module.exports = typeDefs;

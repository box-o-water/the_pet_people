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
  type Auth {
    token: String!
    renter: Renter!
  }

  type Query {
    renters: [Renter]
    renter(username: String!): [Renter]
    reviews(username: String): [Review]
    pets(username: String): [Pet]
  }
  type Mutation {
    addRenter(username: String!, email: String!, password: String!): Auth
    updateRenter(username: String, email: String, password: String): Renter
    addReview(_id: ID, landlord: String!, reviewContents: String!, rating: Int): Review
    login(email: String!, password: String!): Auth
  }
`;



module.exports = typeDefs;

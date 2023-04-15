const { gql } = require("apollo-server-express");
// this is where we define the rules for how apollo server will handle information
const typeDefs = gql`
  type Review {
    _id: ID!
    landlord: String!
    reviewContents: String!
    createdAt: String
    rating: Int!
    userReviewed: String!
  }
  type Pet {
    _id: ID!
    animalType: String!
    petName: String!
    breed: String!
    size: String!
    img: String
    age: String!
    isFixed: Boolean
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    img: String
    location: String
    pets: [Pet]
    reviews: [Review]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(
      username: String
      email: String
      img: String
      location: String
    ): Auth
    deleteUser(username: String!): User
    addPet(
      petName: String!
      animalType: String!
      breed: String!
      size: String!
      age: String!
    ): Auth
    updatePet(
      _id: ID!
      petName: String
      animalType: String
      breed: String
      gender: String
      size: String
      img: String
      age: String
      isFixed: Boolean
    ): Auth
    deletePet(petId: ID!): User
    addReview(
      landlord: String!
      reviewContents: String!
      rating: Int!
      userReviewed: String!
    ): Review
  }
`;

module.exports = typeDefs;

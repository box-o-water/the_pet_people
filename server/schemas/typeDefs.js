const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

// type Query {
//   users: [User]
//   me: User
//   reviews(username: String): [Review]
//   pets(username: String): [Pet]
// }

// updateUser(username: String, email: String, password: String): User
// addReview(
//   _id: ID
//   landlord: String!
//   reviewContents: String!
//   rating: Int
// ): Review

// type Review {
//   _id: ID
//   landlord: String
//   reviewContents: String
//   createdAt: String
//   rating: Int
// }

// type Pet {
//   _id: ID
//   petName: String
//   animalType: String
//   breed: String
//   size: String
//   img: String
//   age: Int
//   isFixed: Boolean
// }

// pets: [Pet]
// reviews: [Review]

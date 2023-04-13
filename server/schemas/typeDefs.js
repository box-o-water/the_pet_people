const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Renter {
    _id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: ID!
    renter: Renter
  }

  type Query {
    me: Renter
  }

  type Mutation {
    addRenter(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

// type Query {
//   renters: [Renter]
//   me: Renter
//   reviews(username: String): [Review]
//   pets(username: String): [Pet]
// }

// updateRenter(username: String, email: String, password: String): Renter
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

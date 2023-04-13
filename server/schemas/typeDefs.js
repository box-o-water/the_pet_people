const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Pet {
    _id: ID
    petName: String
    animalType: String
    breed: String
    gender: String
    size: String
    img: String
    age: Int
    isFixed: Boolean
  }
  type Renter {
    _id: ID!
    username: String!
    email: String!
    img: String
    location: String
    pets: [Pet]
  }

  type Auth {
    token: ID!
    renter: Renter
  }

  type Query {
    me: Renter
    renters: [Renter]
  }

  type Mutation {
    addRenter(username: String!, email: String!, password: String!): Auth
    updateRenter(username: String, email: String, password: String, img: String, location: String): Auth
    addPet(petName: String!, animalType: String!, breed: String, gender: String, size: String, img: String, age: Int, isFixed: Boolean): Auth
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



// pets: [Pet]
// reviews: [Review]

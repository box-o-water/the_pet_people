const { gql } = require("apollo-server-express");
// this is where we define the rules for how apollo server will handle information
const typeDefs = gql`
  type Review {
    _id: ID!
    landlord: String!
    reviewContents: String!
    createdAt: String
    rating: Int!
  }
  type Pet {
    _id: ID!
    animalType: String
    petName: String!
    breed: String!
    gender: String
    size: String
    img: String
    age: Int
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
    updateUser(username: String, password:String, email: String, img: String, location: String): User
    addPet(petName:String!, animalType: String!, breed: String!, gender: String, size: String!, img:String, age: Int!, isFixed: Boolean): User
    updatePet(_id: ID!, petName:String, animalType: String, breed: String, gender: String, size: String, img:String, age: Int, isFixed: Boolean): User
    addReview(landlord: String!, reviewContents: String!, rating: Int! userId: String! ): User
  }
`;

module.exports = typeDefs;
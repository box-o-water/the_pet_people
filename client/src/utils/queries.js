import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      location
      img
      pets {
        _id
        animalType
        petName
        breed
        size
        img
        age
      }
      reviews {
        _id
        landlord
        reviewContents
        createdAt
        rating
        userReviewed
      }
    }
  }
`;

export const QUERY_USER = gql`
  query singleUser($_id: String) {
    user(_id: $_id) {
      _id
      username
      email
      img
      location
      pets {
        _id
        age
        animalType
        breed
        img
        petName
        size
      }
      reviews {
        _id
        createdAt
        landlord
        rating
        reviewContents
        userReviewed
      }
    }
  }
`;

// TODO query Query? or users
export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      img
      location
      pets {
        age
        animalType
        breed
        img
        isFixed
        petName
        size
      }
      reviews {
        createdAt
        landlord
        rating
        reviewContents
      }
    }
  }
`;

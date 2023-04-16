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
        age
        animalType
        breed
        img
        petName
        size
      }
    }
  }
`;

export const QUERY_USER = gql`
  query singleUser($username: String) {
    users(username: $username) {
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

export const QUERY_USERS = gql`
  query Query {
    users {
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

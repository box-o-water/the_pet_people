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

export const QUERY_USERS = gql`
  query Query {
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

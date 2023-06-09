import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation addPet(
    $petName: String!
    $animalType: String!
    $breed: String!
    $size: String!
    $age: String!
  ) {
    addPet(
      petName: $petName
      animalType: $animalType
      breed: $breed
      size: $size
      age: $age
    ) {
      token
      user {
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $username: String
    $email: String
    $img: String
    $location: String
  ) {
    updateUser(
      username: $username
      email: $email
      img: $img
      location: $location
    ) {
      token
      user {
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation Mutation($username: String!) {
    deleteUser(username: $username) {
      location
    }
  }
`;

export const UPDATE_PET = gql`
  mutation UpdatePet(
    $id: String!
    $petName: String
    $animalType: String
    $breed: String
    $size: String
    $age: String
  ) {
    updatePet(
      _id: $id
      petName: $petName
      animalType: $animalType
      breed: $breed
      size: $size
      age: $age
    ) {
      _id
    }
  }
`;
export const DELETE_PET = gql`
  mutation DeletePet($petId: ID!) {
    deletePet(petId: $petId) {
      location
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview(
    $landlord: String!
    $reviewContents: String!
    $rating: Int!
    $userReviewed: String!
  ) {
    addReview(
      landlord: $landlord
      reviewContents: $reviewContents
      rating: $rating
      userReviewed: $userReviewed
    ) {
      _id
    }
  }
`;

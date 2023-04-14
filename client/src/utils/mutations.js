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
        email
        password
        username
      }
    }
  }
`;

export const ADD_PET = gql `
mutation AddPet($petName: String!, $animalType: String!, $breed: String!, $size: String!, $age: Int!, $gender: String, $img: String, $isFixed: Boolean) {
  addPet(petName: $petName, animalType: $animalType, breed: $breed, size: $size, age: $age, gender: $gender, img: $img, isFixed: $isFixed) {
    pets {
      _id
      animalType
      petName
      breed
      gender
      size
      img
      age
      isFixed
    }
  }
}
`;

export const UPDATE_USER = gql `
mutation UpdateUser($username: String, $email: String, $img: String, $location: String, $password: String) {
  updateUser(username: $username, email: $email, img: $img, location: $location, password: $password) {
    _id
    username
    email
    img
    location
  }
}
`;

export const UPDATE_PET = gql `
mutation UpdatePet($isFixed: Boolean, $id: ID!, $petName: String, $animalType: String, $breed: String, $gender: String, $size: String, $img: String, $age: Int) {
  updatePet(isFixed: $isFixed, _id: $id, petName: $petName, animalType: $animalType, breed: $breed, gender: $gender, size: $size, img: $img, age: $age) {
    pets {
      _id
      animalType
      petName
      breed
      gender
      size
      img
      age
      isFixed
    }
  }
}
`;

export const ADD_REVIEW = gql `
mutation AddReview($landlord: String!, $reviewContents: String!, $rating: Int!, $userReviewed: String!) {
  addReview(landlord: $landlord, reviewContents: $reviewContents, rating: $rating, userReviewed: $userReviewed) {
    _id
    landlord
    reviewContents
    createdAt
    rating
    userReviewed
  }
}
`
;

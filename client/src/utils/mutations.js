import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      renter {
        _id
      }
    }
  }
  
`;

export const ADD_RENTER = gql`
mutation AddRenter($username: String!, $email: String!, $password: String!) {
  addRenter(username: $username, email: $email, password: $password) {
    _id
    username
    email
  }
}

`;
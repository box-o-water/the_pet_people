import { gql } from '@apollo/client';


export const QUERY_RENTERS = gql`
query Query {
    renters {
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


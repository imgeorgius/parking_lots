import { gql } from "@apollo/client";

export const GET_PARKING_LOTS = gql`
  query GetAllParkingLots($limit: Int, $offset: Int) {
    getAllParkingLots(limit: $limit, offset: $offset) {
      id
      address
      image
      name
      name
      size
      status
    }
  }
`;

import { gql } from "@apollo/client";

export const POST = gql`
  mutation post($file: Upload) {
    post(file: $file) {
      status
      urlFile
    }
  }
`;

export const GETPUBLICATION = gql`
  query getPublication($username: String!) {
    getPublication(username: $username) {
      id
      idUser
      typefile
      file
      createAt
    }
  }
`;

export const GET_POST_OF_FOLLOWEDS = gql`
  query get_postOfFolloweds {
    getPostsFolloweds {
      id
      idUser {
        id
        username
        avatar
        name
      }
      file
      typefile
      createAt
    }
  }
`;

import { gql } from "@apollo/client";

export const LIKE = gql`
  mutation like($idPost: ID) {
    like(idPost: $idPost)
  }
`;

export const ISLIKE = gql`
  query isLiked($idPost: ID) {
    isLiked(idPost: $idPost)
  }
`;
export const DELETELIKE = gql`
  mutation deleteLike($idPost: ID) {
    deleteLike(idPost: $idPost)
  }
`;

export const COUNTLIKES = gql`
  query countLikes($idPost:ID) {
    countLikes(idPost: $idPost)
  }
`;

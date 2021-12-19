import { gql } from "@apollo/client";

export const ADDCOMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      comment
      createAt
    }
  }
`;

export const GETCOMMENTS = gql`
  query getComments($idPost: ID!) {
    getComments(idPost:$idPost){
    idPost
    idUser{
    name
    username
    avatar
  }
    comment
    # createAt
  }
}
`;

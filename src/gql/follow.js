import { gql } from "@apollo/client";

export const FOLLOW = gql`
  mutation follow($username: String!) {
    follow(username: $username)
  }
`;

export const UNFOLLOW = gql`
  mutation unFollow($username: String!) {
    unFollow(username: $username)
  }
`;

export const ISFOLLOW = gql`
  query isFollow($username: String!) {
    isFollow(username: $username)
  }
`;

export const GETFOLLOWERS = gql`
  query getFollowers($username: String!) {
    getFollowers(username: $username) {
      name
      username
      avatar
    }
  }
`;

export const GETFOLLOWINGS = gql`
  query getFollowings($username: String!) {
    getFollowing(username: $username) {
      name
      avatar
      username
    }
  }
`;

export const GET_NOT_FOLLOWEDS = gql`
  query getNotFolloweds {
    getNotFolloweds {
      id
      username
      avatar
      name
    }
  }
`;

import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser(
  $username: String!
  $email: String!
  $password: String!
  $isArtist: Boolean!
) {
  addUser(
    username: $username
    email: $email
    password: $password
    isArtist: $isArtist
  ) {
    token
    user {
      username
      email
      password
      isArtist
    }
  }
}

`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      username
      email
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($artId: ID!, $comment: CommentData) {
  addComment(artId: $artId, comment: $comment) {
    _id
    comments{
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

export const ADD_ART = gql`
mutation addArt($art: ArtData!) {
  addArt(art: $art) {
    _id
    title
    artist {
      firstName
      lastName
    }
    url
    description
    location
    createdAt
    addedBy 
  }
}
`;

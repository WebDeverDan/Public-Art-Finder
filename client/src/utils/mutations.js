import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $isArtist: Boolean!
  ) {
    addUser(username: $username, email: $email, password: $password, isArtist: $isArtist
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
        password
      }
    }
  }
`;
// up until here good
export const ADD_COMMENT = gql`
  mutation addComment($artId: ID!, $commentText: String!) {
    addComment(artId: $artId, commentText: $commentText) {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($artId: ID!, $commentId: ID!) {
    removeComment(artId: $artId, commentId: $commentId) {
      art {
        id
      }
      comment {
        id
      }
    }
  }
`;

export const ADD_ART = gql`
  mutation addArt($art: ArtData) {
    addArt(art: $art) {
      art {
        id
      }
    }
  }
`;

export const REMOVE_ART = gql`
  mutation removeArt($artId: ID!, $commentId: ID!) {
    removeArt(artId: $artId, commentId: $commentId) {
      art {
        id
      }
      comment {
        id
      }
    }
  }
`;

// --- OLD MUTATIONS ---

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;
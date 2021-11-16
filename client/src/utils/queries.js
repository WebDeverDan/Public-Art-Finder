import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      comments {
        _id
        commentText
        createdAt
      }
      addedArt {
        title
        artist {
          firstName
          lastName
        }
        description
        location
        url
        comments {
          commentText
          commentAuthor
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      email
      password
      isArtist
      addedArt {
        title
      }
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
`;

export const QUERY_COMMENTS = gql`
  query getComments {
    comments {
      username
      _id
      comments {
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_COMMENT = gql`
  query getSingleComment($commentId: String!) {
    comment(commentId: $artId) {
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
      addedArt {
        _id
        title
        artist {
          firstName
          lastName
        }
        description
        location
        url
        comments {
          commentText
          commentAuthor
        }
      }
    }
  }
`;

export const QUERY_ART = gql`
  query art($artId: ID!) {
    art(artId: $artId) {
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
      comments {
        commentText
        commentAuthor
      }
      addedBy
    }
  }
`;

export const QUERY_ART_BY_LOCATION = gql`
  query artsByLocation($location: String!) {
    artsByLocation(location: $location) {
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
      comments {
        commentText
        commentAuthor
      }
      addedBy
    }
  }
`;

export const QUERY_ARTS = gql`
  query arts {
    arts {
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
      comments {
        commentText
        commentAuthor
      }
      addedBy
    }
  }
`;

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    isArtist: Boolean!
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  input CommentData {
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Artist {
    firstName: String
    lastName: String
  }

  type Auth {
    token: ID!
    user: User
  }
  type Art {
    _id: ID
    title: String
    artist: [Artist]
    image: String
    description: String
    location: String
    createdAt: String
    comments: [Comment]
    addedBy: String
  }

  input ArtData {
    title: String
    artist: ArtistData
    image: String
    description: String
    location: String
    createdAt: String
    comment: CommentData
    addedBy: String
  }

  input ArtistData {
    firstName: String
    lastName: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    comments(username: String): [Comment]
    comment(commentId: ID!): Comment
    me: User
    art(title: String): Art
    arts: [Art]
  }
  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      isArtist: Boolean!
    ): Auth
    login(email: String!, password: String!): Auth
    addComment(artId: ID!, commentText: String!, commentAuthor: String): Comment
    removeComment(artId: ID!, commentId: ID!): Comment
    addArt(art: ArtData): Art
    removeArt(artId: ID!, commentId: ID!): Art
  }
`;

module.exports = typeDefs;

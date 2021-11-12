const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    isArtist: Boolean!
    addedArt: [Art]
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
    user: User
  }

  input CommentData {
    commentText: String
    commentAuthor: String
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
    artist: Artist
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
    user(_id: ID!): User
    comments: [Comment]
    comment(commentId: ID!): Comment
    me: User
    addedArt(userId: ID, artId: ID): [Art]
    art(location: String): Art
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
    addComment(artId: ID, comment: CommentData): Comment
    removeComment(artId: ID!, commentId: ID!): Comment
    addArt(art: ArtData): Art
    removeArt(artId: ID!, commentId: ID!): Art
  }
`;

module.exports = typeDefs;

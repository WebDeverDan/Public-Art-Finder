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
    url: String
    description: String
    location: String
    createdAt: String
    comments: [Comment]
    addedBy: String
  }

  input ArtData {
    title: String
    artist: ArtistData
    url: String
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
    user(userId: ID!): User
    comments: [User]
    comment(artId: String): Art
    getSingleComment(commentId: ID): Comment
    me: User
    addedArt(userId: ID, artId: ID): [Art]
    art(artId: ID): Art
    artsByLocation(location: String): [Art]
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
    addComment(artId: ID, comment: CommentData): Art
    removeComment(artId: ID!, commentId: ID!): Comment
    addArt(art: ArtData): Art
    removeArt(artId: ID!, commentId: ID!): Art
  }
`;

module.exports = typeDefs;

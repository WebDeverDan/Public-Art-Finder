const { gql } = require("apollo-server-express");

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
    fistName: String!
    lastName: String!
  }

  type Auth {
    token: ID!
    user: User
  }
  type Art {
    _id: ID
    artist: [Artist]!
    image: String!
    description: String
    location: String
    createdAt: String
    comment: [Comment]!
    addedBy: User
  }
  input ArtData {
    artist: String!
    image: String!
    description: String
    location: String
    createdAt: String
    comment: String!
    addedBy: String!
  }
  type Query {
    users: [User]
    user(username: String!): User
    comments(username: String): [Comment]
    comment(commentId: ID!): Comment
    me: User
    art(artId: ID!): Art
    arts(artId: ID!): Art
  }
  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      isArtist: Boolean!
    ): Auth
    login(email: String!, password: String!): Auth
    addComment(artId: ID!, comment: CommentData): Comment
    removeComment(artId: ID!, commentId: ID!): Comment
    addArt(art: ArtData): Art
    removeArt(artId: ID!, commentId: ID!): Art
  }
`;

module.exports = typeDefs;

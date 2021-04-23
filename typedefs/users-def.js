const { gql } = require("apollo-server");
/** typedefs for User **/

const typeDefs = gql`
  type User {
    _id: String!
    userId: Int!
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
    dateOfBirth: String!
    securityQuestion1: String!
    securityAnswer1: String!
    securityQuestion2: String!
    securityAnswer2: String!
    profilePicture: String!
    profilePublic: Boolean!
    coins: Int!
  }
  extend type Query {
    getUserById(_id: String!): User
  }
  extend type Mutation {
    addUser(user: UserInput!): String
    deleteUser(_id: String!): Boolean
    updateUserField(_id: String!, field: String!, value: String!): Boolean
    updateUserVisibility(_id: String!, value: Boolean!): Boolean
  }
  input UserInput {
    _id: String
    userId: Int
    firstName: String
    lastName: String
    email: String
    username: String
    password: String
    dateOfBirth: String
    securityQuestion1: String
    securityAnswer1: String
    securityQuestion2: String
    securityAnswer2: String
    profilePicture: String
    profilePublic: Boolean
    coins: Int
  }
`;

module.exports = { typeDefs: typeDefs };
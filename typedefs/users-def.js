const { gql } = require("apollo-server");
/** typedefs for User **/

const typeDefs = gql`
  type User {
    _id: String
    firstName: String
    lastName: String
    email: String
    username: String
    password: String
    dateOfBirth: String
    securityQuestionOne: String
    securityAnswerOne: String
    securityQuestionTwo: String
    securityAnswerTwo: String
    profilePicture: String
    bannerPicture: String
    bgColor: String
    profilePublic: Boolean
    coins: Int
    facebookLink: String
    twitterLink: String
    youtubeLink: String
    instagramLink: String
    customLink: String
  }

  extend type Query {
    getUserById(_id: String!): User
    getCurrentUser: User
    getAllUsers(skip: Int!, limit: Int!): [User]
  }
  extend type Mutation {
    login(email: String!, password: String!): User
    register(
      firstName:String!,
      lastName:String!,
      email:String!,
      username:String!,
      password:String!,
      securityQuestionOne:String!,
      securityAnswerOne:String!,
      securityQuestionTwo:String!,
      securityAnswerTwo:String!): User
    logout: Boolean

    deleteUser(_id: String!): Boolean
    updateUserField(_id: String!, field: String!, value: String!): Boolean
    updateUserVisibility(_id: String!, value: Boolean!): Boolean
  }

  input UserInput {
    _id: String
    firstName: String
    lastName: String
    email: String
    username: String
    password: String
    dateOfBirth: String
    securityQuestionOne: String
    securityAnswerOne: String
    securityQuestionTwo: String
    securityAnswerTwo: String
    profilePicture: String
    profilePublic: Boolean
    coins: Int
  }
`;

module.exports = { typeDefs: typeDefs };
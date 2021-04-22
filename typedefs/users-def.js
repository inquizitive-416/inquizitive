const { gql } = require("apollo-server");
/** typedefs for User **/

const typeDefs = gql`
  type User {
    _id: String!
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
    dateOfBirth: String
    securityQuestionOne: String!
    securityAnswerOne: String!
    securityQuestionTwo: String!
    securityAnswerTwo: String!
    profilePicture: String
    profileVisible: Boolean
    coins: Int
  }

  extend type Query {
    getUserById(_id: String!): User
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
    deleteUser(_id: String!): Boolean
    updateUserField(_id: String!, field: String!, value: String!): Boolean
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
    profileVisible: Boolean
    coins: Int
  }
`;

module.exports = { typeDefs: typeDefs };

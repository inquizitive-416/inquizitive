const { gql } = require('apollo-server');
const typeDefs = gql `
    type mtpInstance {
        _id: String!
        questionId: Int!
        quizId: Int!
        userChoice: String!
    }
    input mtpInstanceInput {
        _id: String!
        id: Int!
        quizId: Int!
        userChoice: String!
    }
    extend type Query{
        getMTPInstanceById(_id: String!): mtpInstance
    }
    extend type Mutation{
        addMTPInstance(id: Int!, quizId: Int!, questionId: Int!, userMatch: String!): String
        updateMTPInstance(_id: String!, id: Int!, quizId: Int!, questionId: Int!, userMatch: String!): Boolean
        deleteMTPInstance(_id: String!): Boolean
    }
`;
module.exports = { typeDefs: typeDefs }
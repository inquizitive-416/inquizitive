
const { gql } = require('apollo-server');
const typeDefs = gql `
    type fibInstance {
        _id: String!
        id: Int!
        quizId: Int!
        answer: String!
    }
    input fibInstanceInput {
        _id: String!
        id: Int!
        quizId: Int!
        answer: String!
    }
    extend type Query{
        getFIBInstanceById(_id: String!): mcqInstance
    }
    extend type Mutation{
        addFIBInstance(id: Int!, quizId: Int!, userChoice: String!): String
        updateFIBInstance(_id: String!, id: Int!, quizId: Int!, userChoice: String!): Boolean
        deleteFIBInstance(_id: String!): Boolean
    }
`;
module.exports = { typeDefs: typeDefs }
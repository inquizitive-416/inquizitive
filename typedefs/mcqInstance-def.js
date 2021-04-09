const { gql } = require('apollo-server');
const typeDefs = gql `
    type mcqInstance {
        _id: String!
        id: Int!
        quizId: Int!
        userChoice: String!
    }
    input mcqInstanceInput {
        _id: String!
        id: Int!
        quizId: Int!
        userChoice: String!
    }
    extend type Query{
        getMCQInstanceById(_id: String!): mcqInstance
    }
    extend type Mutation{
        addMCQInstance(id: Int!, quizId: Int!, userChoice: String!): String
        updateMCQInstance(_id: String!, id: Int!, quizId: Int!, userChoice: String!): Boolean
        deleteMCQInstance(_id: String!): Boolean
    }
`;
module.exports = { typeDefs: typeDefs }
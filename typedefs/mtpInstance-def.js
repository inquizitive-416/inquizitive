const { gql } = require('apollo-server');
const typeDefs = gql `
    type mtpInstance {
        _id: String!
        questionId: Int!
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
        addMCQInstance(id: Int!, quizId: Int!, questionId: Int!, userMatch: [pairId: Int!, selectedOrder: Int!]): String
        updateMCQInstance(_id: String!, id: Int!, quizId: Int!, questionId: Int!, userMatch: [pairId: Int!, selectedOrder: Int!]): Boolean
        deleteMCQInstance(_id: String!): Boolean
    }
`;
module.exports = { typeDefs: typeDefs }
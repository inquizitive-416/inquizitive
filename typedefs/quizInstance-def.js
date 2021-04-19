const { gql } = require('apollo-server');
const typeDefs = gql `
    type quizInstance {
        _id: String!
        quizId: Int!
        userId: Int!
        finished: Boolean!
        score: Int!
        timeRemaining: Int!
        lastAccessed: String!
        questions: String!
    }
    input quizInstanceInput {
        _id: String
        quizId: Int
        userId: Int
        finished: Boolean
        score: Int
        timeRemaining: Int
        lastAccessed: String
        questions: String
    }
    extend type Query{
        getquizInstanceById(_id: String!): quizInstance
    }
    extend type Mutation{
        addQuizInstance(id: Int!, uid: Int!, fin: Boolean!, score: Int!, time: Int!, lastAccessed: String!, 
            questions: String!): String
        updateQuizInstance(_id: String!, id: Int!, uid: Int!, fin: Boolean!, score: Int!, time: Int!, lastAccessed: String!, 
            questions: String!): Boolean
        deleteQuizInstance(_id: String!): Boolean
    }
`;
module.exports = { typeDefs: typeDefs }
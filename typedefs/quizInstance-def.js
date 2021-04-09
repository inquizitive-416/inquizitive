const { gql } = require('apollo-server');
const typeDefs = gql `
    type quizInstance {
        _id: String!
        quizId: Int!
        userId: Int!
        finished: Boolean!
        score: Int!
        timeRemaining: Int!
        lastAccessed: Date!
        questions: [
            questionId: Int!
            questionType: Int!
        ]
    }
    input quizInstanceInput {
        _id: String
        quizId: Int
        userId: Int
        finished: Boolean
        score: Int
        timeRemaining: Int
        lastAccessed: Date
        questions: [
            questionId: Int
            questionType: Int
        ]
    }
    extend type Query{
        getquizInstanceById(_id: String!): quizInstance
    }
    extend type Mutation{
        addQuizInstance(id: Int!, uid: Int!, fin: Boolean!, score: Int!, time: Int!, lastAccessed: Date!, 
            questions: [questionId: Int!, questionType: Int!]): String
        updateQuizInstance(_id: String!, id: Int!, uid: Int!, fin: Boolean!, score: Int!, time: Int!, lastAccessed: Date!, 
            questions: [questionId: Int!, questionType: Int!]): Boolean
        deleteQuizInstance(_id: String!): Boolean
    }
`;
module.exports = { typeDefs: typeDefs }
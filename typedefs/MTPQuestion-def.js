const { gql } = require("apollo-server");
// const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql `
    
    type MTPQuestion {
        _id: String!
        QuestionId: Int!
        promptString: String!
        leftSideMatch: String!
        rightSideMatch: String!
    }
    
    extend type Query {
        getMTPQuestionById(_id: String!): MTPQuestion
    }
    
    extend type Mutation {
        addMTPQuestion(_id: String!, questionId: Int!,promptString: String!, leftSideMatch: String!, rightSideMatch: String!): Int
        deleteAllMTPQuestion: Boolean
        deleteMTPQuestion(_id : String!): Boolean
        updateMTPQuestion(_id: String!, questionId: Int! ,promptString: String!, leftSideMatch: String!, rightSideMatch: String!): Boolean
    }

    input MTPQuestionInput {
        _id: String
        QuestionId: Int
        promptString: String
        leftSideMatch: String
        rightSideMatch: String
    }
`;

module.exports = { typeDefs: typeDefs }
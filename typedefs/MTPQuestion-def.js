const { gql } = require("apollo-server");
// const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql `
    
    type MTPQuestion {
        _id: String!
        QuestionId: Int!
        promptString: String!
        leftSideMatch: 
        rightSideMatch:
    }
    
    extend type Query {
        getMTPQuestionById: MTPQuestion
    }
    
    extend type Mutation {
        addMTPQuestion(_id: String!, questionId: Int!,promptString: String !, leftSideMatch, rightSideMatch): Int
        deleteAllMTPQuestion(): Boolean
        deleteMTPQuestion(_id : String!): Boolean
        updateMTPQuestion(_id: String!, questionId: Int ! ,promptString: String !, leftSideMatch,rightSideMatch): Boolean
    }

    input MTPQuestion {
        _id: String
        QuestionId: Int
        promptString: String
        leftSideMatch:
        rightSideMatch
       
    }
`;

module.exports = { typeDefs: typeDefs }
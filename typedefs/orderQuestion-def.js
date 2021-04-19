const { gql } = require("apollo-server");
// const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql `
    
    type orderQuestion {
        _id: String!
        QuestionId: Int!
        promptString: String!
        cards: String!
    }
    
    extend type Query {
        getOrderQuestionById: orderQuestion
    }
    
    extend type Mutation {
        addOrderQuestion(_id: String!, questionId: Int!, promptString: String!, cards: String!): Int
        deleteAllOrderQuestion: Boolean
        deleteOrderQuestion(_id : String!): Boolean
        updateOrderQuestion(_id: String!, questionId: Int!, promptString: String!, cards: String!): Boolean
    }

    input orderQuestionInput {
        _id: String
        QuestionId: Int
        promptString: String
        cards: String
    }
`;

module.exports = { typeDefs: typeDefs }
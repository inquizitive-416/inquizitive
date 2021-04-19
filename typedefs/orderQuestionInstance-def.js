const { gql } = require("apollo-server");
// const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql `
    
    type orderQuestionInstance {
        _id: String!
        QuestionId: Int!
        cards: String!
    }
    
    extend type Query {
        getOrderQuestionInstanceById: orderQuestionInstance
    }
    
    extend type Mutation {
        addOrderQuestionInstance(_id: String!, questionId: Int, cards: String!): Int
        deleteAllOrderQuestionInstance: Boolean
        deleteOrderQuestionInstance(_id : String!): Boolean
        updateOrderQuestionInstance(_id: String!, questionId: Int!, cards: String!): Boolean
    }

    input orderQuestionInstanceInput {
        _id: String
        QuestionId: Int!
        cards: String
       
    }
`;

module.exports = { typeDefs: typeDefs }
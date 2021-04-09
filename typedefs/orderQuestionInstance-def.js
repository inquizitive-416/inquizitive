const { gql } = require("apollo-server");
// const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql `
    
    type orderQuestionInstance {
        _id: String!
        QuestionId: Int!
        cards: 
    }
    
    extend type Query {
        getOrderQuestionInstanceById: orderQuestionInstance
    }
    
    extend type Mutation {
        addOrderQuestionInstance(_id: String!, questionId: Int, cards): Int
        deleteAllOrderQuestionInstance(): Boolean
        deleteOrderQuestionInstance(_id : String!): Boolean
        updateOrderQuestionInstance(_id: String!, questionId: Int!, cards): Boolean
    }

    input orderQuestionInstance {
        _id: String
        QuestionId: Int!
        cards: 
       
    }
`;

module.exports = { typeDefs: typeDefs }
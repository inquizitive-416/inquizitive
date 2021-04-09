const { gql } = require("apollo-server");
// const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql `
    
    type orderQuestion {
        _id: String!
        QuestionId: Int!
        promptString: String!
        cards: 
    }
    
    extend type Query {
        getOrderQuestionById: orderQuestion
    }
    
    extend type Mutation {
        addOrderQuestionInstance(_id: String!, questionId: Int!,promptString: String !, cards): Int
        deleteAllOrderQuestionInstance(): Boolean
        deleteOrderQuestionInstance(_id : String!): Boolean
        updateOrderQuestionInstance(_id: String!, questionId: Int ! ,promptString: String !, cards): Boolean
    }

    input orderQuestion {
        _id: String
        QuestionId: Int
        promptString: String
        cards: 
       
    }
`;

module.exports = { typeDefs: typeDefs }
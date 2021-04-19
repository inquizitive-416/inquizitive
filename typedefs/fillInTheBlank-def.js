const { gql } = require("apollo-server");
/** typedefs for FillInTheBlank **/

const typeDefs = gql`
  type FillInTheBlank {
    _id: String!
    questionId: Int!
    questionString: String!
    correctAnswer: String!
  }

  extend type Query {
    getFillInTheBlankById(_id: String!): FillInTheBlank
  }
  extend type Mutation {
    addFillInTheBlank(fillInTheBlank: FillInTheBlankInput!): String
    deleteFillInTheBlank(_id: String!): Boolean
    updateFillInTheBlankField(
      _id: String!
      field: String!
      value: String!
    ): Boolean
  }

  input FillInTheBlankInput {
    _id: String
    questionId: Int
    questionString: String
    correctAnswer: String
  }
`;

module.exports = { typeDefs: typeDefs };

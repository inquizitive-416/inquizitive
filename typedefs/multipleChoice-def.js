const { gql } = require("apollo-server");
/** typedefs for MultipleChoice **/

const typeDefs = gql`
	type MultipleChoice {
		_id: String!
		questionId: Int!
		questionString: String!
		choice: String!
	}

	extend type Query {
		getMultipleChoiceById(_id: String!): MultipleChoice
	}
	extend type Mutation {
		addMultipleChoice(multipleChoice: MultipleChoiceInput!): String
		deleteMultipleChoice(_id: String!): Boolean
		updateMultipleChoiceField(_id: String!, field: String!, value: String!): Boolean
	}

	input MultipleChoiceInput {
		_id: String
		questionId: Int
		questionString: String
		choice: String
	}
`;

module.exports = { typeDefs: typeDefs };

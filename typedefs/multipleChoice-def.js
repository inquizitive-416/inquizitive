const { gql } = require("apollo-server");
/** typedefs for MultipleChoice **/

const typeDefs = gql`
	type MultipleChoice {
		_id: String!
		questionId: Int!
		questionString: String!
		choice: !
	}

	extend type Query {
		getMultipleChoiceById(_id: String!): MultipleChoice
	}
	extend type Mutation {
		addMultipleChoice(multipleChoice: MultipleChoice!): String
		deleteMultipleChoice(_id: String!): Boolean
		updateMultipleChoiceField(_id: String!, field: String!, value: String!): Boolean
	}

	input FieldInput {
		_id: String
		field: String
		value: String
	}
	input MultipleChoiceInput {
		_id: String
		questionId: Int
		questionString: String
		choice:
	}
`;

module.exports = { typeDefs: typeDefs };

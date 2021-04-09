const { gql } = require("apollo-server");
/** typedefs for Quiz **/

const typeDefs = gql`
	type Quiz {
		_id: String!
		quizId: Int!
		idOfCreator: Int!
		title: String!
		description: String!
		coverImage: !
		categories: !
		hashtags: !
		timer: Int!
		questions: !
		quizPosted: Boolean!
		ratings: [Int]!
		averageRating: Float!
		numOfTimesPlayed: Int!
	}

	extend type Query {
		getQuizById(_id: String!): Quiz
	}
	extend type Mutation {
		addQuiz(quiz: Quiz!): String
		deleteQuiz(_id: String!): Boolean
		updateQuizField(_id: String!, field: String!, value: String!): Boolean
	}

	input FieldInput {
		_id: String
		field: String
		value: String
	}
	input QuizInput {
		_id: String
		quizId: Int
		idOfCreator: Int
		title: String
		description: String
		coverImage:
		categories:
		hashtags:
		timer: Int
		questions:
		quizPosted: Boolean
		ratings:
		averageRating: Double
		numOfTimesPlayed: Int
	}
`;

module.exports = { typeDefs: typeDefs };

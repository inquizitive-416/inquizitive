const { gql } = require("apollo-server");
/** typedefs for Quiz **/

const typeDefs = gql`
	type Quiz {
		_id: String!
		quizId: Int!
		idOfCreator: Int!
		title: String!
		description: String!
		coverImage: String!
		categories: String!
		hashtags: String!
		timer: Int!
		questions: String!
		quizPosted: Boolean!
		ratings: [Int]!
		averageRating: Float!
		numOfTimesPlayed: Int!
	}

	extend type Query {
		getQuizById(_id: String!): Quiz
	}
	extend type Mutation {
		addQuiz(quiz: QuizInput!): String
		deleteQuiz(_id: String!): Boolean
		updateQuizField(_id: String!, field: String!, value: String!): Boolean
	}

	input QuizInput {
		_id: String
		quizId: Int
		idOfCreator: Int
		title: String
		description: String
		coverImage: String
		categories: String
		hashtags: String
		timer: Int
		questions: String
		quizPosted: Boolean
		ratings: String
		averageRating: Float
		numOfTimesPlayed: Int
	}
`;

module.exports = { typeDefs: typeDefs };

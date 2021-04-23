const { gql } = require("apollo-server");
/** typedefs for Quiz **/

const typeDefs = gql`
	type Quiz {
		_id: String
		idOfCreator: String
        title:String
		description:String
		coverimage:String
		categories:String
		hashtagone:String
		hashtagtwo:String
		hashtagthree:String
		difficulty: String
		quizposted: Boolean
		timer: Int
		questions: [String]
		ratings: Int
		avgRating: Int
		numOfTimesPlayed: Int
		isReported: Boolean
	}

	extend type Query {
		getQuizById(_id: String!): Quiz
	}
	extend type Mutation {
		addQuiz(
			idOfCreator: String
			title:String
			description:String
			coverimage:String
			categories:String
			hashtagone:String
			hashtagtwo:String
			hashtagthree:String
			difficulty: String
			quizposted: Boolean
			timer: Int
			questions: [String]
			ratings: Int
			avgRating: Int
			numOfTimesPlayed: Int
			isReported: Boolean): Quiz

		deleteQuiz(_id: String!): Boolean
		updateQuizField(_id: String!, field: String!, value: String!): Boolean
	}

	input QuizInput {
		_id: String
		idOfCreator: String
        title:String
		description:String
		coverimage:String
		categories:String
		hashtagone:String
		hashtagtwo:String
		hashtagthree:String
		difficulty:String
		quizposted: Boolean
		timer: Int
		questions: [String]
		ratings: Int
		avgRating: Int
		numOfTimesPlayed: Int
		isReported: Boolean
	}
`;

module.exports = { typeDefs: typeDefs };

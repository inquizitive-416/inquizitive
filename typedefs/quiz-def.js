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
		questions: [Question]
		ratings: Int
		avgRating: Int
		numOfTimesPlayed: Int
		isReported: Boolean
	}

	type Question {
		_id: String
		id: Int
		questype: String
        questionPrompt: String
        choice1: String
        choice2: String
        choice3: String
        choice4: String
        correctAnswer: String
    }

	extend type Query {
		getQuizById(_id: String!): Quiz
		getQuizzesByRating: [Quiz]
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
			questions: [QuestionInput]
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
		questions: [QuestionInput]
		ratings: Int
		avgRating: Int
		numOfTimesPlayed: Int
		isReported: Boolean
	}
	input QuestionInput {
		id: Int
		questype: String
		questionPrompt: String
        choice1: String
        choice2: String
        choice3: String
        choice4: String
        correctAnswer: String
    }
`;

module.exports = { typeDefs: typeDefs };

import { gql } from "@apollo/client";

export const GET_QUIZ_OWNER = gql`
	query GetQuizOwner($_id: String!) {
		getUserById(_id: $_id) {
			_id
			profilePicture
		}
	}
`;

export const GET_CURRENT_QUIZ = gql`
	query GetCurrentQuiz($_id: String!) {
		getQuizById(_id: $_id) {
			_id
			description
			idOfCreator
			timer
			title
			questions
		}
	}
`;
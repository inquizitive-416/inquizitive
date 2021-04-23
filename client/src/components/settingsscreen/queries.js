import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
	query GetCurrentUser($_id: String!) {
		getUserById(_id: $_id) {
			_id
			firstName
			lastName
			email
            username
			password
			securityQuestionOne
			securityAnswerOne
			securityQuestionTwo
			securityAnswerTwo
			dateOfBirth
			profilePicture
			coins
			profilePublic
		}
	}
`;
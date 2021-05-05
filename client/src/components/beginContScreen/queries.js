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
			idOfCreator
            title
            description
            coverimage
            categories
            hashtagone
            hashtagtwo
            hashtagthree
            difficulty
            quizposted
            timer
            questions
            {
                _id
                questype
				questionPrompt
                choice1
                choice2
                choice3
                choice4
                correctAnswer
            }
            ratings
            avgRating
            numOfTimesPlayed
            isReported
		}
	}
`;
// export const GET_CURRENT_QUIZ = gql`
// 	query GetCurrentQuiz($_id: String!) {
// 		getQuizById(_id: $_id) {
// 			_id
// 			description
// 			idOfCreator
// 			timer
// 			title
// 			questions {
// 				id
// 			}
// 		}
// 	}
// `;
import { gql } from "@apollo/client";

export const GET_QUIZ = gql`
	query GetQuiz($_id: String!) {
		getQuizById(_id: $_id) {
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
                id
                questype
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
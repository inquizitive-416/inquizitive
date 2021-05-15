import { gql } from "@apollo/client";

export const GET_QUIZ = gql`
	query GetQuiz($_id: String!) {
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
                image1
                image2
                image3
                image4
                correctAnswer
            }
            ratings
            avgRating
            numOfTimesPlayed
            isReported
        }
	}
`;
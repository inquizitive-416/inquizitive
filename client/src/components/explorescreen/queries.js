import { gql } from "@apollo/client";

export const GET_POPULAR_QUIZZES = gql`
  query GetPopularQuizzes {
    getQuizzesByRating {
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
      ratings
      avgRating
      numOfTimesPlayed
      isReported
    }
  }
`;

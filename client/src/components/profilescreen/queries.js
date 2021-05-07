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
      bannerPicture
      bgColor
    }
  }
`;

export const GET_PAGINIZED_QUIZZES_BY_AGE = gql`
  query GetPaginizedQuizzesByAge($idOfCreator: String!, $skip: Int!, $limit: Int!) {
    getPaginizedQuizzesByAge(idOfCreator: $idOfCreator, skip: $skip, limit: $limit) {
      _id
      title
      description
      coverimage
    }
  }
`;

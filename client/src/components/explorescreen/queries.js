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
      questions {
        id
      }
      ratings
      avgRating
      numOfTimesPlayed
      isReported
    }
  }
`;

export const GET_SEARCHED_QUIZZES = gql`
query GetSearchedQuizzes($categories: String!, $skip: Int!, $limit: Int!) {
  getSearchedQuizzes(categories: $categories, skip: $skip, limit: $limit) {
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
    questions {
      id
    }
    ratings
    avgRating
    numOfTimesPlayed
    isReported
  }
}
`;

export const GET_ALL_USERS = gql`
query GetAllUsers($skip: Int!, $limit: Int!){
  getAllUsers(skip: $skip, limit: $limit) {
    _id
    firstName
    lastName
    email
    username
    password
    dateOfBirth
    securityQuestionOne
    securityAnswerOne
    securityQuestionTwo
    securityAnswerTwo
    profilePicture
    bannerPicture
    bgColor
    profilePublic
    coins
  }
}
`;

export const GET_USER_BY_ID = gql`
query GetUserById($_id: String!){
  getUserById(_id: $_id) {
    _id
    firstName
    lastName
    email
    username
    password
    dateOfBirth
    securityQuestionOne
    securityAnswerOne
    securityQuestionTwo
    securityAnswerTwo
    profilePicture
    bannerPicture
    bgColor
    profilePublic
    coins
  }
}
`;
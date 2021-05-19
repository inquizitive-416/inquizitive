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

export const SEARCH_BY_CATEGORY = gql`
query SearchByCategory($categories: String!, $skip: Int!, $limit: Int!) {
  searchByCategory(categories: $categories, skip: $skip, limit: $limit) {
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

export const GET_SEARCHED_CATEGORY_COUNT = gql`
query GetSearchedCategoryCount($categories: String!) {
  getSearchedCategoryCount(categories: $categories) {
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

export const GET_ALL_USERS_COUNT = gql`
query GetAllUsersCount{
  getAllUsersCount {
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

export const GET_ALL_QUIZZES_FROM_CREATOR = gql`
query GetAllQuizzesFromCreator($_id: String!){
  getAllQuizzesFromCreator(idOfCreator: $_id){
    _id
  }
}
`;

export const GET_SEARCHED_PLATFORMS = gql`
query GetSearchedPlatforms($username: String!, $skip: Int!, $limit: Int!){
  getSearchedPlatforms(username: $username, skip: $skip, limit: $limit) {
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

export const GET_SEARCHED_PLATFORMS_COUNT = gql`
query GetSearchedPlatformsCount($username: String!){
  getSearchedPlatformsCount(username: $username) {
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

export const SEARCH_BY_HASHTAG = gql`
query SearchByHashtag($hashtag: String!, $skip: Int!, $limit: Int!) {
  searchByHashtag(hashtag: $hashtag, skip: $skip, limit: $limit) {
    _id
    idOfCreator
    title
    coverimage
    hashtagone
    hashtagtwo
    hashtagthree
  }
}
`;

export const GET_ALL_QUIZZES_COUNT = gql`
query GetAllQuizzesCount($difficulty: String!, $skip: Int!, $limit: Int!) {
  getAllQuizzesCount(difficulty: $difficulty, skip: $skip, limit: $limit) {
    _id
  }
}
`;

export const FILTER_BY_DIFFICULTY = gql`
query FilterByDifficulty($difficulty: String!, $skip: Int!, $limit: Int!) {
  filterByDifficulty(difficulty: $difficulty, skip: $skip, limit: $limit) {
    _id
    idOfCreator
    title
    coverimage
    difficulty
    avgRating
  }
}
`;
import gql from "graphql-tag";

export const GETUSER = gql`
    query getUser {
        getCurrentUser {
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
            profileVisible
            coins
        }
    }
`;
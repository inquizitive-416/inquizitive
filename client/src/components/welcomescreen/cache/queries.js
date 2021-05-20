import gql from "graphql-tag";

export const GETUSER = gql`
    query GetCurrentUser {
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
            profilePublic
            coins
        }
    }
`;

export const GETUSERBYEMAIL = gql`
    query GetUserByEmail($email: String) {
        getUserByEmail(email: $email) {
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
            profilePublic
            coins
        }
    }
`;

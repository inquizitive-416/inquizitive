import { gql } from "@apollo/client";

export const UPDATE_USER_FIELD = gql`
    mutation UpdateUserField($_id: String!, $field: String!, $value: String!) {
        updateUserField(_id: $_id, field: $field, value: $value)
    }
`;

export const UPDATE_USER_VISIBILITY = gql`
    mutation UpdateUserVisibility($_id: String!, $value: Boolean!) {
        updateUserVisibility(_id: $_id, value: $value)
    }
`;

export const UPDATE_USER_INFO = gql`
    mutation UpdateUserInfo($_id: String!, $firstName: String!, $lastName: String!, $email: String!, $dateOfBirth: String!) {
        firstName: updateUserField(_id: $_id, field: "firstName", value: $firstName)
        lastName: updateUserField(_id: $_id, field: "lastName", value: $lastName)
        email: updateUserField(_id: $_id, field: "email", value: $email)
        dateOfBirth: updateUserField(_id: $_id, field: "dateOfBirth", value: $dateOfBirth)
    }
`;

export const UPDATE_SECURITY_QUESTIONS = gql`
    mutation UpdateSecurityQuestions($_id: String!, $question1: String!, $answer1: String!, $question2: String!, $answer2: String!) {
        question1: updateUserField(_id: $_id, field: "securityQuestionOne", value: $question1)
        answer1: updateUserField(_id: $_id, field: "securityAnswerOne", value: $answer1)
        question2: updateUserField(_id: $_id, field: "securityQuestionTwo", value: $question2)
        answer2: updateUserField(_id: $_id, field: "securityAnswerTwo", value: $answer2)
    }
`;
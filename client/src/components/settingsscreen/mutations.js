import { gql } from "@apollo/client";

export const UPDATE_USER_FIELD = gql`
    mutation UpdateUserField($_id: String!, $field: String!, $value: String!) {
        updateUserField(_id: $_id, field: $field, value: $value)
    }
`;

export const UPDATE_USER_INFO = gql`
    mutation UpdateUserInfo($_id: String!, $firstName: String!, $lastName: String!, $email: String!) {
        firstName: updateUserField(_id: $_id, field: "firstName", value: $firstName)
        lastName: updateUserField(_id: $_id, field: "lastName", value: $lastName)
        email: updateUserField(_id: $_id, field: "email", value: $email)
    }
`;
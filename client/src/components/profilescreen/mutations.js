import { gql } from "@apollo/client";

export const UPDATE_USER_FIELD = gql`
    mutation UpdateUserField($_id: String!, $field: String!, $value: String!) {
        updateUserField(_id: $_id, field: $field, value: $value)
    }
`;
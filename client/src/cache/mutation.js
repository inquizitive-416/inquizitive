import gql from "graphql-tag";



export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            
            email
            password
            
        }
    }
`;


export const REGISTER = gql`
mutation Register(
    $firstName:String!,
    $lastName:String!,
    $email:String!,
    $username:String!,
    $password:String!,
    $securityQuestionOne:String!,
    $securityAnswerOne:String!,
    $securityQuestionTwo:String!,
    $securityAnswerTwo:String!) {
    register(
        firstName:$firstName
        lastName:$lastName
        email:$email
        username:$username
        password:$password
        securityQuestionOne:$securityQuestionOne
        securityAnswerOne:$securityAnswerOne
        securityQuestionTwo:$securityQuestionTwo
        securityAnswerTwo:$securityAnswerTwo
    ){
        firstName
        lastName
        email
        username
        password
        securityQuestionOne
        securityAnswerOne
        securityQuestionTwo
        securityAnswerTwo
    }
    
}
`;
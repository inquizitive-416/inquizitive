import gql from "graphql-tag";



export const ADD_QUIZ = gql`
mutation AddQuiz(
    $idOfCreator:ID!,
    $title:String!,
    $description:String!,
    $username:String!,
    $coverImage:String!,
    $categories:String!,
    $hashtagone:String!,
    $hastagtwo:String!,
    $hastagthree:String!,
    $quizposted: Boolean!,
    $timer:
    $questions: []
    $ratings: Int!
    $numOfTimesPlayed: Int! ) {

    AddQuiz(
        $idOfCreator: $idOfCreator ,
        $title: $title,
        $description: $description,
        $username: $username,
        $coverImage: $coverimage,
        $categories: $categories,
        $hashtagone: $hashtagone,
        $hastagtwo: $hastagtwo,
        $hastagthree:$hastagthree,
        $quizposted: $quizposted,
        $timer: $timer
        $questions: $questions
        $ratings: $ratings
        $numOfTimesPlayed: $numOfTimesPlayed
    ){
        idOfCreator
        title
        description
        username
        coverImage
        categories
        hashtagone
        hastagtwo
        hastagthree
        quizposted
        timer
        questions
        ratings
        numOfTimesPlayed
    }
    
}
`;
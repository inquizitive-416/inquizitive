import gql from "graphql-tag";



export const ADDQUIZ = gql`
mutation addQuiz(
    $idOfCreator:String,
    $title:String,
    $description:String,
    $coverimage:String,
    $categories:String,
    $hashtagone:String,
    $hashtagtwo:String,
    $hashtagthree:String,
    $difficulty: String,
    $quizposted: Boolean,
    $timer: Int,
    $questions: [QuestionInput],
    $ratings: Int,
    $avgRating: Int,
    $numOfTimesPlayed: Int,
    $isReported: Boolean ) {
    addQuiz(
        idOfCreator: $idOfCreator ,
        title: $title,
        description: $description,
        coverimage: $coverimage,
        categories: $categories,
        hashtagone: $hashtagone,
        hashtagtwo: $hashtagtwo,
        hashtagthree:$hashtagthree,
        difficulty: $difficulty
        quizposted: $quizposted,
        timer: $timer
        questions: $questions
        ratings: $ratings
        avgRating: $avgRating
        numOfTimesPlayed: $numOfTimesPlayed
        isReported: $isReported
    ){
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
        questions
        {
            id
            questype
            choice1
            choice2
            choice3
            choice4
            image1
            image2
            image3
            image4
            correctAnswer
        }
        ratings
        avgRating
        numOfTimesPlayed
        isReported
    }
    
}
`;

export const UPDATE_QUIZ = gql`
    mutation UpdateQuiz($_id: String!, $idOfCreator: String, $title: String, $description: String,$coverimage: String, $categories: String, $hashtagone: String,$hashtagtwo: String, $hashtagthree: String , $difficulty: String, $quizposted: Boolean, $timer: Int, $questions: [QuestionInput], $ratings: Int, $avgRating: Int, $numOfTimesPlayed: Int, $isReported:Boolean){
        UpdateQuiz( _id: $_id, idOfCreator: $idOfCreator , title: $title, description: $description,coverimage: $coverimage, categories: $categories, hashtagone: $hashtagone,hashtagtwo: $hashtagtwo, hashtagthree:$hashtagthree,difficulty: $difficulty, quizposted: $quizposted,timer: $timer, questions: $questions, ratings: $ratings, avgRating: $avgRating , numOfTimesPlayed: $numOfTimesPlayed, isReported: $isReported )
        {
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
            questions
            {
                id
                questype
                choice1
                choice2
                choice3
                choice4
                image1
                image2
                image3
                image4
                correctAnswer
            }
            ratings
            avgRating
            numOfTimesPlayed
            isReported
        }
        
    }
`;
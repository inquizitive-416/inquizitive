

const quizdata=
  
    // Exmple data for react quiz app 
    {
    quizID: 0,
    creatorID:123,
    title:'My first Quizzz',
    description:'Description',
    questions: [ 
        {
            questionText: 'What is the capital of France?',
            questionType: 'MCQ',
            correct: 'Paris',
            answerOptions: [
                { answerText: 'New York'},
                { answerText: 'London'},
                { answerText: 'Paris'},
                { answerText: 'Dublin'},
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            questionType: 'MCQ',
            correct: 'Elon Musk',
            answerOptions: [
                { answerText: 'Jeff Bezos'},
                { answerText: 'Elon Musk'},
                { answerText: 'Bill Gates'},
                { answerText: 'Tony Stark'},
            ],
        },
        {
            questionText: 'The iPhone was created by which company?',
            questionType: 'MCQ',
            correct: 'Apple',
            answerOptions: [
                { answerText: 'Apple'},
                { answerText: 'Intel'},
                { answerText: 'Amazon'},
                { answerText: 'Microsoft'},
            ],
        },
        {
            questionText: 'How many Harry Potter books are there?',
            questionType: 'MCQ',
            correct: '7',
            answerOptions: [
                { answerText: '1'},
                { answerText: '4'},
                { answerText: '6'},
                { answerText: '7'},
            ],
        }
    ]}
  ;
  
  // export quizdata  
  export default quizdata;
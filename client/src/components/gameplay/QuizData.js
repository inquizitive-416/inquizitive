

const quizdata=
    // Exmple data for react quiz app 
    {
    quizID: 0,
    creatorID:123,
    title:'My first Quizzz',
    description:'Description',
    questions: [ 
        {
            _id:1,
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
            _id:2,
            questionText: 'What is 4 + 33?',
            questionType: 'FIB',
            correct: '37',
            answerOptions: [
                
            ],
        },
        {
            _id:3,
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
            _id:4,
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
            _id:5,
            questionText: 'Oxygen formula?',
            questionType: 'FIB',
            correct: 'O2',
            answerOptions: [
                
            ],
        },
        {
            _id:6,
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
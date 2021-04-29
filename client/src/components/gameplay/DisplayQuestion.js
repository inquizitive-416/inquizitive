import React, { useState, useEffect } from 'react';
import Multiplechoice from './Multiplechoice';


const DisplayQuestion = ({question,setCurrQText}) => {
    if (question.questionType==='MCQ'){
        console.log(question);
        return(
            <Multiplechoice question={question}/>
        );
    }
};

export default DisplayQuestion;
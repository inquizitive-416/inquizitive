import React, { useState, useEffect } from 'react';
import Multiplechoice from './Multiplechoice';
import Fillintheblank from './Fillintheblank';



const DisplayQuestion = ({question,onClick,onChange,answers}) => {
    if (question.questionType==='MCQ'){
        // console.log(question);
        return(
            <Multiplechoice onClick={onClick} question={question} selected={answers}/>
        );
    }
    else if (question.questionType==='FIB'){
        console.log(question);
        return(
            <Fillintheblank onChange={onChange} question={question} selected={answers}/>
        );
    }
};

export default DisplayQuestion;
import React, { useState, useEffect } from 'react';
import Multiplechoice from './Multiplechoice';
import Fillintheblank from './Fillintheblank';
import OrderQuestion from './OrderQuestion';



const DisplayQuestion = ({question,onClick,onChange,answers}) => {
    return(
        <OrderQuestion/>
    );
    // if (question.questype==='MCQ'){
    //     // console.log(question);
    //     return(
    //         <Multiplechoice onClick={onClick} question={question} selected={answers}/>
    //     );
    // }
    // else if (question.questype==='Fitb'){
    //     console.log(question);
    //     // console.log(answers)
    //     return(
    //         <Fillintheblank onChange={onChange} question={question} selected={answers}/>
    //     );
    // }
    
};

export default DisplayQuestion;
import React, { useState, useEffect } from 'react';
import Multiplechoice from './Multiplechoice';
import Fillintheblank from './Fillintheblank';
import OrderQuestion from './OrderQuestion';



const DisplayQuestion = ({question,onClick,onChange,onOrder,answers}) => {
    // return(
    //     <OrderQuestion/>
    // );
    if (question.questype==='MCQ'){
        // console.log(question);
        return(
            <Multiplechoice onClick={onClick} question={question} selected={answers}/>
        );
    }
    else if (question.questype==='Fitb'){
        console.log(question);
        // console.log(answers)
        return(
            <Fillintheblank onChange={onChange} question={question} selected={answers}/>
        );
    }
    else if (question.questype==='Ordering'){
        console.log(question);
        // console.log(answers)
        const myArr=[[question.choice1,question.image1,1],[question.choice2,question.image2,2],[question.choice3,question.image3,3],[question.choice4,question.image4,4]]
        myArr.sort(() => Math.random() - 0.5);
        return(
            <OrderQuestion onOrder={onOrder} myArr={myArr} question={question} selected={answers}/>
        );
    }
};

export default DisplayQuestion;
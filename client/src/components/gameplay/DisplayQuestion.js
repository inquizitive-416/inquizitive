import React, { useState, useEffect } from 'react';
import Multiplechoice from './Multiplechoice';
import Fillintheblank from './Fillintheblank';
import OrderQuestion from './OrderQuestion';
import Match from './Match';


const DisplayQuestion = ({question,onClick,onChange,onOrder,answers,onMatch}) => {
    
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
        var myArr=[]
        if(answers===""){
            myArr=[[question.choice1,question.image1,1],[question.choice2,question.image2,2],[question.choice3,question.image3,3],[question.choice4,question.image4,4]]
            myArr.sort(() => Math.random() - 0.5);
        }
        else{
            
            for(var i=0;i<4;i++){
                if (answers[i]==="1"){
                    myArr.push([question.choice1,question.image1,1])
                }
                else if (answers[i]==="2"){
                    myArr.push([question.choice2,question.image2,2])
                }
                else if (answers[i]==="3"){
                    myArr.push([question.choice3,question.image3,3])
                }
                else if (answers[i]==="4"){
                    myArr.push([question.choice4,question.image4,4])
                }
            }
        }
        // console.log("check",myArr)
        return(
            <OrderQuestion onOrder={onOrder} myArr={myArr} question={question} selected={answers}/>
        );
    }
    else if(question.questype==='MTP'){
        // const myArr=[[question.image1,1],[question.image2,2],[question.image3,3],[question.image4,4]]  
        // myArr.sort(() => Math.random() - 0.5);
        var myArr=[]
        if(answers===""){
            myArr=[[question.image1,1],[question.image2,2],[question.image3,3],[question.image4,4]]  
            myArr.sort(() => Math.random() - 0.5);
        }
        else{
            
            for(var i=0;i<4;i++){
                if (answers[i]==="1"){
                    myArr.push([question.image1,1])
                }
                else if (answers[i]==="2"){
                    myArr.push([question.image2,2])
                }
                else if (answers[i]==="3"){
                    myArr.push([question.image3,3])
                }
                else if (answers[i]==="4"){
                    myArr.push([question.image4,4])
                }
            }
        }
        return(
            <Match onMatch={onMatch} myArr={myArr} question={question}/>
        );
    }
};

export default DisplayQuestion;
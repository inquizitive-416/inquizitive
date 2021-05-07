import React, { useState, useEffect } from 'react';
import GamePlay from './GamePlay'
import Begin from '../beginContScreen/BeginContScreen'
const StartingQuiz = ({props}) => {
    const [quizStart,setQuizStart] = useState(false);
    const [quiz,setQuiz] = useState("")
    const startPlay = (props)=>{
        setQuizStart(true);
        console.log(props.quiz);
        setQuiz(props.quiz);
    }
    if(quizStart===false){
        return(
            <Begin play={startPlay}/>
        );
    }
    else{
        return(
            <GamePlay quiz={quiz}/>
        );
    }
    
}

export default StartingQuiz;
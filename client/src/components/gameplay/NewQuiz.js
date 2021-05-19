import React, { useState, useEffect } from 'react';
import {GET_QUIZ} from './queries';
import { useQuery } from '@apollo/client';
import GamePlay from './GamePlay'

const NewQuiz=(props)=>{
    let quiz={}
    let quizId = props.match.params.id;

    const { loading, error, data } = useQuery(GET_QUIZ, {
        variables: {_id: "60a55d03298eaf12e8138430"}
    })
    if (loading) { return <div></div>; }
    if(error) { console.log(error);
        return <div>Internal Error</div>; }
	if(data) { 
        quiz=(data.getQuizById) 
        console.log("Quiz:",quiz);       
    }


    return(
        <div>
            <GamePlay quiz={quiz}/>
        </div>
    );
}

export default NewQuiz;
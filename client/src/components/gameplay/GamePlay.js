import React, { useState, useEffect } from 'react';
import Multiplechoice from './Multiplechoice';
import DisplayQuestion from './DisplayQuestion';

import "./Multiplechoice.css";
import quiz from './QuizData';

const GamePlay = (props) => {

    const [currQuestion,setCurrQuestion]=useState(0);
    const [currAnswer,setCurrAnswer]=useState("");
    const [currQText,setCurrQText]=useState("");


    const onClickNext= (props)=>{
        const nextQuestion = currQuestion + 1;
		if (nextQuestion < quiz.length) {
			setCurrQuestion(nextQuestion);
		}
    }
    const onClickPrev= (props)=>{
        const nextQuestion = currQuestion - 1;
		if (nextQuestion >= 0) {
			setCurrQuestion(nextQuestion);
		}
    }
    const answerClick =(props)=>{
        setCurrAnswer(props);
    }
    return(
        <div>
            <div style={{textAlign:'center',paddingBottom:'10vh',paddingTop:'10vh',backgroundColor:'#404040'}}>
                <h1 style={{color:'white'}}>My First Quiz</h1>
            </div>
            <div class='row' style={{backgroundColor:'#424242'}}>
                <div class='col' style={{display:'flex', marginLeft:'4vh',paddingBottom:'4vh',paddingTop:'4vh'}}>
                    <h2 className='nextprev' style={{ marginRight: "auto" }} onClick={onClickPrev}>{'<'}prev</h2>
                </div>
                <div class='col'style={{display:'flex',paddingBottom:'4vh',paddingTop:'4vh'}}>
                    <h2 style={{ margin: "auto",color:'white' }}>{currQText}</h2>
                </div>
                <div class='col' style={{display:'flex', marginRight:'4vh',paddingBottom:'4vh',paddingTop:'4vh'}}>
                    <h2 className='nextprev' style={{ marginLeft: "auto" }} onClick={onClickNext}>next{'>'}</h2>
                </div>
            </div>
            <div style={{ backgroundColor:'#4d4d4d'}}>
                {
                    
                    quiz.questions.map((question)=>(
                        <DisplayQuestion question={question}/>
                    ))
                    
                }
            </div>
            <div class='row' style={{backgroundColor:'#424242'}}>
                <div class='col' style={{display:'flex', marginLeft:'10vh'}}>
                    <button  style={{ marginRight: "auto",backgroundColor:'orange',borderRadius:'25px',paddingLeft:'25pt',paddingRight:'25pt' }}>
                        Exit Quiz</button>
                </div>
                <div class='col' style={{display:'flex'}}>
                    <h2 style={{ margin: "auto" ,color:'white'}}>Question Number: {currQuestion+1}</h2>
                </div>
                <div class='col' style={{display:'flex',marginRight:'10vh'}}>
                    <button style={{ marginLeft: "auto",backgroundColor:'orange',borderRadius:'25px',paddingLeft:'25pt',paddingRight:'25pt'}}>
                        Submit</button>
                </div>
            </div>
        </div>
    );
};

export default GamePlay;

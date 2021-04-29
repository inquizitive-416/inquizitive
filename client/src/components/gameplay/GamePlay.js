import React, { useState, useEffect } from 'react';
import Multiplechoice from './Multiplechoice';
import DisplayQuestion from './DisplayQuestion';

import "./Multiplechoice.css";
import quiz from './QuizData';

const GamePlay = (props) => {

    const [currQuestion,setCurrQuestion]=useState(0);
    const [currAnswer,setCurrAnswer]=useState("");
    const [currQText,setCurrQText]=useState("");
    const [answer, setAnswer]=useState(new Array(quiz.questions.length).fill(""))
    const [selected, setSelected] = useState("")

    const onClickNext= (props)=>{
        
        const nextQuestion = currQuestion + 1;
        answer[currQuestion]=selected;
        setAnswer(answer);
        console.log(answer);
		if (nextQuestion < quiz.questions.length) {
            
			setCurrQuestion(nextQuestion);
            setSelected(answer[nextQuestion]);
		}
        

    }
    const onClickPrev= (props)=>{
        const prevQuestion = currQuestion - 1;
        answer[currQuestion]=selected;
        setAnswer(answer);
        console.log(answer);
		if (prevQuestion >= 0) {
            setSelected(answer[prevQuestion]);
            // console.log(prevQuestion);
			setCurrQuestion(prevQuestion);
            
		}

    }
    function answerClick(ans){
        setSelected(ans)
        console.log(ans)
    }
    function onChange(e){
        setSelected(e.target.value)
        console.log(e.target.value)
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
                    <h2 style={{ margin: "auto",color:'white' }}>{quiz.questions[currQuestion].questionText}</h2>
                </div>
                <div class='col' style={{display:'flex', marginRight:'4vh',paddingBottom:'4vh',paddingTop:'4vh'}}>
                    <h2 className='nextprev' style={{ marginLeft: "auto" }} onClick={onClickNext}>next{'>'}</h2>
                </div>
            </div>
            <div style={{ backgroundColor:'#4d4d4d'}}>
                {
                    <DisplayQuestion onClick={answerClick} onChange={onChange} question={quiz.questions[currQuestion]} answers = {answer[currQuestion]}/>                    
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

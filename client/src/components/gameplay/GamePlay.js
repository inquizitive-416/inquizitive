import React, { useState, useEffect } from 'react';
import Multiplechoice from './Multiplechoice';
import DisplayQuestion from './DisplayQuestion';
import Button from "react-bootstrap/Button";
import Score from './Score'

import "./Multiplechoice.css";
// import quiz from './QuizData';

const GamePlay = (props) => {
    const [quiz,setQuiz] = useState(props.quiz)
    const [currQuestion,setCurrQuestion]=useState(0);
    const [answer, setAnswer]=useState(new Array(quiz.questions.length).fill(""))
    const [scoreOpen, setScoreOpen] = useState(false)
    const [score, setScore] = useState(0)


    const onClickNext= (props)=>{

        const nextQuestion = currQuestion + 1;
        // answer[currQuestion]=selected;
        // setAnswer(answer);
        // console.log("Answer")
        // console.log(answer);
		if (nextQuestion < quiz.questions.length) {
            
			setCurrQuestion(nextQuestion);
            // setSelected(answer[nextQuestion]);
            // console.log(answer[nextQuestion])
            console.log("Next: ",currQuestion)
		}


    }
    const onClickPrev= (props)=>{
        const prevQuestion = currQuestion - 1;
        // answer[currQuestion]=selected;
        // setAnswer(answer);
        // console.log(answer);
		if (prevQuestion >= 0) {
            // setSelected(answer[prevQuestion]);
            // console.log(prevQuestion);
            
			setCurrQuestion(prevQuestion);
            console.log("Prev: ",currQuestion)

		}

    }
    function answerClick(ans){
        // setSelected(ans)
        answer[currQuestion]=ans
        setAnswer(answer)
        console.log("answerclick:",answer)
    }
    function onChange(e){
        // setSelected(e.target.value)
        answer[currQuestion]=e.target.value
        setAnswer(answer)

        console.log("onchange:",answer)
    }
    function onOrder(order){
        // setSelected(e.target.value)
        answer[currQuestion]=order
        setAnswer(answer)

        console.log("onOrder:",answer)
    }

    function onMatch(match){
        // setSelected(e.target.value)
        answer[currQuestion]=match
        setAnswer(answer)

        console.log("onMatch:",answer)
    }

    const Submit=()=>{
        
        var n=0;
        var score=0;
        console.log("answer",answer)
        for(const [index,elem] of quiz.questions.entries()){
            console.log("hererere",elem)
            if (elem.questype==='MCQ'){
                if (elem.correctAnswer==='1'){
                    if (elem.choice1.toUpperCase()===answer[index].toUpperCase()){
                        score+=1
                    }
                }
                else if (elem.correctAnswer==='2'){
                    if (elem.choice2.toUpperCase()===answer[index].toUpperCase()){
                        score+=1
                    }
                }
                else if (elem.correctAnswer==='3'){
                    if (elem.choice3.toUpperCase()===answer[index].toUpperCase()){
                        score+=1
                    }
                }
                else if (elem.correctAnswer==='4'){
                    if (elem.choice4.toUpperCase()===answer[index].toUpperCase()){
                        score+=1
                    }
                }
            }
            else if (elem.correctAnswer.toUpperCase()===answer[index].toUpperCase()){
                console.log("hello", answer[index])
                score+=1
            }
        }
        console.log(score);

        setScore(score);
        setScoreOpen(true);
    }
    return(
        <div style={{height:"100vh",width:"100vw",backgroundColor:"red"}}>
            <div style={{textAlign:"center",height:"15vh",width:"100vw",backgroundColor:'#404040'}}>
                <h1 style={{color:'white',fontSize:"8vh",fontStyle:"black",position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>{quiz.title}</h1>
            </div>
            <div class='row' style={{backgroundColor:'#424242',height:"20vh",width:"100vw"}}>
                <div class='col' style={{textAlign:"center", height:"20vh",width:"10vw"}}>
                    <h2 className='nextprev' style={{fontSize:"5vh",position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"15vw" }} onClick={onClickPrev}>{'<'}prev</h2>
                </div>
                <div class='col' style={{height:"20vh",width:"80vw",textAlign:"center"}}>
                    <h2 style={{fontSize:"5vh", width:"80vw",color:'white' ,position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>{quiz.questions[currQuestion].questionPrompt}</h2>
                </div>
                <div class='col' style={{textAlign:"center",height:"20vh",width:"10vw"}} >
                    <h2 className='nextprev' style={{fontSize:"5vh",position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"15vw"}} onClick={onClickNext}>next{'>'}</h2>
                </div>
            </div>
            <div style={{ backgroundColor:'#4d4d4d',height:"60vh",width:"100vw"}}>
                {
                    <DisplayQuestion style={{height:"60vh"}} onMatch={onMatch} onClick={answerClick} onOrder={onOrder} onChange={onChange} question={quiz.questions[currQuestion]} answers = {answer[currQuestion]}/>                    
                }
            </div>
            <div class='row' style={{backgroundColor:'#424242',height:"5vh",width:"100vw"}}>
                <div class='col' style={{alignContent:"center", height:"5vh",width:"20vw"}}>
                    <Button href='/explore' style={{backgroundColor:'orange',borderRadius:'25px',position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:"4.5vh",width:"8vw" }}>
                        Exit Quiz</Button>
                </div>
                <div class='col' style={{height:"5vh",width:"60vw",textAlign:"center"}}>
                    <h2 style={{color:'white',position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"60vw"}}>Question Number: {currQuestion+1}</h2>
                </div>
                <div class='col' style={{alignContent:"center", height:"5vh",width:"20vw"}}>
                    <Button onClick={Submit} style={{backgroundColor:'orange',borderRadius:'25px',position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:"4.5vh",width:"8vw"}}>
                        Submit</Button>
                    <Score isOpen={scoreOpen} score={score} total={quiz.questions.length}/>
                </div>
            </div>
        </div>
    );
};

export default GamePlay;
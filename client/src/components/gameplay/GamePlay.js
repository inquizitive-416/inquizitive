// import React, { useState, useEffect } from 'react';
// import Multiplechoice from './Multiplechoice';
// import DisplayQuestion from './DisplayQuestion';
// import Button from "react-bootstrap/Button";
// import Score from './Score'
// import "./Multiplechoice.css";
// import {GET_QUIZ} from './queries';
// import { useQuery } from '@apollo/client';

// const GamePlay = (props) => {
//     const [quiz,setQuiz] = useState(props.quiz)
//     const [currQuestion,setCurrQuestion]=useState(0);
//     const [currAnswer,setCurrAnswer]=useState("");
//     const [currQText,setCurrQText]=useState("");
//     const [answer,setAnswer] = useState(new Array(quiz.questions.length).fill(""));
//     const [selected, setSelected] = useState("")
//     const [scoreOpen, setScoreOpen] = useState(false)
//     const [score, setScore] = useState(0)
    

//     const onClickNext= (props)=>{
        
//         const nextQuestion = currQuestion + 1;
//         answer[currQuestion]=selected;
//         setAnswer(answer);
        
// 		if (nextQuestion < quiz.questions.length) {
//             console.log(quiz)
//             setCurrQuestion(nextQuestion)
// 			setSelected(answer[nextQuestion])
// 		}
        

//     }
//     const onClickPrev= (props)=>{
//         const prevQuestion = currQuestion - 1;
//         answer[currQuestion]=selected;
//         setAnswer(answer);
//         console.log(answer);
// 		if (prevQuestion >= 0) {
//             setSelected(answer[prevQuestion]);
//             // console.log(prevQuestion);
// 			setCurrQuestion(prevQuestion);
            
// 		}

//     }
//     function answerClick(ans){
//         setSelected(ans)
//         console.log(ans)
//     }
//     function onChange(e){
//         setSelected(e.target.value)
//         console.log(e.target.value)
//     }
//     const Submit=()=>{
//         answer[currQuestion]=selected;
//         // setAnswer(answer);
//         var n=0;
//         var score=0;
//         for(const [index,elem] of quiz.questions.entries()){
//             if(elem.correctAnswer===answer[index]){
//                 score=score+1;
//             }
//         }
//         console.log(score);
//         setScore(score);
//         setScoreOpen(true);
//     }
//     return(
//         <div>
//             <div style={{textAlign:'center',height:'20vh',backgroundColor:'#404040'}}>
//                 <h1 style={{color:'white'}}>{quiz.title}</h1>
//             </div>
//             <div class='row' style={{height:'20vh',backgroundColor:'#424242'}}>
//                 <div class='col' style={{display:'flex', marginLeft:'4vh',paddingBottom:'4vh',paddingTop:'4vh'}}>
//                     <h2 className='nextprev' style={{ marginRight: "auto" }} onClick={onClickPrev}>{'<'}prev</h2>
//                 </div>
//                 <div class='col'style={{display:'flex',paddingBottom:'4vh',paddingTop:'4vh'}}>
//                     <h2 style={{ margin: "auto",color:'white' }}>{quiz.questions[currQuestion].questionPrompt}</h2>
//                 </div>
//                 <div class='col' style={{display:'flex', marginRight:'4vh',paddingBottom:'4vh',paddingTop:'4vh'}}>
//                     <h2 className='nextprev' style={{ marginLeft: "auto" }} onClick={onClickNext}>next{'>'}</h2>
//                 </div>
//             </div>
//             <div style={{ height:'50vh',backgroundColor:'#4d4d4d'}}>
//                 {
//                     <DisplayQuestion onClick={answerClick} onChange={onChange} question={quiz.questions[currQuestion]} answers = {answer[currQuestion]}/>                    
//                 }
//             </div>
//             <div class='row' style={{height:'8vh',backgroundColor:'#424242'}}>
//                 <div class='col' style={{display:'flex', marginLeft:'10vh'}}>
//                     <Button href='/explore' style={{ marginRight: "auto",backgroundColor:'orange',borderRadius:'25px',paddingLeft:'25pt',paddingRight:'25pt' }}>
//                         Exit Quiz</Button>
//                 </div>
//                 <div class='col' style={{display:'flex'}}>
//                     <h2 style={{ margin: "auto" ,color:'white'}}>Question Number: {currQuestion+1}</h2>
//                 </div>
//                 <div class='col' style={{display:'flex',marginRight:'10vh'}}>
//                     <Button onClick={Submit} style={{ marginLeft: "auto",backgroundColor:'orange',borderRadius:'25px',paddingLeft:'25pt',paddingRight:'25pt'}}>
//                         Submit</Button>
//                     <Score isOpen={scoreOpen} score={score} total={quiz.questions.length}/>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GamePlay;







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
    const [currAnswer,setCurrAnswer]=useState("");
    const [currQText,setCurrQText]=useState("");
    const [answer, setAnswer]=useState(new Array(quiz.questions.length).fill(""))
    const [selected, setSelected] = useState("")
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
        answer[currQuestion]=selected;
        setAnswer(answer);
        var n=0;
        var score=0;
        for(const [index,elem] of quiz.questions.entries()){
            if(elem.correctAnswer===answer[index]){
                score=score+1;
            }
        }
        console.log(score);
        setScore(score);
        setScoreOpen(true);
    }
    return(
        <div style={{height:"100vh",width:"100vw"}}>
            <div style={{textAlign:'center',paddingBottom:'5%',paddingTop:'5%',height:"10%",width:"100%",backgroundColor:'#404040'}}>
                <h1 style={{color:'white'}}>{quiz.title}</h1>
            </div>
            <div class='row' style={{backgroundColor:'#424242',height:"20%",width:"100%"}}>
                <div class='col' style={{marginLeft:'4vh',paddingBottom:'4vh',paddingTop:'4vh'}}>
                    <h2 className='nextprev' style={{ width:"10%",marginRight: "auto" }} onClick={onClickPrev}>{'<'}prev</h2>
                </div>
                <div class='col'style={{paddingBottom:'4vh',paddingTop:'4vh'}}>
                    <h2 style={{ width:"80%",margin: "auto",color:'white' }}>{quiz.questions[currQuestion].questionPrompt}</h2>
                </div>
                <div class='col' style={{display:'flex', marginRight:'4vh',paddingBottom:'4vh',paddingTop:'4vh'}}>
                    <h2 className='nextprev' style={{width:"10%", marginLeft: "auto" }} onClick={onClickNext}>next{'>'}</h2>
                </div>
            </div>
            <div style={{ backgroundColor:'#4d4d4d',height:"60%",width:"100%"}}>
                {
                    <DisplayQuestion onMatch={onMatch} onClick={answerClick} onOrder={onOrder} onChange={onChange} question={quiz.questions[currQuestion]} answers = {answer[currQuestion]}/>                    
                }
            </div>
            <div class='row' style={{backgroundColor:'#424242',height:"10%",width:"100%"}}>
                <div class='col' style={{display:'flex', marginLeft:'10vh'}}>
                    <Button href='/explore' style={{ marginRight: "auto",backgroundColor:'orange',borderRadius:'25px',paddingLeft:'25pt',paddingRight:'25pt' }}>
                        Exit Quiz</Button>
                </div>
                <div class='col' style={{display:'flex'}}>
                    <h2 style={{ margin: "auto" ,color:'white'}}>Question Number: {currQuestion+1}</h2>
                </div>
                <div class='col' style={{display:'flex',marginRight:'10vh'}}>
                    <Button onClick={Submit} style={{ marginLeft: "auto",backgroundColor:'orange',borderRadius:'25px',paddingLeft:'25pt',paddingRight:'25pt'}}>
                        Submit</Button>
                    <Score isOpen={scoreOpen} score={score} total={quiz.questions.length}/>
                </div>
            </div>
        </div>
    );
};

export default GamePlay;
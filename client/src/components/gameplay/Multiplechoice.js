import React, { useState, useEffect } from 'react';
import "./Multiplechoice.css";

const Multiplechoice = ({question,onClick,selected}) => {
    const handleClick=(ans)=>{
        console.log("here "+selected);
        onClick(ans);

    }

    return(
        
        <div style={{height:"60vh",width:"100vw", backgroundColor:'#4d4d4d'}}>
            <div class='row' style={{height:"30vh",width:"100vw"}}>
                <div class='col'  style={{height:"30vh",width:"50vw"}}>
                    <button onClick={()=>handleClick(question.choice1)} className='MCQButton' style={question.choice1===selected?{position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:"20vh",width:"40vw",border: "4px solid white"}:{ position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:"20vh",width:"40vw" }}>{question.choice1}</button>
                </div>
                <div class='col'  style={{height:"30vh",width:"50vw"}}>
                    <button onClick={()=>handleClick(question.choice2)} className='MCQButton' style={question.choice2===selected?{position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:"20vh",width:"40vw",border: "4px solid white"}:{ position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:"20vh",width:"40vw" }}>{question.choice2}</button>
                </div>
            </div>
            <div class='row' style={{height:"30vh",width:"100vw"}}>
            <div class='col'  style={{height:"30vh",width:"50vw"}}>
                    <button onClick={()=>handleClick(question.choice3)} className='MCQButton' style={question.choice3===selected?{position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:"20vh",width:"40vw",border: "4px solid white"}:{ position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:"20vh",width:"40vw" }}>{question.choice3}</button>
                </div>
                <div class='col'  style={{height:"30vh",width:"50vw"}}>
                    <button onClick={()=>handleClick(question.choice4)} className='MCQButton' style={question.choice4===selected?{position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:"20vh",width:"40vw",border: "4px solid white"}:{ position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",height:"20vh",width:"40vw" }}>{question.choice4}</button>
                </div>
            </div>
        </div>
            
        
    );
};

export default Multiplechoice;

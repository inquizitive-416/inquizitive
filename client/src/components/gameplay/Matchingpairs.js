import React, { useState, useEffect } from 'react';

const Matchingpairs = ({question,onClick,selected}) => {


    return(
        <div>
            <div style={{ backgroundColor:'#4d4d4d'}}>
                <div class='row'>
                    <div class='col'  style={{display:'flex', margin:'auto', paddingTop:'4vh', paddingBottom:'4vh'}}>
                        <button onClick={()=>handleClick(question.choice1)} className='MCQButton' style={question.choice1===selected?{margin:"auto",border: "4px solid white"}:{ margin: "auto" }}>{question.choice1}</button>
                    </div>
                    <div class='col'  style={{display:'flex', margin:'auto', paddingTop:'4vh', paddingBottom:'4vh'}}>
                        <button onClick={()=>handleClick(question.choice2)} className='MCQButton' style={question.choice2===selected?{margin:"auto",border: "4px solid white"}:{ margin: "auto" }}>{question.choice2}</button>
                    </div>
                </div>
                <div class='row'>
                <div class='col'  style={{display:'flex', margin:'auto', paddingTop:'4vh', paddingBottom:'4vh'}}>
                        <button onClick={()=>handleClick(question.choice3)} className='MCQButton' style={question.choice3===selected?{margin:"auto",border: "4px solid white"}:{ margin: "auto" }}>{question.choice3}</button>
                    </div>
                    <div class='col'  style={{display:'flex', margin:'auto', paddingTop:'4vh', paddingBottom:'4vh'}}>
                        <button onClick={()=>handleClick(question.choice4)} className='MCQButton' style={question.choice4===selected?{margin:"auto",border: "4px solid white"}:{ margin: "auto" }}>{question.choice4}</button>
                    </div>
                </div>
            </div>
            {/* <div style={{ backgroundColor:'#4d4d4d'}}>
                {question.answerOptions.map((answerOption, index) => (
                    <div class='col'  style={{display:'flex', margin:'auto', paddingTop:'5vh', paddingBottom:'2vh'}}>
                        <button onClick={()=>handleClick(answerOption.answerText)} className='MCQButton' style={answerOption.answerText===selected?{margin:"auto",border: "4px solid white"}:{ margin: "auto" }}>{answerOption.answerText}</button>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Matchingpiars;
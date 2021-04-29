import React, { useState, useEffect } from 'react';
import "./Multiplechoice.css";
import quiz from './QuizData';

const Multiplechoice = ({question}) => {

    return(
        <div>
            
            <div style={{ backgroundColor:'#4d4d4d'}}>
                {question.answerOptions.map((answerOption, index) => (
                    <div class='col'  style={{display:'flex', margin:'auto', paddingTop:'5vh', paddingBottom:'2vh'}}>
                        <button className='MCQButton' style={{ margin: "auto" }}>{answerOption.answerText}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Multiplechoice;

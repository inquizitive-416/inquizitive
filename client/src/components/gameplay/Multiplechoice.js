import React, { useState, useEffect } from 'react';
import "./Multiplechoice.css";

const Multiplechoice = ({question,onClick,selected}) => {
    const handleClick=(ans)=>{
        console.log("here "+selected);
        onClick(ans);

    }

    return(
        <div>
            
            <div style={{ backgroundColor:'#4d4d4d'}}>
                {question.answerOptions.map((answerOption, index) => (
                    <div class='col'  style={{display:'flex', margin:'auto', paddingTop:'5vh', paddingBottom:'2vh'}}>
                        <button onClick={()=>handleClick(answerOption.answerText)} className='MCQButton' style={answerOption.answerText===selected?{margin:"auto",border: "4px solid white"}:{ margin: "auto" }}>{answerOption.answerText}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Multiplechoice;

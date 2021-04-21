import React, { useState, useEffect } 	from 'react';
import CreateQuestion from '../createQuestion/CreateQuestion';

const QuestionList = ({questions, onDelete}  ) => {

     return (
        <>
        {questions.map( question => (
        
          <CreateQuestion  question={question} onDelete={onDelete}  />
        ))}
      </>

            
        );


    };
    

export default QuestionList;

//{questions.map((ques, index) => (
        
    //<CreateQuestion key={index} ques={ques} onDelete={onDelete}  />
  //))}
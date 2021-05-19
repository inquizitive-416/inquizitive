import React, { useState, useEffect } 	from 'react';
import CreateQuestion from '../createQuestion/CreateQuestion';

const QuestionList = ({questions, isempty, onDelete, changeQuestion, onSave}  ) => {

  console.log(questions)

     return (
        <>
        {questions.map( (question,index) => (
        
          <CreateQuestion  question={question} isempty={isempty} index = {index} onDelete={onDelete} changeQuestion={changeQuestion} onSave={onSave}/>
        ))}
      </>

            
        );


    };
    

export default QuestionList;

//{questions.map((ques, index) => (
        
    //<CreateQuestion key={index} ques={ques} onDelete={onDelete}  />
  //))}
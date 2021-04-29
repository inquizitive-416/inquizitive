import React, { useState, useEffect } 	from 'react';
import CreateQuestion from '../createQuestion/CreateQuestion';

const QuestionList = ({questions, onDelete, changeQuestion, onSave}  ) => {

     return (
        <>
        {questions.map( question => (
        
          <CreateQuestion  question={question} onDelete={onDelete} changeQuestion={changeQuestion} onSave={onSave}/>
        ))}
      </>

            
        );


    };
    

export default QuestionList;

//{questions.map((ques, index) => (
        
    //<CreateQuestion key={index} ques={ques} onDelete={onDelete}  />
  //))}
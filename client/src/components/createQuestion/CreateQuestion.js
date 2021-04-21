import React, { useState, useEffect } 	from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const CreateQuestion = ({question,onDelete}) => {
    //console.log(key)
    //console.log(question)
    var type = "MTP"
    
    if(type == "MTP")
    {
        return (
    
         <Accordion defaultActiveKey="0">
         <Card>
              <Card.Header>
                 <Accordion.Toggle as={Button} variant="link" eventKey="0">  Click me</Accordion.Toggle>
             </Card.Header>
             <Accordion.Collapse eventKey="0">
                 <Card.Body> <div>
                <div style= {{paddingLeft: 17}}>
                    <label for="formGroupExampleInput">Enter Question Prompt:</label>
                     <input style= {{ backgroundColor: "#838383", width:900}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Add Quiz Name"/>
                    
                     <button style= {{backgroundColor: "#ffa343" }} onClick={(e) => onDelete(question.id)} class="btn btn-primary" type="button">Delete Question</button>
                </div>
            </div> </Card.Body>
              </Accordion.Collapse>
        </Card>
     </Accordion> 

            
        );


    }
    else if(type == "FITB")
    {
        
        return (
            <div>
                <header> yo</header>
            </div>
            
        );


    }
    else if(type == "Matching")
    {


    }
	
};

export default CreateQuestion;
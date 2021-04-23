import React, { useState, useEffect } 	from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const CreateQuestion = ({question,onDelete}) => {
    //console.log(key)
    //console.log(question)
    console.log(question.questype)
    
    if( question.questype == "Fitb")
    {
        return (
            <Accordion defaultActiveKey="1">
               <Card>
                    <Card.Header style = {{backgroundColor: "#545454"}}>
                        <span>
                            <Accordion.Toggle style={{color:"orange"}} as={Button} variant="link" eventKey="0"> Question {question.id}</Accordion.Toggle> 
                            <button style= {{backgroundColor: "#ffa343", float: 'right' }} onClick={(e) => onDelete(question.id)} class="btn btn-primary" type="button">Delete Question</button>
                        </span>     
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{backgroundColor: "#404040"}}> 
                            <div>
                                <div style= {{paddingLeft: 20}}>
                                    <div style= {{paddingBottom: 40 }}>
                                        <label style= {{color: "lightgrey"}} for="formGroupExampleInput">Enter Question Prompt:</label>
                                        <input style= {{ backgroundColor: "#838383", width:900}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Question Prompt"/>
                                    </div>
                        
                                    <div style={{paddingTop:27, borderColor: "orange"}} class="card border-warning mb-3" style= {{  width:300}}>
                                        <div style = {{backgroundColor: "#282828", color:"lightgrey"}}class="card-header"> Enter Correct Word </div>
                                        <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" placeholder="Enter Answer"/>
                                    </div> 
                                </div>
                            </div> 
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
           </Accordion> 
    
        );
    }
    else if(question.questype =="MTP")
    {
     return (
        <Accordion defaultActiveKey="1">
           <Card>
                <Card.Header style = {{backgroundColor: "#545454"}}>
                    <span>
                        <Accordion.Toggle style={{color:"orange"}} as={Button} variant="link" eventKey="0"> Question {question.id}</Accordion.Toggle> 
                        <button style= {{backgroundColor: "#ffa343", float: 'right' }} onClick={(e) => onDelete(question.id)} class="btn btn-primary" type="button">Delete Question</button>
                    </span>     
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body style={{backgroundColor: "#404040"}}> 
                        <div>
                            <div style= {{paddingLeft: 20}}>
                                <div style= {{paddingBottom: 40 }}>
                                    <label style= {{color: "lightgrey"}} for="formGroupExampleInput">Enter Question Prompt:</label>
                                    <input style= {{ backgroundColor: "#838383", width:900}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Question Prompt"/>
                                </div>
                    
                                <div style={{paddingTop:27, borderColor: "orange"}} class="card border-warning mb-3" style= {{  width:300}}>
                                    <div style = {{backgroundColor: "#282828", color:"lightgrey"}}class="card-header"> Options </div>
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" placeholder="Enter Option 1"/>
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" placeholder="Enter Option 2"/>
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" placeholder="Enter Option 3"/>
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" placeholder="Enter Option 4"/>
                                </div>
                        
                                <div style ={{paddingTop: 30 }}>
                                     <label style= {{color: "lightgrey"}} for="formGroupExampleInput">Choose correct option/s: </label>
                                     <div style= {{paddingLeft:20}} class="form-check form-check-inline">
                                        <input style={{width: 18, height :18}}class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                        <label class="form-check-label" for="inlineCheckbox1">1</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                         <input style={{width: 18, height :18}}class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                        <label class="form-check-label" for="inlineCheckbox2">2</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                         <input style={{width: 18, height :18}}class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
                                         <label class="form-check-label" for="inlineCheckbox3">3 </label>      
                                    </div>
                                    <div class="form-check form-check-inline">
                                         <input style={{width: 18, height :18}}class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
                                        <label class="form-check-label" for="inlineCheckbox3"> 4</label>
                                    </div>
                                </div>    
                            </div>
                        </div> 
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
       </Accordion> 

        );


    }
    else if(question.questype =="Matching")
    {
        return (
            <Accordion defaultActiveKey="1">
         <Card>
              <Card.Header style = {{backgroundColor: "#545454"}}>
                 <Accordion.Toggle  as={Button} variant="link" eventKey="0"> Question {question.id}</Accordion.Toggle>
             </Card.Header>
             <Accordion.Collapse eventKey="0">
                 <Card.Body style={{backgroundColor: "#A4A4A4"}}> <div>
                <div style= {{paddingLeft: 20}}>
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
    else{
        return (
            <Accordion defaultActiveKey="1">
         <Card>
              <Card.Header style = {{backgroundColor: "#545454"}}>
                 <Accordion.Toggle  as={Button} variant="link" eventKey="0"> Question {question.id}</Accordion.Toggle>
             </Card.Header>
             <Accordion.Collapse eventKey="0">
                 <Card.Body style={{backgroundColor: "#A4A4A4"}}> <div>
                <div style= {{paddingLeft: 20}}>
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
	
};

export default CreateQuestion;
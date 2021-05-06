import React, { useState, useEffect } 	from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { uploadFile } from 'react-s3';


const CreateQuestion = ({question,onDelete,changeQuestion, onSave}) => {
    //console.log(key)
    //console.log(question)
    console.log(question.questype)

    
    const [image1, setImage1] = useState({});
    const [image2, setImage2] = useState({});
    const [image3, setImage3] = useState({});
    const [image4, setImage4] = useState({});

    const [ques,setQues] = useState(
        {
            id: question.id,
            questype: question.questype,
            questionPrompt: "",
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: "",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            correctAnswer: ""

        }
    )
    
    const onChangeQues =(e)=>
    {
        setQues({...ques,[e.target.name]:e.target.value}); 
        
        console.log("curr ques", ques)

        //changeQuestion( question.questype, question.id, ques)
  
    }
    const handleNewImage = (e) => {
        
        var newImage = e.target.files[0];
        var myname = newImage.name
        console.log(myname)
        var renamedImage = new File([newImage], myname, {type: newImage.type});
        console.log(renamedImage)
        
        if (e.target.name == "image1")
        { setImage1(renamedImage)
        }
        else if (e.target.name == "image2")
        { setImage2(renamedImage) }

        else if(e.target.name == "image3")
        {  setImage3(renamedImage) }

        else
        { setImage4(renamedImage)}


        //setImage(renamedImage);
    }
    const uploadNewImage = async (e) => {
        const config = {
            bucketName: 'inquizitive416',
            dirName: 'avatars', // SPECIFY DIRECTORY FOR FILES HERE
            region: 'us-east-1',
            accessKeyId: 'AKIA5IBQXNKG3HMYNPZW',
            secretAccessKey: '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',
        }

        var fileLocation = "";
        
        await uploadFile( e.target.name,config)
            .then(data => fileLocation = data.location)
            .catch(err => console.error(err));

        console.log("my loc", fileLocation)

        //await updateUserField({ variables: { _id: props.user._id, field: 'profilePicture', value: fileLocation}});
    }





    
    if( question.questype == "Fitb")
    {
        return (
            <Accordion defaultActiveKey="1">
               <Card>
                    <Card.Header style = {{backgroundColor: "#545454"}}>
                        <span>
                            <Accordion.Toggle style={{color:"orange"}} as={Button} variant="link" eventKey="0"> Question {question.id}</Accordion.Toggle> 
                            <button style= {{backgroundColor: "#ffa343", float: 'right' }} onClick={(e) => onDelete(question.id,question.questype)} class="btn btn-primary" type="button">Delete</button>
                            <button style= {{backgroundColor: "white", float: 'right', color: "orange" }} onClick={(e) => onSave(question.id,ques)} class="btn btn-primary" type="button"><b> Save </b></button>
                        </span>     
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{backgroundColor: "#404040"}}> 
                            <div>
                                <div style= {{paddingLeft: 20}}>
                                    <div style= {{paddingBottom: 40 }}>
                                        <label style= {{color: "lightgrey"}} for="formGroupExampleInput">Enter Question Prompt:</label>
                                        <input style= {{ backgroundColor: "#838383", width:900}} type="text" name="questionPrompt" value={ques.questionPrompt} onChange={onChangeQues} class="form-control" id="formGroupExampleInput" placeholder="Enter Question Prompt"/>
                                    </div>
                        
                                    <div style={{paddingTop:27, borderColor: "orange"}} class="card border-warning mb-3" style= {{  width:300}}>
                                        <div style = {{backgroundColor: "#282828", color:"lightgrey"}}class="card-header"> Enter Correct Word </div>
                                        <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" name="correctAnswer" value={ques.correctAnswer} onChange={onChangeQues}  placeholder="Enter Answer"/>
                                    </div> 
                                </div>
                            </div> 
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
           </Accordion> 
    
        );
    }
    else if(question.questype =="MCQ")
    {
     return (
        <Accordion defaultActiveKey="1">
           <Card>
                <Card.Header style = {{backgroundColor: "#545454"}}>
                    <span>
                        <Accordion.Toggle style={{color:"orange"}} as={Button} variant="link" eventKey="0"> Question {question.id}</Accordion.Toggle> 
                        <button style= {{backgroundColor: "#ffa343", float: 'right' }} onClick={(e) => onDelete(question.id,question.questype)} class="btn btn-primary" type="button">Delete</button>
                        <button style= {{backgroundColor: "white", float: 'right', color: "orange" }} onClick={(e) => onSave(question.id,ques)} class="btn btn-primary" type="button"><b> Save </b></button>
                    </span>     
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body style={{backgroundColor: "#404040"}}> 
                        <div>
                            <div style= {{paddingLeft: 20}}>
                                <div style= {{paddingBottom: 40 }}>
                                    <label style= {{color: "lightgrey"}} for="formGroupExampleInput">Enter Question Prompt:</label>
                                    <input style= {{ backgroundColor: "#838383", width:900}} type="text" name="questionPrompt" value={ques.questionPrompt} onChange={onChangeQues} class="form-control" id="formGroupExampleInput" placeholder="Enter Question Prompt"/>
                                </div>
                    
                                <div style={{paddingTop:27, borderColor: "orange"}} class="card border-warning mb-3" style= {{  width:300}}>
                                    <div style = {{backgroundColor: "#282828", color:"lightgrey"}}class="card-header"> Options </div>
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" name="choice1" value={ques.choice1} onChange={onChangeQues} placeholder="Enter Option 1"/>
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" name="choice2" value={ques.choice2} onChange={onChangeQues} placeholder="Enter Option 2"/>
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" name="choice3" value={ques.choice3} onChange={onChangeQues} placeholder="Enter Option 3"/>
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" name="choice4" value={ques.choice4} onChange={onChangeQues} placeholder="Enter Option 4"/>
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
    else if(question.questype =="MTP")
    {
        return (
            <Accordion defaultActiveKey="1">
               <Card>
                    <Card.Header style = {{backgroundColor: "#545454"}}>
                        <span>
                            <Accordion.Toggle style={{color:"orange"}} as={Button} variant="link" eventKey="0"> Question {question.id}</Accordion.Toggle> 
                            <button style= {{backgroundColor: "#ffa343", float: 'right' }} onClick={(e) => onDelete(question.id,question.questype)} class="btn btn-primary" type="button">Delete</button>
                            <button style= {{backgroundColor: "white", float: 'right', color: "orange" }} onClick={(e) => onSave(question.id,ques)} class="btn btn-primary" type="button"><b> Save </b></button>
                        </span>     
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{backgroundColor: "#404040"}}> 
                            <div>
                                <div style= {{paddingLeft: 20}}>
                                    <div style= {{paddingBottom: 40 }}>
                                        <label style= {{color: "lightgrey"}} for="formGroupExampleInput">Enter Question Prompt:</label>
                                        <input style= {{ backgroundColor: "#838383", width:900}} type="text" name="questionPrompt" value={ques.questionPrompt} onChange={onChangeQues} class="form-control" id="formGroupExampleInput" placeholder="Enter Question Prompt"/>
                                    </div>
                        
                                    <div style={{paddingTop:27, borderColor: "orange"}} class="card border-warning mb-3" style= {{  width:1100}}>
                                        <div style = {{backgroundColor: "#282828", color:"lightgrey"}}class="card-header"> Image Options </div>
                                        <Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                <input type="file" onChange={handleNewImage} />
                                                <Button variant='light' onClick={uploadNewImage} >Upload Image 1</Button>
                                                <input style = {{backgroundColor: "#939393", width: 200}} type="text" id="typeText" class="form-control" name="choice1" value={ques.choice1} onChange={onChangeQues} placeholder="Enter Option 1"/>
                                    
                                             </Card.Body>
                                         </Card>
                                        <Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                <input type="file" onChange={handleNewImage} />
                                                <Button variant='light' onClick={uploadNewImage} >Upload Image 2</Button>
                                                <input style = {{backgroundColor: "#939393", width: 200}} type="text" id="typeText" class="form-control" name="choice2" value={ques.choice2} onChange={onChangeQues} placeholder="Enter Option 1"/>
                                             </Card.Body>
                                        </Card>
                            <           Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                <input type="file" onChange={handleNewImage} />
                                                <Button variant='light' onClick={uploadNewImage} >Upload Image 3</Button>
                                                <input style = {{backgroundColor: "#939393", width: 200}} type="text" id="typeText" class="form-control" name="choice3" value={ques.choice3} onChange={onChangeQues} placeholder="Enter Option 1"/>
                                            </Card.Body>
                                         </Card>
                                         <Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                 <input type="file" onChange={handleNewImage} />
                                                <Button variant='light' onClick={uploadNewImage} >Upload Image 4</Button>
                                                <input style = {{backgroundColor: "#939393", width: 200}} type="text" id="typeText" class="form-control" name="choice4" value={ques.choice4} onChange={onChangeQues} placeholder="Enter Option 1"/>
                                        </Card.Body>
                                        </Card>
                                    </div>
                            
                
                                </div>
                            </div> 
                        </Card.Body>
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
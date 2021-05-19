import React, { useState, useEffect } 	from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { uploadFile } from 'react-s3';


const CreateQuestion = ({question, index , onDelete,changeQuestion, onSave}) => {
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

    const saveit = (id, ques) => {
        if(question.questype == "MCQ")
        {
            console.log("hey")
            if(ques.correctAnswer == "1")
            {
                console.log("here")
                setQues({...ques,["correctAnswer"]:ques.choice1}); 
            }  
            else if(ques.correctAnswer == "2")
            {
                setQues({...ques,["correctAnswer"]:ques.choice2}); 
            }  
            else if(ques.correctAnswer == "3")
            {
                setQues({...ques,["correctAnswer"]:ques.choice3}); 
            }  
            else
            {
                setQues({...ques,["correctAnswer"]:ques.choice4}); 
            }  
        }
        else if(question.questype == "MTP")
        {
            ques.correctAnswer = "1234"
        }
        else if (question.questype == "Ordering")
        {
            ques.correctAnswer = "1234"
        }

        onSave(id, ques)

         


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
        var myname = e.target.name
        if (e.target.name == "image1")
        { 
            var myimage = image1   }
        else if (e.target.name == "image2")
        { var myimage = image2 }

        else if(e.target.name == "image3")
        {  var myimage = image3 }

        else
        { var myimage = image4 }
        
        await uploadFile( myimage,config)
            .then(data => fileLocation = data.location)
            .catch(err => console.error(err));

        console.log("my loc", fileLocation)

        setQues({...ques,[myname]:fileLocation});
    }

    
    if( question.questype == "Fitb")
    {
        return (
            <Accordion defaultActiveKey="1">
               <Card>
                    <Card.Header style = {{backgroundColor: "#545454"}}>
                        <span>
                            <Accordion.Toggle style={{color:"orange"}} as={Button} variant="link" eventKey="0"> Question {index + 1}</Accordion.Toggle> 
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                            <button style= {{backgroundColor: "#ffa343", float: 'right' }} onClick={(e) => onDelete(question.id)} class="btn btn-primary" type="button"> <i class="fa fa-trash"></i> Delete</button>
                            <button style= {{backgroundColor: "white", float: 'right', color: "orange" }} onClick={(e) => saveit(question.id,ques)} class="btn btn-primary" type="button"><b><i class="fa fa-save"></i> Save </b></button>
                        </span>     
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{backgroundColor: "#404040"}}> 
                            <div>
                                <div style= {{paddingLeft: 20}}>
                                    <div style= {{paddingBottom: 40 }}>
                                        <label style= {{color: "lightgrey"}} for="formGroupExampleInput">Enter Question Prompt:</label>
                                        <input style= {{ backgroundColor: "#838383", width:900}} type="text" name="questionPrompt" value={ques.questionPrompt} onChange={onChangeQues} class="form-control" id="formGroupExampleInput" />
                                    </div>
                        
                                    <div style={{paddingTop:27, borderColor: "orange"}} class="card border-warning mb-3" style= {{  width:300}}>
                                        <div style = {{backgroundColor: "#282828", color:"lightgrey"}}class="card-header"> Enter Correct Word </div>
                                        <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" name="correctAnswer" value={ques.correctAnswer} onChange={onChangeQues}  />
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
                        <Accordion.Toggle style={{color:"orange"}} as={Button} variant="link" eventKey="0"> Question {index + 1}</Accordion.Toggle> 
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                        <button style= {{backgroundColor: "#ffa343", float: 'right' }} onClick={(e) => onDelete(question.id)} class="btn btn-primary" type="button"><i class="fa fa-trash"></i> Delete</button>
                        <button style= {{backgroundColor: "white", float: 'right', color: "orange" }} onClick={(e) => saveit(question.id,ques)} class="btn btn-primary" type="button"><b><i class="fa fa-save"></i> Save </b></button>
                    </span>     
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body style={{backgroundColor: "#404040"}}> 
                        <div>
                            <div style= {{paddingLeft: 20}}>
                                <div style= {{paddingBottom: 40 }}>
                                    <label style= {{color: "lightgrey"}} for="formGroupExampleInput">Enter Question Prompt:</label>
                                    <input style= {{ backgroundColor: "#838383", width:900}} type="text" name="questionPrompt" value={ques.questionPrompt} onChange={onChangeQues} class="form-control" id="formGroupExampleInput" />
                                </div>
                    
                                <div style={{paddingTop:27, borderColor: "orange"}} class="card border-warning mb-3" style= {{  width:300}}>
                                    <div style = {{backgroundColor: "#282828", color:"lightgrey"}}class="card-header"> Options </div>
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" name="choice1" value={ques.choice1} onChange={onChangeQues} />
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" name="choice2" value={ques.choice2} onChange={onChangeQues} />
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" name="choice3" value={ques.choice3} onChange={onChangeQues} />
                                    <input style = {{backgroundColor: "#939393"}} type="text" id="typeText" class="form-control" name="choice4" value={ques.choice4} onChange={onChangeQues} />
                                </div>
                        
                                <div style ={{paddingTop: 30 }}>
                                    <fieldset class="form-group row">
                                    <legend style= {{color: "lightgrey", fontSize: 18}} class="col-form-legend col-sm-2">Choose Answer:</legend>
                                    <div class="col-sm-10">
                                        <div class="form-check">
                                            <label style= {{color: "lightgrey", fontSize: 15}} class="form-check-label">
                                            <input  onChange={(e) => setQues({...ques,["correctAnswer"]:e.currentTarget.value}) }  class="form-check-input radio-inline" type="radio" name="gridRadios" id="gridRadios1" value="1" ></input>
                                            Option one</label>
                                            <label style={{paddingLeft :60,color: "lightgrey", fontSize: 15}} class="form-check-label">
                                            <input  onChange={(e) => setQues({...ques,["correctAnswer"]:e.currentTarget.value}) }  class="form-check-input radio-inline" type="radio" name="gridRadios" id="gridRadios2" value="2"></input>
                                            Option two</label>
                                            <label style={{paddingLeft :60,color: "lightgrey", fontSize: 15}} class="form-check-label">
                                            <input onChange={(e) => setQues({...ques,["correctAnswer"]:e.currentTarget.value}) } class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="3" ></input>
                                            Option three</label>
                                            <label style={{paddingLeft :60,color: "lightgrey", fontSize: 15}} class="form-check-label">
                                            <input   onChange={(e) => setQues({...ques,["correctAnswer"]:e.currentTarget.value}) } class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="4" ></input>
                                            Option Four</label>

                                        </div>
                                        </div>  
                                    </fieldset>
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
                            <Accordion.Toggle style={{color:"orange"}} as={Button} variant="link" eventKey="0"> Question {index + 1}</Accordion.Toggle> 
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                            <button style= {{backgroundColor: "#ffa343", float: 'right' }} onClick={(e) => onDelete(question.id)} class="btn btn-primary" type="button"><i class="fa fa-trash"></i>  Delete</button>
                            
                            <button style= {{backgroundColor: "white", float: 'right', color: "orange" }} onClick={(e) => saveit(question.id,ques)} class="btn btn-primary" type="button"><b><i class="fa fa-save"></i>  Save </b></button>
                        </span>     
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{backgroundColor: "#404040"}}> 
                            <div>
                                <div style= {{paddingLeft: 20}}>
                                    <div style= {{paddingBottom: 40 }}>
                                        <label style= {{color: "lightgrey"}} for="formGroupExampleInput">Enter Question Prompt:</label>
                                        <input style= {{ backgroundColor: "#838383", width:900}} type="text" name="questionPrompt" value={ques.questionPrompt} onChange={onChangeQues} class="form-control" id="formGroupExampleInput" />
                                    </div>
                        
                                    <div style={{paddingTop:27, borderColor: "orange"}} class="card border-warning mb-3" style= {{  width:1100}}>
                                        <div style = {{backgroundColor: "#282828", color:"lightgrey"}}class="card-header"> Image Options </div>
                                        <Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                
                                                <input type="file" name="image1" onChange={handleNewImage} />
                                                <Button variant='light' name="image1" onClick={uploadNewImage} >Upload Image 1</Button>
                                                <input style = {{backgroundColor: "#939393", width: 200}} type="text" id="typeText" class="form-control" name="choice1" value={ques.choice1} onChange={onChangeQues} />
                                    
                                             </Card.Body>
                                         </Card>
                                        <Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                <input class= "inline-block" type="file" name="image2" onChange={handleNewImage} />
                                                <Button class= "inline-block" variant='light' name="image2" onClick={uploadNewImage} >Upload Image 2</Button>
                                                <input class= "inline-block" style = {{backgroundColor: "#939393", width: 200, }} type="text" id="typeText" class="form-control" name="choice2" value={ques.choice2} onChange={onChangeQues} />
                                             </Card.Body>
                                        </Card>
                            <           Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                <input type="file" name="image3" onChange={handleNewImage} />
                                                <Button variant='light' name="image3" onClick={uploadNewImage} >Upload Image 3</Button>
                                                <input style = {{backgroundColor: "#939393", width: 200}} type="text" id="typeText" class="form-control" name="choice3" value={ques.choice3} onChange={onChangeQues} />
                                            </Card.Body>
                                         </Card>
                                         <Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                 <input type="file" name="image4" onChange={handleNewImage} />
                                                <Button variant='light' name="image4"  onClick={uploadNewImage} >Upload Image 4</Button>
                                                <input style = {{backgroundColor: "#939393", width: 200}} type="text" id="typeText" class="form-control" name="choice4" value={ques.choice4} onChange={onChangeQues} />
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
                        <span>
                            <Accordion.Toggle style={{color:"orange"}} as={Button} variant="link" eventKey="0"> Question {index + 1}</Accordion.Toggle> 
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                            <button style= {{backgroundColor: "#ffa343", float: 'right' }} onClick={(e) => onDelete(question.id)} class="btn btn-primary" type="button"><i class="fa fa-trash"></i>  Delete</button>
                            
                            <button style= {{backgroundColor: "white", float: 'right', color: "orange" }} onClick={(e) => saveit(question.id,ques)} class="btn btn-primary" type="button"><b><i class="fa fa-save"></i>  Save </b></button>
                        </span>     
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{backgroundColor: "#404040"}}> 
                            <div>
                                <div style= {{paddingLeft: 20}}>
                                    <div style= {{paddingBottom: 40 }}>
                                        <label style= {{color: "lightgrey"}} for="formGroupExampleInput">Enter Question Prompt:</label>
                                        <input style= {{ backgroundColor: "#838383", width:900}} type="text" name="questionPrompt" value={ques.questionPrompt} onChange={onChangeQues} class="form-control" id="formGroupExampleInput" />
                                    </div>
                        
                                    <div style={{paddingTop:27, borderColor: "orange"}} class="card border-warning mb-3" style= {{  width:1100}}>
                                        <div style = {{backgroundColor: "#282828", color:"lightgrey"}}class="card-header"> Image Options </div>
                                        <Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                
                                                <input type="file" name="image1" onChange={handleNewImage} />
                                                <Button variant='light' name="image1" onClick={uploadNewImage} >Upload Image 1</Button>
                                                <input style = {{backgroundColor: "#939393", width: 200}} type="text" id="typeText" class="form-control" name="choice1" value={ques.choice1} onChange={onChangeQues} />
                                    
                                             </Card.Body>
                                         </Card>
                                        <Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                <input class= "inline-block" type="file" name="image2" onChange={handleNewImage} />
                                                <Button class= "inline-block" variant='light' name="image2" onClick={uploadNewImage} >Upload Image 2</Button>
                                                <input class= "inline-block" style = {{backgroundColor: "#939393", width: 200, }} type="text" id="typeText" class="form-control" name="choice2" value={ques.choice2} onChange={onChangeQues} />
                                             </Card.Body>
                                        </Card>
                            <           Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                <input type="file" name="image3" onChange={handleNewImage} />
                                                <Button variant='light' name="image3" onClick={uploadNewImage} >Upload Image 3</Button>
                                                <input style = {{backgroundColor: "#939393", width: 200}} type="text" id="typeText" class="form-control" name="choice3" value={ques.choice3} onChange={onChangeQues} />
                                            </Card.Body>
                                         </Card>
                                         <Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                            <Card.Body style={{backgroundColor: "#585858"}}>
                                                 <input type="file" name="image4" onChange={handleNewImage} />
                                                <Button variant='light' name="image4"  onClick={uploadNewImage} >Upload Image 4</Button>
                                                <input style = {{backgroundColor: "#939393", width: 200}} type="text" id="typeText" class="form-control" name="choice4" value={ques.choice4} onChange={onChangeQues} />
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
};

export default CreateQuestion;
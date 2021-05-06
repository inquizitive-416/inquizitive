import React, { useState, useEffect } 	from 'react';
import NavbarTop					from '../navbar/NavbarTop';
import AddQuestion					from './AddQuestion';
import QuestionList                 from './QuestionList'
import {ADDQUIZ} from "./cache/mutation"
import { graphql,useMutation } from '@apollo/client';
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from "react-router-dom"
import { uploadFile } from 'react-s3';

import { Card, Button, Form, Col, Row } from 'react-bootstrap'



import './createscreen.css'
import { AddArgumentsAsVariables } from 'graphql-tools';
const CreateScreen = (props) => {

    const [questions , setQuestions] = useState([])
    const [showAdd , setShowAdd] = useState(false)
    const [gotoexplore, setgoto]= useState(false)
    const [allQuestions, setallQuestions] = useState([])
    const [image, setImage] = useState({});
    const [quizInfo,setQuizInfo] = useState(
        {
            idOfCreator: "",
            title: "",
            description: "",
            coverimage:"",
            categories: "",
            hashtagone : "",
            hashtagtwo: "",
            hashtagthree: "",
            difficulty: "",
            quizposted: false,
            timer: 0,
            questions: [],
            ratings: 0,
            avgRating: 0,
            numOfTimesPlayed:0,
            isReported: false

        }
    )
    const [addQuiz]=useMutation(ADDQUIZ)

    const handleNewImage = (e) => {
        
        var newImage = e.target.files[0];
        var myname = newImage.name
        console.log(myname)
        var renamedImage = new File([newImage], myname, {type: newImage.type});
        console.log(renamedImage)

        setImage(renamedImage);
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
        
        await uploadFile(image, config)
            .then(data => fileLocation = data.location)
            .catch(err => console.error(err));

        console.log("my loc", fileLocation)

        setQuizInfo({...quizInfo, coverimage: fileLocation});

        //await updateUserField({ variables: { _id: props.user._id, field: 'profilePicture', value: fileLocation}});
    }


    const renderRedirect = () => {
        if (gotoexplore) {
          return <Redirect to='/explore' />
        }
      }

    const onChange =(e)=>{
        setQuizInfo({...quizInfo,[e.target.name]:e.target.value});    
    }

    const onSave=( id, newques)=>{
        console.log("saving", id)
        //setallQuestions( allQuestions.map(ques => ques.id == id  ? newques  : ques ))
       // setQuizInfo({...quizInfo, questions: allQuestions});
       setQuizInfo({...quizInfo, questions: quizInfo.questions.map(ques => ques.id === id  ? newques  : ques )});

        console.log("Saved questions", allQuestions)
     }
    
    const onChan =()=>{
        //console.log("my mcq quest" , mcqQuestions)
        //console.log("my fitb quest", fitbQuestions) 
    }
     const onDelete =(id, questype)=> { 
           
        setQuestions(questions.filter( ques => ques.id !== id))
        //console.log("new ques", questions)

            setallQuestions(allQuestions.filter( ques => ques.id !== id))
     }

     const changeQuestion=(questype, id, newques)=>{

              setQuizInfo({...quizInfo, questions: questions.map(ques => ques.id === id  ? newques  : ques )});
              //setallQuestions( allQuestions.map(ques => ques.id === id  ? newques  : ques ))
    
         }

     const addQues = (questype)=>{
        
         const id = Math.floor(Math.random() * 10000) + 1
         const newQuestion = {id, questype }

         console.log("type is" , questype)
         setQuestions([...questions, newQuestion])
         
             const newques = {id: id, questype: questype, questionPrompt: "",choice1: "", choice2: "", choice3: "", choice4: "", correctAnswer: "" }
            
             //setallQuestions([...allQuestions, newques]) 
             //var myarr = quizInfo.questions
            // const newarr = myarr.push(newques)
             setQuizInfo({...quizInfo, questions: [...quizInfo.questions,newques]});
             console.log("quess", quizInfo.questions)
     }

     const onSubmit= async(e)=>{
        e.preventDefault();
        
        //setQuizInfo({...quizInfo, questions: allQuestions});
        //console.log(" here questions", allQuestions)
       
        const { error, data } = await addQuiz({ variables: { ...quizInfo } });
        // if (loading) { toggleLoading(true) };
        if (error) { return `Error: ${error.message}` };
        if(data){
            console.log(data);
        }
        setgoto(true)
    }

    const onAdd = ()=>
    {
        setShowAdd(!showAdd)
    }


	return (
        <div>
		<NavbarTop fetchUser={props.fetchUser}/>
            <div  className ="create"  style={{overflow:"scroll"}}>
                <div style={{backgroundColor: "#484848", height: 50, paddingBottom: 90, textAlign: "center"}} >
            
                    <header style= {{paddingTop:25, fontSize: 35, color:"#FFA500" }}> Create New Quiz  </header>
                </div>
                <form>
                    <div style= {{paddingLeft: 220, paddingTop: 20}}class="form-group">
                         <label for="formGroupExampleInput"><b>Enter Quiz Name </b></label>
                         <input style= {{ backgroundColor: "#838383", width:900}} type="text" class="form-control" required = "true" value={quizInfo.title} name="title" onChange={onChange} id="formGroupExampleInput" placeholder="Add Quiz Name" />
                    </div>

                    <div style= {{paddingLeft: 220}} class="form-group">
                         <label for="exampleFormControlTextarea1"><b>Enter Description </b></label>
                         <textarea  style= {{ backgroundColor: "#838383", width:900}} class="form-control" value={quizInfo.description} name="description" onChange={onChange} id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div  style= {{paddingLeft: 220}} class="form-group">
                    
                        <label for="exampleFormControlTextarea1"><b>Enter cover image </b></label>
                        <Row>
                    
                        <Col xs="9">
                            <Card style={{backgroundColor: "#505050"}} className="bg-secondary text-white text-center">
                                <Card.Body style={{backgroundColor: "#585858"}}>
                                    <input type="file" onChange={handleNewImage} />
                                    <Button variant='light' onClick={uploadNewImage} >Upload a New Photo</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    
                    </Row>
                    </div>

                    <div style= {{paddingLeft: 220, width:1127}} class="input-group mb-3">
                        <select style= {{ backgroundColor: "#838383", width:1200}} name="categories" onChange={onChange} class="custom-select" id="inputGroupSelect02">
                            <option  selected>Choose categories</option>
                            <option value="Geography">Geography</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="World Maps">World Maps</option>
                            <option value="Movies">Movies</option>
                            <option value="Languages">Languages</option>
                            <option value="Cartoons">Cartoons</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Physics">Physics</option>
                            <option value="Biology">Biology</option>
                        </select>
                    </div>

                    <div style= {{paddingLeft: 220}}class="form-group">
                        <label for="formGroupExampleInput"><b>Enter Hashtags: </b></label>
                        <input style= {{backgroundColor: "#838383", width:910}}  value ={quizInfo.hashtagone} onChange= {onChange} name="hashtagone" type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 1"/>
                        <input style= {{ backgroundColor: "#838383", width:910}} value ={quizInfo.hashtagtwo} onChange= {onChange} name="hashtagtwo" type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 2"/>
                        <input style= {{ backgroundColor: "#838383", width:910}} value ={quizInfo.hashtagthree} onChange= {onChange} name="hashtagthree" type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 3"/>
                     </div>

                    <div style= {{paddingLeft: 220, width:1128}} class="input-group mb-3">
                       <label for="formGroupExampleInput"><b>Enter Difficulty: </b></label>
                        <select style= {{ backgroundColor: "#838383", width:900}} name="difficulty" onChange={onChange} class="custom-select" id="inputGroupSelect03">
                            <option  selected>Choose Difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <QuestionList questions= {questions} onDelete = {onDelete} changeQuestion={changeQuestion} onSave= {onSave}/>
               <div style={{paddingLeft: 40}}class="d-grid gap-2 col-6 mx-auto">
                  <button style= {{backgroundColor: "#ffa343"}}  onClick={onAdd} class="btn btn-primary" type="button">Add New Question</button>
                  {showAdd && <AddQuestion  addQues ={addQues} onAdd = {onAdd}/>}
               </div>
               <div style={{paddingLeft:400}}>
               {renderRedirect()}
               <button style= {{backgroundColor: "orange"}} onClick = {onSubmit} class= "btn btn-primary" >Submit quiz</button>

               </div>
              
               
              
              
               </form>
              
               
        </div>
        </div>
	);
};

export default CreateScreen;
//{showAdd && <AddQuestion  addQues ={addQues}/>}
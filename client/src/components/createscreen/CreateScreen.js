import React, { useState, useEffect } 	from 'react';
import { useQuery } from '@apollo/client';
import NavbarTop					from '../navbar/NavbarTop';
import AddQuestion					from './AddQuestion';
import QuestionList                 from './QuestionList'
import {ADDQUIZ, UPDATE_QUIZ, DELETE_QUIZ} from "./cache/mutation"

import { graphql,useMutation } from '@apollo/client';
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from "react-router-dom"
import { uploadFile } from 'react-s3'
import { getCurrentUser } from "../../data/LocalStorage"
import Toast from 'react-bootstrap/Toast'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { GET_CURRENT_USER } from '../settingsscreen/queries'
import SubmitModal from "./SubmitModal";
import TimeBar	from '../TimerBar/TimerBar'
import RatingBar	from '../RatingBar/RatingBar'
import { Card, Button, Form, Col, Row } from 'react-bootstrap'
import {GET_QUIZ} from './queries';


import './createscreen.css'
import { AddArgumentsAsVariables } from 'graphql-tools';
import TimerBar from '../TimerBar/TimerBar';
import { isValidES3Identifier } from '@babel/types';
const CreateScreenSub = (props) => {

    let update = false
    let quizhours = 0
    let quizminutes = 0
    let isempty = Object.keys(props.quiz).length === 0
    let clonedques=[]
    const [upd, setUpd] = useState(true)
    if(!isempty )
    {   console.log(props.quiz.timer)
        quizhours = Math.floor(props.quiz.timer/3600);
        quizminutes =  (props.quiz.timer % 3600) /60

        let my_questions = props.quiz.questions
        console.log("my questions",my_questions)
        let i = 0;
        
        if (my_questions != null)
        {
            for(i=0;i< my_questions.length;i++)
        {
            let clone = Object.assign({}, my_questions[i]);
            delete clone.__typename
    
            console.log("clone",clone)
            clonedques.push(clone)
    
        }

        }
        
       
        
    }
    
    const [questions , setQuestions] = useState([])
    const [hours , setHours] = useState(0)
    const [minutes , setMinutes] = useState(0)
    const [submodalShow, setSubmodalShow] = useState(false);
    const [showques , setshowques] = useState(true)
    const [showAdd , setShowAdd] = useState(false)
    const [gotoexplore, setgoto]= useState(false)
    const [allQuestions, setallQuestions] = useState([])
    const [image, setImage] = useState({});
    const [quizInfo,setQuizInfo] = useState(
        {
            idOfCreator: props.user._id,
            title: isempty ? "" : props.quiz.title,
            description: isempty ? "" : props.quiz.description,
            coverimage: isempty ? "" : props.quiz.coverimage,
            categories: isempty ? "" : props.quiz.categories ,
            hashtagone : isempty ? "" : props.quiz.hashtagone,
            hashtagtwo: isempty ? "" : props.quiz.hashtagtwo,
            hashtagthree: isempty ? "" : props.quiz.hashtagthree,
            difficulty: isempty ? "" : props.quiz.difficulty,
            quizposted: isempty ? true : props.quiz.quizposted,
            timer: isempty ? 0 : props.quiz.timer,
            questions: isempty ? [] : clonedques,
            ratings: isempty ? 0 : props.quiz.ratings,
            avgRating: isempty ? 0 : props.quiz.avgRating,
            numOfTimesPlayed: isempty ? 0 : props.quiz.numOfTimesPlayed,
            isReported: isempty ? false : props.quiz.isReported

        }
    )

     console.log("initial ques", quizInfo.questions)

    
   

    const [addQuiz]= useMutation(ADDQUIZ)
    const [UpdateQuiz]= useMutation(UPDATE_QUIZ)
    const [deleteQuiz]= useMutation(DELETE_QUIZ)
    const subModal=()=>{
        
        setSubmodalShow(!submodalShow);
    }
      
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
        console.log("go to ")
        if (gotoexplore || update) {

            if(upd)
            {
                return <Redirect to='../explore' />
            }
            else
            {
                const PlatformLink = "/platform/" + props.user._id;
                return <Redirect to={PlatformLink} />

            }
          
        }
      }

    const onChange =(e)=>{
        setQuizInfo({...quizInfo,[e.target.name]:e.target.value});  
        
        console.log(quizInfo)
    }

    const onChangeHours =(e)=>{
        setHours(e.target.value ) 
        var tme = (parseInt(e.target.value) * 3600) + (parseInt(minutes) * 60)
        setQuizInfo({...quizInfo,["timer"]: tme}); 
          
    }
    const onChangeMinutes =(e)=>{
        setMinutes(e.target.value) 
        var tme = (parseInt(e.target.value) * 60) + (parseInt(hours) * 3600)
        setQuizInfo({...quizInfo,["timer"]: tme}); 
        //setTiming();
    }

    const onSave=( id, newques)=>{
        console.log("saving", id)
        //setallQuestions( allQuestions.map(ques => ques.id == id  ? newques  : ques ))
       // setQuizInfo({...quizInfo, questions: allQuestions});
       setQuizInfo({...quizInfo, questions: quizInfo.questions.map(ques => ques.id === id  ? newques  : ques )});

        console.log("Saved questions", allQuestions)
     }
    
    
     const onDelete =(id)=> { 
           
        //setQuestions(questions.filter( ques => ques.id !== id))

        setQuizInfo({...quizInfo, questions: quizInfo.questions.filter(ques => ques.id !== id )});

        if((quizInfo.questions.length - 1) == 0)
        {
            
            setshowques(true)
        }
        
     }

     const changeQuestion=(questype, id, newques)=>{

              setQuizInfo({...quizInfo, questions: questions.map(ques => ques.id === id  ? newques  : ques )});
         }

     const addQues = (questype)=>{

        setshowques(false)
        
         const id = Math.floor(Math.random() * 10000) + 1
         //const newQuestion = {id, questype }

         console.log("type is" , questype)
         //setQuestions([...questions, newQuestion])
         
             const newques = {id: id, questype: questype, questionPrompt: "",choice1: "", choice2: "", choice3: "", choice4: "",image1: "", image2: "", image3: "", image4: "" ,correctAnswer: "" }
             setQuizInfo({...quizInfo, questions: [...quizInfo.questions,newques]});
             console.log("quess", quizInfo.questions)
     }

     const onCheckValid = () =>
     {
        if (quizInfo.title === "" || quizInfo.title === "" || quizInfo.coverimage === "" || quizInfo.categories === "" || quizInfo.hashtagone === "" || quizInfo.hashtagtwo === "" || quizInfo.hashtagthree === "" || quizInfo.difficulty === "" || quizInfo.timer === 0 || quizInfo.questions.length == 0  )
        {
            console.log(quizInfo.title === "")
            console.log(quizInfo.description === "")
            console.log(quizInfo.coverimage === "")
            console.log(quizInfo.categories === "")
            console.log(quizInfo.title === "")
            console.log(quizInfo.hashtagone === "")
            console.log(quizInfo.hashtagtwo === "")
            console.log(quizInfo.hashtagthree === "")
            console.log(quizInfo.difficulty === "")
            console.log(quizInfo.timer === 0)
            console.log(quizInfo.questions.length === 0)

            
            return true

        }
        else
        {
            setQuizInfo({...quizInfo, quizposted: true});
            return false

        }
     }

     const setTiming = () =>
     {
         var tme = (parseInt(hours) * 3600) + (parseInt( minutes) * 60)
         console.log(tme)

         setQuizInfo({...quizInfo, ["timer"]: tme});
         console.log(quizInfo.timer)

     }

     const onUpdate= async(e)=>{
        e.preventDefault();
        console.log("my info", quizInfo)
        
        
        if (onCheckValid() == true)
        {
            console.log(quizInfo)
            setSubmodalShow(true)
        }
        else
        {

        const { data } = await UpdateQuiz({
            variables: {
                _id: props.quiz._id,
                idOfCreator: props.quiz.idOfCreator,
                title: quizInfo.title,
                description: quizInfo.description,
                coverimage: quizInfo.coverimage,
                categories: quizInfo.categories ,
                hashtagone : quizInfo.hashtagone,
                hashtagtwo: quizInfo.hashtagtwo,
                hashtagthree: quizInfo.hashtagthree,
                difficulty: quizInfo.difficulty,
                quizposted: props.quiz.quizposted,
                timer: quizInfo.timer,
                questions: quizInfo.questions,
                ratings: quizInfo.ratings,
                avgRating: quizInfo.avgRating,
                numOfTimesPlayed: quizInfo.numOfTimesPlayed,
                isReported: quizInfo.isReported
            }
        })
        if (data && data.UpdateQuiz) 
        {
            console.log("Updated successfully");
            //return <Redirect to='/explore' />
        }
        else console.log("Error in updating");  
        setUpd(false)
        setgoto(true)
    }
        //renderRedirect()
     }

     const onSubmit= async(e)=>{
  
        //setTiming();
        e.preventDefault();
        console.log("in submit")
        setQuizInfo({...quizInfo, ["quizposted"]: true});

        
        
        setQuizInfo({...quizInfo, questions: allQuestions});
        console.log(" here questions", allQuestions)
        if (onCheckValid() == true)
        {
            setSubmodalShow(true)
        }
        else
        {
        const { error, data } = await addQuiz({ variables: { ...quizInfo } });
        // if (loading) { toggleLoading(true) };
        if (error) { return `Error: ${error.message}` };
        if(data){
            console.log(data);
        }


        setgoto(true)
    }
    }

    const onAdd = ()=>
    {
        setShowAdd(!showAdd)
    }

    const deleteMyQuiz= ()=>
    {
        deleteQuiz({ variables: { _id: props.quiz._id } });
        setgoto(true)
        setUpd(true)
    }
    

	return (
        <div>
       
		<NavbarTop fetchUser={props.fetchUser}/>
            <div  className ="create"  style={{overflow:"scroll", position: "absolute"}}>
                <div style={{backgroundColor: "#484848", height: 50, paddingBottom: 90, textAlign: "center"}} >
                    
                        <div style={{display:"inline"}}>
                        <header style= {{paddingTop:25, fontSize: 35, color:"#FFA500" }}> {isempty ? "Create New Quiz": "Edit Quiz"}  </header>
                        </div>
                    
                </div>

                <RatingBar/>
                
                <form>
               
                    <div style= {{paddingLeft: 220, paddingTop: 20}}class="form-group">
                         <label for="formGroupExampleInput"><b>Enter Quiz Name </b></label>
                         <input style= {{ backgroundColor: "#838383", width:900 }}  type="text" class="form-control" required = "true" value={quizInfo.title} name="title" onChange={onChange} id="formGroupExampleInput"  />
                    </div>

                    <div style= {{paddingLeft: 220}} class="form-group">
                         <label for="exampleFormControlTextarea1"><b>Enter Description </b></label>
                         <textarea  style= {{ backgroundColor: "#838383", width:900}} class="form-control" value={quizInfo.description} name="description" onChange={onChange} id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div  style= {{paddingLeft: 220}} class="form-group">
                    
                        <label for="exampleFormControlTextarea1"><b>{isempty? "Enter": "Change"} cover image </b></label>
                        <Row>
                    
                        <Col xs="9">
                            <Card style = {{backgroundColor: "#505050"}}  className="bg-secondary text-white text-center">
                                <Card.Body style = {{backgroundColor: "#585858"}}>
                                    <input type="file"  onChange={handleNewImage} />
                                    <Button variant='light' onClick={uploadNewImage} >Upload a New Photo</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    
                    </Row>
                    </div>

                    <div style = {{paddingLeft: 220, paddingBottom:20}}>

                    
                    <select style= {{ paddingLeft: 100,backgroundColor: "#838383", width:455}} name="hours" onChange={onChangeHours} class="custom-select" id="inputGroupSelect02">
                            <option  selected> {isempty ? "Select Hours": quizhours + " hours"}</option>
                            <option value= "0" >0 hours</option>
                            <option value="1">1 hour</option>
                            <option value="2">2 hours</option>
                            <option value="3">3 hours</option>
                            <option value="4">4 hours</option>
                            <option value="5">5 hours</option>
                            <option value="6">6 hours</option>
                            <option value="7">7 hours</option>
                            <option value="8">8 hours</option>
                            <option value="9">9 hours</option>
                            <option value="10">10 hours</option>
                            <option value="11">11 hours</option>
                    </select>

                    <select style= {{ backgroundColor: "#838383", width:455, paddingLeft: 10}} name="minutes" onChange={onChangeMinutes} class="custom-select" id="inputGroupSelect02">
                            <option  selected>{isempty ? "Select Minutes": quizminutes + " minutes"}</option>
                            <option value = "0" > 0 minutes</option>
                            <option value= "5" > 5 minutes</option>
                            <option value="10">10 minutes</option>
                            <option value="15">15 minutes</option>
                            <option value="20">20 minutes</option>
                            <option value="25">25 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="35">35 minutes</option>
                            <option value="40">40 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="50">50 minutes</option>
                            <option value="55">55 minutes</option>
                            <option value="60">60 minutes</option>
                    </select>
                    </div>

                    <div style= {{paddingLeft: 220, width:1127}} class="input-group mb-3">
                        
                        <select style= {{ backgroundColor: "#838383", width:1200}} name="categories" onChange={onChange} class="custom-select" id="inputGroupSelect02">
                            <option  selected> {isempty ? "Choose Categories": quizInfo.categories}</option>
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
                            <option value="Art">Art</option>
                            <option value="Astronomy">Astronomy</option>
                            <option value="Mythology">Mythology</option>
                            <option value="Environment">Environment</option>
                            <option value="Technology">Technology</option>
                            <option value="Literature">Literature</option>
                            <option value="Music">Music</option>

                        </select>
                    </div>

                    <div style= {{paddingLeft: 220}}class="form-group">
                        <label for="formGroupExampleInput"><b>Enter Hashtags: </b></label>
                        <input style= {{backgroundColor: "#838383", width:910}}  value ={quizInfo.hashtagone} onChange= {onChange} name="hashtagone" type="text" class="form-control" id="formGroupExampleInput" />
                        <input style= {{ backgroundColor: "#838383", width:910}} value ={quizInfo.hashtagtwo} onChange= {onChange} name="hashtagtwo" type="text" class="form-control" id="formGroupExampleInput" />
                        <input style= {{ backgroundColor: "#838383", width:910}} value ={quizInfo.hashtagthree} onChange= {onChange} name="hashtagthree" type="text" class="form-control" id="formGroupExampleInput" />
                     </div>

                    <div style= {{paddingLeft: 220, width:1128}} class="input-group mb-3">
                       <label for="formGroupExampleInput"><b>Enter Difficulty: </b></label>
                        <select style= {{ backgroundColor: "#838383", width:900}} name="difficulty" onChange={onChange} class="custom-select" id="inputGroupSelect03">
                            <option  selected>{ isempty ? "Choose Difficulty" : quizInfo.difficulty}</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    {showques && <label style={{paddingLeft: 250, paddingTop: 17}}> <b>No Questions to Display</b> </label>}
                  <QuestionList questions= {upd ? quizInfo.questions : []} isempty = {isempty} onDelete = {onDelete} changeQuestion={changeQuestion} onSave= {onSave}/> 
               <div style={{paddingLeft: 217, paddingTop: 15}}>
               <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                  <button style= {{backgroundColor: "#ffa343", width: 915}}  onClick={onAdd} class="btn btn-primary" type="button"> <i class="fa fa-plus"></i> Add   New   Question</button>
                  {showAdd && <AddQuestion  addQues ={addQues} onAdd = {onAdd}/>}
               </div>
               

               <div style={{paddingTop:40 , paddingLeft:600}}>

                <Toast show={submodalShow} onClose={subModal}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Warning</strong>
                    <small> Missing Fields</small>
                </Toast.Header>
                <Toast.Body>Fill in missing fields before creating quiz</Toast.Body>
                </Toast>

               </div>


               <div style={{ paddingBottom:30, paddingLeft:600}}>
               {renderRedirect()}
               
               <button style= {{backgroundColor: "orange"}} onClick = {isempty ? onSubmit: onUpdate} class= "btn btn-primary" >{isempty ? "Create quiz" :"Update quiz"}</button>
               <div style={{display:"inline"}}>
                        {!isempty &&  <button style= {{backgroundColor: "orange"}} onClick = {deleteMyQuiz} class= "btn btn-primary" >Delete Quiz</button>}
                        </div>

                       
               </div>

               

               </form>
              
               
        </div>
        </div>
	);
};

const CreateScreenIt = (props) => {

    
    let quiz={}
    
    const { data, error, loading} = useQuery(GET_QUIZ, {
        variables: {_id: props.quizId}
    })
    if (loading) { return <div></div>; }
    if(error) { console.log(error);
        quiz = {} }
	if(data) { 
        // console.log(data.getQuizById.questions)
        quiz=(data.getQuizById)  
    
    console.log(quiz)
    }

	return (
        
        <div style={{minHeight:"100vh"}} >
        <CreateScreenSub user={props.user}  quiz = {quiz} /> */
        </div>
        
            
	);
};

const CreateScreen = (props) => {

    let quizId = props.match.params.id;
    let currentUser = 'base'
    const { loading, error, data} = useQuery(GET_CURRENT_USER, {
        variables: {_id: getCurrentUser()._id}
    })
    if (loading) { return <div></div>; }
    if(error) { console.log(error);
        return <div>Internal Error</div>; }
	if(data) { currentUser = data.getUserById }
   
	return (
        
        <div style={{minHeight:"100vh"}} >
        <CreateScreenIt user={currentUser} quizId = {quizId}/>
        </div>
        
            
	);
};

export default CreateScreen;

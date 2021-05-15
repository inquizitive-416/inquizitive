import React, { useState, useEffect } 	from 'react';
import { useQuery } from '@apollo/client';
import NavbarTop					from '../navbar/NavbarTop';
import AddQuestion					from './AddQuestion';
import QuestionList                 from './QuestionList'
import {ADDQUIZ} from "./cache/mutation"
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
import { Card, Button, Form, Col, Row } from 'react-bootstrap'



import './createscreen.css'
import { AddArgumentsAsVariables } from 'graphql-tools';
import TimerBar from '../TimerBar/TimerBar';
const CreateScreenSub = (props) => {

    
    const [questions , setQuestions] = useState([])
    const [submodalShow, setSubmodalShow] = useState(false);
    const [showques , setshowques] = useState(true)
    const [showAdd , setShowAdd] = useState(false)
    const [gotoexplore, setgoto]= useState(false)
    const [allQuestions, setallQuestions] = useState([])
    const [image, setImage] = useState({});
    const [quizInfo,setQuizInfo] = useState(
        {
            idOfCreator: props.user._id,
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


    const [addQuiz]= useMutation(ADDQUIZ)
     
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
    
    
     const onDelete =(id)=> { 
           
        setQuestions(questions.filter( ques => ques.id !== id))

        setQuizInfo({...quizInfo, questions: quizInfo.questions.filter(ques => ques.id !== id )});

        if((questions.length - 1) == 0)
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
         const newQuestion = {id, questype }

         console.log("type is" , questype)
         setQuestions([...questions, newQuestion])
         
             const newques = {id: id, questype: questype, questionPrompt: "",choice1: "", choice2: "", choice3: "", choice4: "",image1: "", image2: "", image3: "", image4: "" ,correctAnswer: "" }
            
             //setallQuestions([...allQuestions, newques]) 
             //var myarr = quizInfo.questions
            // const newarr = myarr.push(newques)
             setQuizInfo({...quizInfo, questions: [...quizInfo.questions,newques]});
             console.log("quess", quizInfo.questions)
     }

     const onCheckValid = () =>
     {
         if (quizInfo.title === "" || quizInfo.description === "" || quizInfo.coverimage === "" || quizInfo.categories === "")
         {
             subModal()

         }
     }

     const onSubmit= async(e)=>{
        e.preventDefault();
        
        //setQuizInfo({...quizInfo, questions: allQuestions});
        //console.log(" here questions", allQuestions)
        if (quizInfo.title === "" || quizInfo.description === "" || quizInfo.coverimage === "" || quizInfo.categories === "")
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


	return (
        <div>
		<NavbarTop fetchUser={props.fetchUser}/>
            <div  className ="create"  style={{overflow:"scroll", position: "absolute"}}>
                <div style={{backgroundColor: "#484848", height: 50, paddingBottom: 90, textAlign: "center"}} >
            
                    <header style= {{paddingTop:25, fontSize: 35, color:"#FFA500" }}> Create New Quiz  </header>
                </div>
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
                        <input style= {{backgroundColor: "#838383", width:910}}  value ={quizInfo.hashtagone} onChange= {onChange} name="hashtagone" type="text" class="form-control" id="formGroupExampleInput" />
                        <input style= {{ backgroundColor: "#838383", width:910}} value ={quizInfo.hashtagtwo} onChange= {onChange} name="hashtagtwo" type="text" class="form-control" id="formGroupExampleInput" />
                        <input style= {{ backgroundColor: "#838383", width:910}} value ={quizInfo.hashtagthree} onChange= {onChange} name="hashtagthree" type="text" class="form-control" id="formGroupExampleInput" />
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
                    {showques && <label style={{paddingLeft: 250, paddingTop: 17}}> <b>No Questions to Display</b> </label>}
                    <QuestionList questions= {questions} onDelete = {onDelete} changeQuestion={changeQuestion} onSave= {onSave}/>
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
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Fill in missing fields before creating quiz</Toast.Body>
                </Toast>

               </div>


               <div style={{ paddingBottom:30, paddingLeft:600}}>

               {renderRedirect()}
               <button style= {{backgroundColor: "orange"}} onClick = {onSubmit} class= "btn btn-primary" >Create quiz</button>

                       
               </div>
               
               </form>
              
               
        </div>
        </div>
	);
};

const CreateScreen = (props) => {

    let currentUser = 'base'

    const { loading, error, data } = useQuery(GET_CURRENT_USER, {
        variables: {_id: getCurrentUser()._id}
    })
    if (loading) { return <div></div>; }
    if(error) { console.log(error);
        return <div>Internal Error</div>; }
	if(data) { currentUser = data.getUserById }

    //console.log(currentUser)

	return (
        
        <div style={{minHeight:"100vh"}} >
        <CreateScreenSub user={currentUser}/>
        </div>
        
            
	);
};

export default CreateScreen;

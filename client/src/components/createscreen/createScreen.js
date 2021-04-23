import React, { useState, useEffect } 	from 'react';
import NavbarTop					from '../navbar/NavbarTop';
import AddQuestion					from './AddQuestion';
import QuestionList                 from './QuestionList'
import CreateQuestion					from '../createQuestion/CreateQuestion';
import {ADDQUIZ} from "./cache/mutation"
import { graphql,useMutation } from '@apollo/client';
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from "react-router-dom"




import './createscreen.css'
import { AddArgumentsAsVariables } from 'graphql-tools';
const CreateScreen = (props) => {

    const [questions , setQuestions] = useState([])
    const [showAdd , setShowAdd] = useState(false)
    const [gotoexplore, setgoto]= useState(false)
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

   

    const renderRedirect = () => {
        if (gotoexplore) {
          return <Redirect to='/explore' />
        }
      }

    const onChange =(e)=>{
        setQuizInfo({...quizInfo,[e.target.name]:e.target.value});    
    }

    const onChan =(e)=>{
    

        console.log(quizInfo.difficulty)
        console.log(quizInfo.categories)
        console.log(quizInfo.questions)

        
    }




     const onDelete =(id)=>{
           
        setQuestions(questions.filter( ques => ques.id !== id))
        console.log("new ques", questions)
        

     }

     const addQues = (questype)=>{
        
         const id = Math.floor(Math.random() * 10000) + 1
         const newQuestion = {id, questype }
         
         //let ques = quizInfo.questions
         //console.log(ques)
         //ques.push(newQuestion)
         setQuestions([...questions, newQuestion])
        // setQuizInfo({...quizInfo,["questions"]: ques});

         //console.log("old ques", questions)
       
     }

     const onSubmit= async(e)=>{
        e.preventDefault();
        
        console.log(quizInfo);
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
                        <div class="custom-file">
                           
                            <input type="file" class="custom-file-input" id="inputGroupFile02"/>
                            <label for="exampleFormControlTextarea1"><b>Enter cover image </b></label>
                            <label style= {{ backgroundColor: "#838383", width:900}} class="custom-file-label" value={quizInfo.coverimage} name="coverimage" onChange={onChange} for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                        </div>
                    </div>

                    <div style= {{paddingLeft: 220, width:925}} class="input-group mb-3">
                        <select style= {{ backgroundColor: "#838383", width:900}} name="categories" onChange={onChange} class="custom-select" id="inputGroupSelect02">
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
                        <input style= {{backgroundColor: "#838383", width:400}}  value ={quizInfo.hashtagone} onChange= {onChange} name="hashtagone" type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 1"/>
                        <input style= {{ backgroundColor: "#838383", width:400}} value ={quizInfo.hashtagtwo} onChange= {onChange} name="hashtagtwo" type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 2"/>
                        <input style= {{ backgroundColor: "#838383", width:400}} value ={quizInfo.hashtagthree} onChange= {onChange} name="hashtagthree" type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 3"/>
                     </div>

                    <div style= {{paddingLeft: 220, width:925}} class="input-group mb-3">
                       <label for="formGroupExampleInput"><b>Enter Difficulty: </b></label>
                        <select style= {{ backgroundColor: "#838383", width:900}} name="difficulty" onChange={onChange} class="custom-select" id="inputGroupSelect03">
                            <option  selected>Choose Difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <QuestionList questions= {questions} onDelete = {onDelete}/>
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
import React, { useState, useEffect } 	from 'react';
import NavbarTop					from '../navbar/NavbarTop';
import AddQuestion					from './AddQuestion';
import QuestionList                 from './QuestionList'
import CreateQuestion					from '../createQuestion/CreateQuestion';


import './createscreen.css'
import { AddArgumentsAsVariables } from 'graphql-tools';
const CreateScreen = (props) => {

    const [questions , setQuestions] = useState([])
    const [showAdd , setShowAdd] = useState(false)

    const [quizInfo,setQuizInfo] = useState(
        {
            title: "",
            description: "",
            coverimage:"",
            username:"",
            categories: "",
            hashtags : [],
            timer: "",
            questions: [],
            quizPosted: false

        }
    )


    const onChange =(e)=>{
        setQuizInfo({...quizInfo,[e.target.name]:e.target.value});

        console.log(quizInfo.categories)

        
    }
    const changeCategory =(e)=>{
        var e = document.getElementById("nputGroupSelect02");
        var category = e.value;
        setQuizInfo({...quizInfo,["categories"]: category});
   
    }


     const onDelete =(id)=>{
           
        setQuestions(questions.filter( ques => ques.id !== id))
        console.log("new ques", questions)
        

     }

     const addQues = (questype)=>{
         //console.log("yoooooo")
         //console.log(questions)
         const id = Math.floor(Math.random() * 10000) + 1
         const newQuestion = {id, questype }
         //console.log(newQuestion)
         //questions.push(question)
         setQuestions([...questions, newQuestion])

         console.log("old ques", questions)
       
     }

    const onAdd = ()=>
    {
        setShowAdd(!showAdd)
    }


	return (
        <div>
		<NavbarTop/>
            <div  className ="create"  style={{overflow:"scroll"}}>
                <div style={{backgroundColor: "#484848", height: 50, paddingBottom: 90, textAlign: "center"}} >
            
                    <header style= {{paddingTop:25, fontSize: 35, color:"#FFA500" }}> Create New Quiz  </header>
                </div>
                <form>
                    <div style= {{paddingLeft: 17}}class="form-group">
                         <label for="formGroupExampleInput">Enter Quiz Name</label>
                         <input style= {{ backgroundColor: "#838383", width:900}} type="text" class="form-control" value={quizInfo.title} name="title" onChange={onChange} id="formGroupExampleInput" placeholder="Add Quiz Name"/>
                    </div>

                    <div style= {{paddingLeft: 17}} class="form-group">
                         <label for="exampleFormControlTextarea1">Enter Description</label>
                         <textarea  style= {{ backgroundColor: "#838383", width:900}} class="form-control" value={quizInfo.description} name="description" onChange={onChange} id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div  style= {{paddingLeft: 17}} class="form-group">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile02"/>
                            <label style= {{ backgroundColor: "#838383", width:900}} class="custom-file-label" value={quizInfo.coverimage} name="coverimage" onChange={onChange} for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                        </div>
                    </div>

                    <div style= {{paddingLeft: 17, width:925}} class="input-group mb-3">
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

                    <div style= {{paddingLeft: 17}}class="form-group">
                        <label for="formGroupExampleInput">Enter Hashtags</label>
                        <input style= {{ backgroundColor: "#838383", width:400}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 1"/>
                        <input style= {{ backgroundColor: "#838383", width:400}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 2"/>
                        <input style= {{ backgroundColor: "#838383", width:400}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 3"/>
                     </div>

                    <div style= {{paddingLeft: 17, width:925}} class="input-group mb-3">
                        <select style= {{ backgroundColor: "#838383", width:900}} class="custom-select" id="inputGroupSelect03">
                            <option  selected>Choose Difficulty</option>
                            <option value="2">Easy</option>
                            <option value="1">Medium</option>
                            <option value="2">Hard</option>
                        </select>
                    </div>
               </form>
               <QuestionList questions= {questions} onDelete = {onDelete}/>
               <div class="d-grid gap-2 col-6 mx-auto">
                  <button style= {{backgroundColor: "#ffa343", float:"right"}}  onClick={onAdd} class="btn btn-primary" type="button">Add a New Question</button>
                  
               </div>
               {showAdd && <AddQuestion  addQues ={addQues} onAdd = {onAdd}/>}
               
               
                
        </div>
        </div>
	);
};

export default CreateScreen;
//{showAdd && <AddQuestion  addQues ={addQues}/>}
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

       

     const addQues = (question)=>{
         //console.log("yoooooo")
         //console.log(questions)
         const id = Math.floor(Math.random() * 10000) + 1
         const newQuestion = {id, question }
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
                <div style={{backgroundColor: "#A9A9A9", height: 50, paddingBottom: 90, textAlign: "center"}} >
            
                    <header style= {{paddingTop:25, fontSize: 35, color:"#FFA500" }}> Create New Quiz</header>
                </div>
                <form>
                    <div style= {{paddingLeft: 17}}class="form-group">
                         <label for="formGroupExampleInput">Enter Quiz Name</label>
                         <input style= {{ backgroundColor: "#838383", width:900}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Add Quiz Name"/>
                    </div>

                    <div style= {{paddingLeft: 17}} class="form-group">
                         <label for="exampleFormControlTextarea1">Enter Description</label>
                         <textarea  style= {{ backgroundColor: "#838383", width:900}} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div  style= {{paddingLeft: 17}} class="form-group">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile02"/>
                            <label style= {{ backgroundColor: "#838383", width:900}} class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                        </div>
                    </div>

                    <div style= {{paddingLeft: 17, width:925}} class="input-group mb-3">
                        <select style= {{ backgroundColor: "#838383", width:900}} class="custom-select" id="inputGroupSelect02">
                            <option  selected>Choose categories</option>
                            <option value="1">Geography</option>
                            <option value="2">Computer Science</option>
                            <option value="3">Mathematics</option>
                            <option value="4">World Maps</option>
                            <option value="5">Movies</option>
                            <option value="6">Languages</option>
                            <option value="7">Cartoons</option>
                            <option value="8">Chemistry</option>
                            <option value="9">Physics</option>
                            <option value="10">Biology</option>
                        </select>
                    </div>

                    <div style= {{paddingLeft: 17}}class="form-group">
                        <label for="formGroupExampleInput">Enter Hashtags</label>
                        <input style= {{ backgroundColor: "#838383", width:400}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 1"/>
                        <input style= {{ backgroundColor: "#838383", width:400}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 2"/>
                        <input style= {{ backgroundColor: "#838383", width:400}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Hashtag 3"/>
                     </div>

                    <div style= {{paddingLeft: 17, width:925}} class="input-group mb-3">
                        <select style= {{ backgroundColor: "#838383", width:900}} class="custom-select" id="inputGroupSelect02">
                            <option  selected>Choose Difficulty</option>
                            <option value="2">Easy</option>
                            <option value="1">Medium</option>
                            <option value="2">Hard</option>
                        </select>
                    </div>
               </form>
               
               <div class="d-grid gap-2 col-6 mx-auto">
                  <button style= {{backgroundColor: "#ffa343"}}  onClick={onAdd} class="btn btn-primary" type="button">Add a New Question</button>
                  
               </div>
               {showAdd && <AddQuestion  addQues ={addQues} onAdd = {onAdd}/>}
               <QuestionList questions= {questions} onDelete = {onDelete}/>
               
                
        </div>
        </div>
	);
};

export default CreateScreen;
//{showAdd && <AddQuestion  addQues ={addQues}/>}
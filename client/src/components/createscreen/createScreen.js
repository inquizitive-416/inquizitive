import React, { useState, useEffect } 	from 'react';
import Navbar_ 					from '../navbar/NavbarTop';
import './createscreen.css'
import { left } from '@popperjs/core';

const createScreen = (props) => {

	return (
		
        <div class="overflow-hidden" >
            <Navbar_/>
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


            <fieldset style= {{paddingLeft: 17}} class="form-group">
                <div class="row">
                    <legend class="col-form-label col-sm-2 pt-0">Question Types</legend>
                    <div class="col-sm-10">

                     <div class="form-check">
                    <input class="form-check-input"  type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                    <label class="form-check-label" for="gridRadios1">Multiple Choice</label>  
                    </div>

            <div class="form-check">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
            <label class="form-check-label" for="gridRadios2">Fill In The Blank</label> </div>

            <div class="form-check ">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" />
            <label class="form-check-label" for="gridRadios3">Matching Question</label>
          </div>
          </div>
          </div>
          </fieldset>

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

          </form>
        </div>
	);
};

export default createScreen;
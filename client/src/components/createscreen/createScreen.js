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
                <label for="formGroupExampleInput">Example label</label>
                <input style= {{ backgroundColor: "#838383", width:900}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Add Quiz Name"/>
            </div>

            <div style= {{paddingLeft: 17}} class="form-group">
            <label for="formGroupExampleInput2">Another label</label>
            <input  style= {{  textAlign: "top",backgroundColor: "#838383",width:900,height:150}} type="text" class="form-control" id="formGroupExampleInput2" placeholder="Add Quiz Description" autoFocus/>
            </div>

            <div class="input-group mb-3">
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile02"/>
                        <label style= {{ backgroundColor: "#838383", width:900}} class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                </div>
            <div class="input-group-append">
            
            </div>
            </div>


            <fieldset class="form-group">
            <div class="row">
            <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
             <div class="col-sm-10">

            <div class="form-check">
            <input class="form-check-input"  type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
             <label class="form-check-label" for="gridRadios1">Multiple Choice</label>  </div>

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
          </form>
        </div>
	);
};

export default createScreen;
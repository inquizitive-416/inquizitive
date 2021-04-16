import React, { useState, useEffect } 	from 'react';

const AddQuestion = (props) => {
     return (
        <div style= {{paddingTop: 40}}>
            <form> 
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
                                    <label class="form-check-label" for="gridRadios2">Fill In The Blank</label> 
                                </div>

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
    

export default AddQuestion;
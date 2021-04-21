import React, { useState, useEffect } 	from 'react';

const AddQuestion = ({addQues, onAdd}) => {
    //console.log(props)

    const [questype, setQuestype] = useState('')

    const submitform =(e)=>{
        e.preventDefault()
        addQues({questype})
        onAdd()

        
    

    }

     return (
        <div style= {{paddingTop: 40}}>
            <form onSubmit={submitform}> 
                <fieldset style= {{paddingLeft: 17}} class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Question Types</legend>
                            <div class="col-sm-10">

                                <div class="form-check">
                                     <input onChange={(e) => setQuestype(e.currentTarget.value) } class="form-check-input"  type="radio" name="gridRadios" id="gridRadios1" value="MTP" checked/>
                                     <label class="form-check-label" for="gridRadios1">Multiple Choice</label>  
                                </div>

                                <div class="form-check">
                                    <input onChange={(e) => setQuestype(e.currentTarget.value)} class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="Fitb"/>
                                    <label class="form-check-label" for="gridRadios2">Fill In The Blank</label> 
                                </div>

                                <div class="form-check ">
                                    <input onChange={(e) => setQuestype(e.currentTarget.value)} class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="Matching" />
                                    <label class="form-check-label" for="gridRadios3">Matching Question</label>
                                </div>
                                <div class="form-check ">
                                    <input onChange={(e) => setQuestype(e.currentTarget.value)} class="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="Ordering" />
                                    <label class="form-check-label" for="gridRadios4">Ordering Pairs</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div style = {{paddingLeft:50}} >
                    <button style= {{backgroundColor: "orange"}} type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    

                </form>
            </div>

            
        );


    };
    

export default AddQuestion;
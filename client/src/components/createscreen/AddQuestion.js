import React, { useState, useEffect } 	from 'react';

const AddQuestion = ({addQues, onAdd}) => {
    //console.log(props)

    const [questype, setQuestype] = useState('')

   

    const submitform =(e)=>{
        e.preventDefault()
        addQues(questype)
        onAdd()
    }

     return (
        <div style= {{paddingTop: 40}}>
            <card > 
            <form onSubmit={submitform}> 
            <div style={{paddingTop:27 , borderColor: "orange", backgroundColor: "lightgrey"}} class="card border-warning mb-3" style= {{  width:350}}>
                <fieldset style= {{paddingLeft: 80, backgroundColor: "lightgrey", paddingTop: 15, paddingBottom:10}} class="form-group">
                        <div class="row">
                            
                            <div class="col-sm-10">

                                <div class="form-check">
                                     <input onChange={(e) => setQuestype(e.currentTarget.value) } class="form-check-input"  type="radio" name="gridRadios" id="gridRadios1" value="MTP" />
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
                    <div style = {{paddingLeft:120, backgroundColor: "#787878", paddingBottom: 5, paddingTop:5}} >
                        <button style= {{backgroundColor: "orange"}} type="submit" class="btn btn-primary">Add it !</button>
                    </div>
                    
                    </div>
                    
                </form>
                </card>
            </div>

            
        );


    };
    

export default AddQuestion;
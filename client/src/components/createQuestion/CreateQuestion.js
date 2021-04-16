import React, { useState, useEffect } 	from 'react';

const CreateQuestion = (props) => {
    var type = "MTP"
    if(type == "MTP")
    {
        return (
            <div>
                <div style= {{paddingLeft: 17}}>
                    <label for="formGroupExampleInput">Enter Question Prompt:</label>
                     <input style= {{ backgroundColor: "#838383", width:900}} type="text" class="form-control" id="formGroupExampleInput" placeholder="Add Quiz Name"/>
                </div>

                

            </div>

            
        );


    }
    else if(type == "FITB")
    {
        
        return (
            <div>
                <header> yo</header>
            </div>
            
        );


    }
    else if(type == "Matching")
    {


    }
	
};

export default CreateQuestion;
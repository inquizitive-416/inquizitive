import React, { useState, useEffect } from 'react';
import "./Fillintheblank.css";

const Fillintheblank = ({onChange,selected}) => {
    
    return(

        <div>
            
            <div style={{display:'flex',backgroundColor:'#4d4d4d'}} >
                <input onChange={onChange} className='textbox' placeholder={selected===""?'Enter Answer here...':selected}></input>
            </div>
            
        </div>
    );
};

export default Fillintheblank;
    
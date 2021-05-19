import React, { useState, useEffect } from 'react';
import "./Fillintheblank.css";

const Fillintheblank = ({onChange,selected}) => {
    console.log("FITB")
    console.log(selected==="");
    console.log("END")
    
    return(

        <div style={{height:"60vh"}}>
            
            <div style={{alignContent:"center",height:"60vh",width:"100vw",backgroundColor:'#4d4d4d'}} >
                <input id="inputbox" onChange={onChange} className='textbox' placeholder={selected==="" ? 'Enter Answer here...':selected} style={{height:"25vh",width:"80vw",position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}></input>
            </div>
            
        </div>
    );
};

export default Fillintheblank;
    
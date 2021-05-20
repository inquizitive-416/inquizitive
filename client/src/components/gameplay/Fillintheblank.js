import React, { useState, useEffect,Component } from 'react';
import "./Fillintheblank.css";

const Fillintheblank  = ({onChange,selected}) => {
    

    // const [anss,setAnss]=useState(selected)
    // console.log("FITB")
    //  onChange()
     console.log("selected",selected);
    // console.log("END")
    // this.setState({state:this.state})
    
    return(

        <div style={{height:"60vh"}}>
            
            <div style={{alignContent:"center",height:"60vh",width:"100vw",backgroundColor:'#4d4d4d'}} >
                <input id="inputbox" onChange={onChange} className='textbox' placeholder={selected ==="" ? 'Enter Answer here...':selected} style={{height:"25vh",width:"80vw",position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}></input>
            </div>
            
        </div>
    );
    
};

export default Fillintheblank;
    
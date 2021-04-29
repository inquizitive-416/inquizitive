import React, { useState, useEffect } from 'react';
import "./Fillintheblank.css";

const Fillintheblank = (props) => {
    return(

        <div>
            <div style={{textAlign:'center',paddingBottom:'10vh',paddingTop:'10vh',backgroundColor:'#404040'}}>
                <h1 style={{color:'white'}}>My First Quiz</h1>
            </div>
            <div class='row' style={{backgroundColor:'#424242'}}>
                <div class='col' style={{display:'flex', marginLeft:'4vh',paddingBottom:'4vh',paddingTop:'4vh'}}>
                    <h2 className='nextprev' style={{ marginRight: "auto" }}>{'<'}prev</h2>
                </div>
                <div class='col'style={{display:'flex',paddingBottom:'4vh',paddingTop:'4vh'}}>
                    <h2 style={{ margin: "auto",color:'white' }}>question</h2>
                </div>
                <div class='col' style={{display:'flex', marginRight:'4vh',paddingBottom:'4vh',paddingTop:'4vh'}}>
                    <h2 className='nextprev' style={{ marginLeft: "auto" }}>next{'>'}</h2>
                </div>
            </div>
            <div style={{display:'flex',backgroundColor:'#4d4d4d'}} >
                <input className='textbox' placeholder='Enter Answer here...'></input>
            </div>
            <div class='row' style={{backgroundColor:'#424242'}}>
                <div class='col' style={{display:'flex', marginLeft:'10vh'}}>
                    <button  style={{ marginRight: "auto",backgroundColor:'orange',borderRadius:'25px',paddingLeft:'25pt',paddingRight:'25pt' }}>
                        Exit Quiz</button>
                </div>
                <div class='col' style={{display:'flex'}}>
                    <h2 style={{ margin: "auto" ,color:'white'}}>Question Number: 5</h2>
                </div>
                <div class='col' style={{display:'flex',marginRight:'10vh'}}>
                    <button style={{ marginLeft: "auto",backgroundColor:'orange',borderRadius:'25px',paddingLeft:'25pt',paddingRight:'25pt'}}>
                        Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Fillintheblank;
    
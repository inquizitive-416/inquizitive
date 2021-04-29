import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Score=(props)=>{
    return(
        <div>
            <Modal isOpen={props.isOpen} >
                <div style={{width:'100%',height:'90%'}}>
                    <text style={{alignContent:'center'}}>Score is {props.score} out of {props.total}</text>
                    
                </div>
                <Button href='./explore'>Close</Button>
            </Modal>
        </div>
    );
}
export default Score;
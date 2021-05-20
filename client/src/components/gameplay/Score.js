import React, { useState} from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
//import { Checkmark } from 'react-checkmark'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import RatingBar from '../RatingBar/RatingBar';
import {useMutation} from "@apollo/client";


Modal.setAppElement('#root');


const Score=(props)=>{
    let myarr = props.checkAns
    


    
    
    console.log(myarr)
    return(
        <div style={{width:'40%',height:'40%'}}>
            <Modal style={{width:'70%',height:'60%'}} isOpen={props.isOpen} >
                <div style={{width:'100%',height:'100%'}}>
                <Card style={{ width: '100rem' , height: '100rem'}}>
                    <ListGroup variant="flush">
                        <div style= {{backgroundColor:"orange"}}>
                        {myarr.map( (answer,index) => (

                       <ListGroup.Item style= {{backgroundColor:"#787878 "}}>Question {props.index} : {answer== true? "Correct": "Incorrect"}</ListGroup.Item>
                            

                            ))};

                        </div>
                        <text style={{alignContent:'center'}}>Score is {props.score} out of {props.total}</text>
                        <RatingBar onRate= {props.onRate}/>
                    
                    </ListGroup>
                    </Card>
                
                    
                    
                    
                </div>
                <Button href='../explore'>Close</Button>
            </Modal>
        </div>
    );
}
export default Score;
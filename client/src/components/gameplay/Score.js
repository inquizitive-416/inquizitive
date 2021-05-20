import React, { useState} from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
//import { Checkmark } from 'react-checkmark'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import RatingBar from '../RatingBar/RatingBar';
import {useMutation} from "@apollo/client";


const Score=(props)=>{
    let myarr = props.checkAns
    


    
    
    console.log(myarr)
    return(
        <div style={{width:'70%',height:'70%'}}>






            
            <Modal class="modal fade bd-example-modal-xl"  show={props.isOpen} >
                <div >
                <Card style={{backgroundColor:"orange"}}>
                     <Card.Header style={{backgroundColor: "#383838", fontSize:30, fontColor: "#C0C0C0"}}>Review</Card.Header>

                    <ListGroup variant="flush">
                        <div style= {{backgroundColor:"orange"}}>
                        {myarr.map( (answer,index) => (

                       <ListGroup.Item style= {{backgroundColor:"#787878 "}}>Question {index+1} : {answer== true? "Correct ✔": "Incorrect ✘"}</ListGroup.Item>
                            

                            ))}

                        </div>
                        <text style={{alignContent:'center', fontStyle: "bold", fontSize:20, paddingLeft: 20,paddingTop:15, paddingBottom:15}}> Your Score is <b> {props.score}</b> out of <b> {props.total}</b></text>
                        <div style={{width:1000}}>
                        <RatingBar onRate= {props.onRate} />

                        </div>

                        
                    
                    </ListGroup>
                    </Card>
                
                    
                    
                    
                </div>
                <Button href='../explore'>Close</Button>
            </Modal>
        </div>
    );
}
export default Score;
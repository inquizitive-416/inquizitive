import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
//import { Checkmark } from 'react-checkmark'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

Modal.setAppElement('#root');

const Score=(props)=>{
    var myArr=[true,false,true , false]
    return(
        <div>
            <Modal isOpen={props.isOpen} >
                <div style={{width:'100%',height:'90%'}}>
                <Card style={{ width: '18rem' }}>
                    <ListGroup variant="flush">
                        <div>
                        {myArr.map( (answer,index) => (

                            <ListGroup.Item>Question {index}</ListGroup.Item>
                            

                            ))};

                        </div>
                    
                    </ListGroup>
                    </Card>
                
                    
                    <text style={{alignContent:'center'}}>Score is {props.score} out of {props.total}</text>
                    
                </div>
                <Button href='../explore'>Close</Button>
            </Modal>
        </div>
    );
}
export default Score;
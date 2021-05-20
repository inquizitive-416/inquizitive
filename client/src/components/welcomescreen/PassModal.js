import React, { useState } from "react";
import {Button,Card} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

//import "./RegisterModal.css";


// Modal.setAppElement('#root');

const PassModal=(props)=>{
    const [pass,setPass]=useState("")
    
    function onSubmit(){
        
        props.close()
    }
    return(
        <div style={{backgroundColor:"grey"}}>
            <Modal show={props.isOpen}>
            <Modal.Dialog >
            <Modal.Header closeButton>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <input defaultValue="" onChange={props.setP}/>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.discard}>Close</Button>
                <Button variant="primary" onClick={onSubmit}>Reset</Button>
            </Modal.Footer>
            </Modal.Dialog>
            </Modal>
            {/* <Modal
            show={props.isOpen}
            
            > */}
                {/* <Card style={{backgroundColor:"grey"}}>
                    <Card.Title>
                    Reset Your Password
                    </Card.Title>
                    <Card.Body>
                        
                        <input defaultValue="" onChange={props.setP} />
                    </Card.Body>
                    <div class='row'>
                        <div class='col'>
                        <Button onClick={props.discard}>
                            Discard
                        </Button>
                        </div>
                        <div class='col'>
                        <Button onClick={onSubmit}>
                            Reset
                        </Button>
                        </div>

                    </div>
                    
                </Card> */}
            {/* </Modal> */}
        </div>
    )

}
export default PassModal;
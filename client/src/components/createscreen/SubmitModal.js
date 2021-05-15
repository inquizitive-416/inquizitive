import Button from "react-bootstrap/Button";
import Modal from 'react-modal';

import "./SubmitModal.css";
import React, { useState, useContext } from "react";




const SubmitModal = (props) => {


    const [cpass, setCpass] = useState("");
   
    return (
        <div >
            <Modal isOpen={props.isOpen} centered >
            <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
                
                
            </Modal>
        </div>
     );
};


export default SubmitModal;
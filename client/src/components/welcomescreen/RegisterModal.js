import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-modal';
import Form from "react-bootstrap/Form";

Modal.setAppElement('#root');
const RegisterModal = ({isOpen,regModal}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        
            <Modal
            //{...props}
            isOpen={isOpen}
            //size="lg"
            //aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Form>
                    <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>

                {/* <h4>Centered Modal</h4>
                <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
                </p> */}
            
                <Button onClick={regModal}>Close</Button>
            </Modal>
        
     );
}

export default RegisterModal;
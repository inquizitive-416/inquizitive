import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-modal';
import Form from "react-bootstrap/Form";
//import "./RegisterModal.css";


Modal.setAppElement('#root');
const ForgotPassword = ({isOpen,forModal}) => {
    const [email, setEmail] = useState("");
    const [sec1, setSec1] = useState("");
    const [sec2, setSec2] = useState("");
    
    return (
        <div >
            <Modal
            
            animation={true}
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
                    
                {/* <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                <div className="sec" class="sec1">
                    <Form.Group size="lg">
                        <select class="custom-select" id="inputGroupSelect02">
                            <option  selected>Choose categories</option>
                            <option value="1">What primary school did you attend?</option>
                            <option value="2">In what town or city was your first full time job?</option>
                            <option value="3">In what town or city did you meet your spouse or partner?</option>
                            <option value="4">What is your major?</option>
                            <option value="5">What is your Mother's Maiden name?</option>
                            <option value="6">What is the name of your high school?</option>
                            <option value="7">What is your Father's middle name?</option>
                            <option value="8">What time of the day were you born?</option>
                            <option value="9">What is your hobby?</option>
                            <option value="10">What is the name of your bestfriend?</option>
                        </select>

                        
                    </Form.Group>
                    <Form.Group controlId="sec1">
                        <Form.Control
                            type="sec1"
                            value={sec1}
                            //onClick={(e)=>setSec1("")}
                            placeholder={"Answer 1"}
                            onChange={(e) => setSec1(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div className="sec" class="sec2">
                    <Form.Group size="lg">
                        <select class="custom-select" id="inputGroupSelect02">
                        <option  selected>Choose categories</option>
                            <option value="1">What primary school did you attend?</option>
                            <option value="2">In what town or city was your first full time job?</option>
                            <option value="3">In what town or city did you meet your spouse or partner?</option>
                            <option value="4">What is your major?</option>
                            <option value="5">What is your Mother's Maiden name?</option>
                            <option value="6">What is the name of your high school?</option>
                            <option value="7">What is your Father's middle name?</option>
                            <option value="8">What time of the day were you born?</option>
                            <option value="9">What is your hobby?</option>
                            <option value="10">What is the name of your bestfriend?</option>
                        </select>
                    </Form.Group>
                    <Form.Group controlId="sec2">
                        <Form.Control
                            type="sec2"
                            value={sec2}
                            placeholder={"Answer 2"}
                            onChange={(e) => setSec2(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <Form.Group>
                    <Button onClick={forModal}>Send Email</Button>
                </Form.Group>
                    
            
                </Form>

                {/* <h4>Centered Modal</h4>
                <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
                </p> */}
                
                
            </Modal>
        </div>
     );
}

export default ForgotPassword;
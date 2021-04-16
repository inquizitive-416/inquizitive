import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Explorescreen 		from '../explorescreen/Explorescreen';
import Button from "react-bootstrap/Button";
import "./Welcomescreen.css";
import RegisterModal from "./RegisterModal";
//import Modal from 'react-modal';


// const PegisterModal = () => {
    
// };


const Welcome = (props) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalShow, setModalShow] = React.useState(false);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    function getOpen(){
        console.log(modalShow)
        return modalShow;
    }
    function regModal(){
        console.log(modalShow)
        setModalShow(!modalShow);
    }
    function handleLogin() {
        window.location.replace('../explorescreen/Explorescreen');
        
    }
    
    
    return (
        <div className="Welcome">
            <div class="text" className="Inquizitive">
                In<span style={{color: '#f5ae31'}}>Quiz</span>Itive
            </div>
            <div class="text" className="description">
                Welcome to In<span style={{color: '#f5ae31'}}>Quiz</span>Itive, a place with all the tools needed to give every user the confidence to learn and succeed.
            </div>
            

            <div className="Login" >
            <Form >
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
            
                <div class="row">
                    <div class="col">
                        <Button  style={{backgroundColor:"#f5ae31"}} block size="lg" disabled={!validateForm()} onClick={handleLogin}>
                            Login
                        </Button></div>
                    <div class="col">
                        <Button  style={{backgroundColor:"#f5ae31"}} block size="lg" disabled={false} onClick={regModal}>
                            Register
                        </Button>
                    </div>
                    
                </div>
                <RegisterModal
                    //isOpen={modalShow}
                    isOpen={modalShow}
                    // onHide={() => setModalShow(false)}
                    regModal={regModal}
                />
            </Form>
            </div>
            
        </div>
    );
};

export default Welcome;
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Explorescreen 		from '../explorescreen/Explorescreen';
import Button from "react-bootstrap/Button";
import "./Welcomescreen.css";
import RegisterModal from "./RegisterModal";
import ForgotPassword from "./ForgotPassword";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'
import { graphql,useMutation } from '@apollo/client';
import {LOGIN} from "../../cache/mutation"
//import Modal from 'react-modal';
//j

// const PegisterModal = () => {
    
// };


const Welcome = (props) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [regmodalShow, setRegmodalShow] = React.useState(false);
    const [formodalShow, setFormodalShow] = React.useState(false);
    const [loginInput, setLoginInput] = React.useState({email:"",password:""});
    const [loginUser]=useMutation(LOGIN);

    function validateEmail() {
        return email.length > 0 && email.indexOf('.')>0 && email.indexOf('@')>0 && email.length-1>email.indexOf('.');
    }
    function validatePassword() {
        return password.length >0;
    }
    
    function regModal(){
        //console.log(regmodalShow)
        setRegmodalShow(!regmodalShow);
    }
    function forModal(){
        //console.log(regmodalShow)
        setFormodalShow(!formodalShow);
    }
    const handleLogin= async(e)=>{
        
        setLoginInput({email:email,password:password});
        const { data } = await loginUser({ variables: { ...loginInput } });
        if (data) {
            console.log(data);
        }
    }
    
    
    return (
        <div className="Welcome">
            <div  className="Inquizitive">
                In<span style={{color: '#f5ae31'}}>Quiz</span>Itive
            </div>
            <div className="description">
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
                    style={{color: !validateEmail() ? 'red': ""}}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{color: !validatePassword() ? 'red': ""}}
                />
                </Form.Group>
            <div>
                
                <Form.Label style={{textDecorationLine: 'underline'}} onClick={forModal}>Forgot Password?</Form.Label>
                    
                
            </div>
                <div class="row">
                    <div class="col">
                        <Button style={{backgroundColor:"#f5ae31"}} block size="lg" onClick={handleLogin} disabled={!(validatePassword() && validateEmail())}>
                            Login
                        </Button></div>
                    <div class="col">
                        <Button  style={{backgroundColor:"#f5ae31"}} block size="lg" disabled={false} onClick={regModal}>
                            Register
                        </Button>
                    </div>
                    
                </div>
                
                <RegisterModal
                    //isOpen={regmodalShow}
                    isOpen={regmodalShow}
                    // onHide={() => setRegmodalShow(false)}
                    regModal={regModal}
                    
                />
                
                <ForgotPassword
                    //isOpen={regmodalShow}
                    isOpen={formodalShow}
                    // onHide={() => setRegmodalShow(false)}
                    forModal={forModal}
                />
                
            </Form>
            </div>
            
        </div>
    );
};

export default Welcome;
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Welcomescreen.css";
import RegisterModal from "./RegisterModal";
import ForgotPassword from "./ForgotPassword";
import { graphql,useMutation } from '@apollo/client';
import {LOGIN} from "./cache/mutation"
import { getCurrentUser, setCurrentUser } from "../../data/LocalStorage";



const Welcome = (props) => {
    const [regmodalShow, setRegmodalShow] = React.useState(false);
    const [formodalShow, setFormodalShow] = React.useState(false);
    const [loginInput, setLoginInput] = React.useState({email:"",password:""});
    const [loginUser]=useMutation(LOGIN);
    const [loginError, setLoginError] = useState(false);

    function validateEmail() {
        return loginInput.email.length > 0 && loginInput.email.indexOf('.')>0 && loginInput.email.indexOf('@')>0 && loginInput.email.length-1>loginInput.email.indexOf('.');
    }

    function validatePassword() {
        return loginInput.password.length >0;
    }
    
    function regModal(){
        //console.log(regmodalShow)
        setRegmodalShow(!regmodalShow);
    }
    function forModal(){
        //console.log(regmodalShow)
        setFormodalShow(!formodalShow);
    }
    const onChange= async(e)=>{
        setLoginInput({...loginInput,[e.target.name]:e.target.value});
        setLoginError(false);
    }
    
    const handleLogin= async(e)=>{
        // setLoginInput({...loginInput,email:email,password:password});
        e.preventDefault();
        // console.log(loginInput);
        const {error, data } = await loginUser({ variables: { ...loginInput } });
        if (error) { return `Error: ${error.message}` };
        if (data.login._id === null) {
            // console.log("here");
            setLoginError(true);
        }
        else if (data) {
            // console.log("imhere");
            setCurrentUser(data.login);
            console.log(getCurrentUser());
            
            props.fetchUser();
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
            <Form onSubmit={handleLogin}>
                <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="email"
                    name='email'
                    value={loginInput.email}
                    onChange={onChange}
                    style={{ color: loginError ? "red" : ""}}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name='password'
                    value={loginInput.password}
                    onChange={onChange}
                    // style={{color: !validatePassword() ? 'red': ""}}
                    style={{ color: loginError ? "red" : ""}}                
                />
                </Form.Group>
            <div>
                
                <Form.Label style={{textDecorationLine: 'underline'}} onClick={forModal}>Forgot Password?</Form.Label>
                    
                
            </div>
                <div class="row">
                    <div class="col">
                        <Button style={{backgroundColor:"#f5ae31"}} block size="lg" type='submit' value='Login' disabled={!(validatePassword() && validateEmail())}>
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
                    fetchUser={props.fetchUser}
                    
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
// import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-modal';
import Form from "react-bootstrap/Form";
import "./RegisterModal.css";
import {LOGIN,REGISTER} from "./cache/mutation"
import React, { useState, useContext } from "react";
import { apolloError } from 'apollo-server-errors';
// import Axios from "axios";
import { graphql,useMutation } from '@apollo/client';
import { flowRight as compose } from 'lodash';
import { setCurrentUser } from "../../data/LocalStorage";


Modal.setAppElement('#root');
const RegisterModal = (props) => {

    const [error, setError] = useState({});
    const [cpass, setCpass] = useState("");
    const [loginInput, setLoginInput] = React.useState({email:"",password:""});

      const [userInfo,setUserInfo] = useState(
        {
            firstName: "",
            lastName:"",
            email:"",
            username:"",
            password:"",
            securityQuestionOne:"",
            securityAnswerOne:"",
            securityQuestionTwo:"",
            securityAnswerTwo:""
        }
    )
    const [loginUser]=useMutation(LOGIN);
    const [addUser]=useMutation(REGISTER)
    const [registerError, setRegisterError] = useState(false);
    const onChange =(e)=>{
        setUserInfo({...userInfo,[e.target.name]:e.target.value});
        setRegisterError(false)
        if (e.target.name==='email' ||e.target.name==='password'){
            setLoginInput({...loginInput,[e.target.name]:e.target.value});
        }
    }
    const close =(e)=>{
        setUserInfo({firstName: "",
        lastName:"",
        email:"",
        username:"",
        password:"",
        securityQuestionOne:"",
        securityAnswerOne:"",
        securityQuestionTwo:"",
        securityAnswerTwo:""});
        setRegisterError(false);
        setCpass("");
        setLoginInput({email:"",password:""});
        props.regModal();
    }
    const onSubmit= async(e)=>{
        e.preventDefault();
        
        console.log(userInfo);
        const { error, data } = await addUser({ variables: { ...userInfo } });
        // if (loading) { toggleLoading(true) };
        if (error) { return `Error: ${error.message}` };
        
        console.log(data);
        // const {error, data } = await loginUser({ variables: { ...loginInput } });
        // if (error) { return `Error: ${error.message}` };
        if (data.register._id === null) {
            // console.log("here");
            setRegisterError(true);
        }
        else if (data) {
            // console.log("imhere");
            setCurrentUser(data.register);
            props.fetchUser();
        }
        
        
            // addUser({variables:userInfo});
        
    }


    function validateEmail() {
        return userInfo.email.length > 0 && userInfo.email.indexOf('.')>0 && userInfo.email.indexOf('@')>0 && userInfo.email.length-1>userInfo.email.indexOf('.');
    }
    function validatePassword() {
        return userInfo.password.length >0;
    }
    function checkPassword(){
        return userInfo.password===cpass;
    }
    return (
        <div >
            <Modal
            isOpen={props.isOpen}
            centered
            >
                <Form onSubmit={onSubmit}>
                <div class="row">
                    <div class="col">
                        <Form.Group size="lg" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="firstName"
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={onChange}
                                style={{ color: registerError ? "red" : ""}}
                            />
                        </Form.Group>
                    </div>
                    <div class="col">
                        <Form.Group size="lg" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="lastName"
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={onChange}
                                style={{ color: registerError ? "red" : ""}}
                            />
                        </Form.Group>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col">
                        <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={onChange}
                                style={{ color: registerError ? "red" : ""}}

                            />
                        </Form.Group>
                    </div>
                    <div class="col">
                        <Form.Group size="lg" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="username"
                                name="username"
                                value={userInfo.username}
                                onChange={onChange}
                                style={{ color: registerError ? "red" : ""}}
                            />
                        </Form.Group>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col">
                        <Form.Group size="lg" controlId="password">
                        <Form.Label>password</Form.Label>
                            <Form.Control
                                autoFocus
                                type="password"
                                name="password"
                                value={userInfo.password}
                                onChange={onChange}
                                style={{color: (registerError ||validatePassword()) ? "":"red"}}
                            />
                        </Form.Group>
                    </div>
                    <div class="col">
                        <Form.Group size="lg" controlId="cpassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="cpassword"
                                value={cpass}
                                onChange={(e) => setCpass(e.target.value)}
                                style={{color: (registerError ||checkPassword()) ? "":"red"}}
                            />
                        </Form.Group>
                    </div>
                    
                </div>
            
                <div className="sec" class="sec1">
                    <Form.Group size="lg">
                        <select class="custom-select" id="inputGroupSelect01" name="securityQuestionOne" onChange={onChange}>
                            <option value="What was your childhood nickname?">What was your childhood nickname?</option>
                            <option value="What is the name of your favorite childhood friend?">What is the name of your favorite childhood friend?</option>
                            <option value="What was the name of your first stuffed animal?">What was the name of your first stuffed animal?</option>
                            <option value="What is your dream car?">What is your dream car?</option>
                        </select>

                        
                    </Form.Group>
                    <Form.Group controlId="secans1">
                        <Form.Control
                            type="sec1"
                            name="securityAnswerOne"
                            value={userInfo.securityAnswerOne}
                            placeholder={"Answer 1"}
                            onChange={onChange}
                            style={{ color: registerError ? "red" : ""}}
                        />
                    </Form.Group>
                </div>
                <div className="sec" class="sec2">
                    <Form.Group size="lg">
                        <select class="custom-select" id="inputGroupSelect02" name="securityQuestionTwo" onChange={onChange}>
                            <option value="What is the location of your dream vacation?">What is the location of your dream vacation?</option>
                            <option value="What is the name of your favorite sports team?">What is the name of your favorite sports team?</option>
                            <option value="Where were you when you first heard about 9/11?">Where were you when you first heard about 9/11?</option>
                            <option value="What is the name of a college you applied to but didn't attend?">What is the name of a college you applied to but didn't attend?</option>
                        </select>
                    </Form.Group>
                    <Form.Group controlId="secans2">
                        <Form.Control
                            type="sec2"
                            name="securityAnswerTwo"
                            value={userInfo.securityAnswerTwo}
                            placeholder={"Answer 2"}
                            onChange={onChange}
                            style={{ color: registerError ? "red" : ""}}
                        />
                    </Form.Group>
                </div>
                <Form.Group>
                    <input type="submit" value="Register" />
                </Form.Group>
                <Form.Group>
                    <input type="button" value="Close" onClick={close}/>
                </Form.Group>
                    
            
                </Form>
                
            </Modal>
        </div>
     );
};

// export default compose(
//     graphql(REGISTER, { name: 'register' })
// )(RegisterModal);
export default RegisterModal;
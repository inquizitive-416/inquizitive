// import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import "./RegisterModal.css";
import {LOGIN,REGISTER} from "./cache/mutation"
import React, { useState, useContext } from "react";
import { apolloError } from 'apollo-server-errors';
// import Axios from "axios";
import { graphql,useMutation } from '@apollo/client';
import { flowRight as compose } from 'lodash';
import { setCurrentUser } from "../../data/LocalStorage";


// Modal.setAppElement('#root');
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
    const [rienable, setRIEnable] = useState(true);

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
        setRIEnable(true)
        props.regModal();
    }
    const onSubmit= async(e)=>{
        e.preventDefault();
        if(
            userInfo.lastName===""||
            userInfo.email===""||
            userInfo.username===""||
            userInfo.password===""||
            userInfo.securityQuestionOne===""||
            userInfo.securityAnswerOne===""||
            userInfo.securityQuestionTwo===""||
            userInfo.securityAnswerTwo===""){
                setRIEnable(false)
                return
        }
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
            setRIEnable(true)
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
            show={props.isOpen}
            centered
            >
                <Form onSubmit={onSubmit} style={{padding:20,backgroundColor:"#424242"}}>
                <div class="row">
                    <div class="col">
                        <Form.Group size="lg" controlId="firstName">
                        <Form.Label style={{color:"white"}}>First Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="firstName"
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={onChange}
                                style={{backgroundColor:"#424242", color: registerError ? "red" : "white"}}
                            />
                        </Form.Group>
                    </div>
                    <div class="col">
                        <Form.Group size="lg" controlId="lastName">
                            <Form.Label style={{color:"white"}}>Last Name</Form.Label>
                            <Form.Control
                                type="lastName"
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={onChange}
                                style={{backgroundColor:"#424242", color: registerError ? "red" : "white"}}
                            />
                        </Form.Group>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col">
                        <Form.Group size="lg" controlId="email">
                        <Form.Label style={{color:"white"}}>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={onChange}
                                style={{backgroundColor:"#424242",  color: registerError ? "red" : "white"}}

                            />
                        </Form.Group>
                    </div>
                    <div class="col">
                        <Form.Group size="lg" controlId="username">
                            <Form.Label style={{color:"white"}}>Username</Form.Label>
                            <Form.Control
                                type="username"
                                name="username"
                                value={userInfo.username}
                                onChange={onChange}
                                style={{ backgroundColor:"#424242", color: registerError ? "red" : "white"}}
                            />
                        </Form.Group>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col">
                        <Form.Group size="lg" controlId="password">
                        <Form.Label style={{color:"white"}}>Password</Form.Label>
                            <Form.Control
                                autoFocus
                                type="password"
                                name="password"
                                value={userInfo.password}
                                onChange={onChange}
                                style={{backgroundColor:"#424242", color: (registerError ||validatePassword()) ? "white":"red"}}
                            />
                        </Form.Group>
                    </div>
                    <div class="col">
                        <Form.Group size="lg" controlId="cpassword">
                            <Form.Label style={{color:"white"}}>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="cpassword"
                                value={cpass}
                                onChange={(e) => setCpass(e.target.value)}
                                style={{backgroundColor:"#424242", color: (registerError ||checkPassword()) ? "white":"red"}}
                            />
                        </Form.Group>
                    </div>
                    
                </div>
            
                <div className="sec" class="sec1">
                    <Form.Group size="lg">
                        <select style={{backgroundColor:"#424242",color:"white"}} class="custom-select" id="inputGroupSelect01" name="securityQuestionOne" onChange={onChange}>
                            <option style={{color:"white"}} selected>Choose question 1</option>
                            <option style={{color:"white"}} value="What was your childhood nickname?">What was your childhood nickname?</option>
                            <option style={{color:"white"}} value="What is the name of your favorite childhood friend?">What is the name of your favorite childhood friend?</option>
                            <option style={{color:"white"}} value="What was the name of your first stuffed animal?">What was the name of your first stuffed animal?</option>
                            <option style={{color:"white"}} value="What is your dream car?">What is your dream car?</option>
                        </select>

                        
                    </Form.Group>
                    <Form.Group controlId="secans1">
                        <Form.Control
                            type="sec1"
                            name="securityAnswerOne"
                            value={userInfo.securityAnswerOne}
                            placeholder={""}
                            onChange={onChange}
                            style={{backgroundColor:"#424242",  color: registerError ? "red" : "white"}}
                        />
                    </Form.Group>
                </div>
                <div className="sec" class="sec2">
                    <Form.Group size="lg">
                        <select style={{backgroundColor:"#424242",color:"white"}} class="custom-select" id="inputGroupSelect02" name="securityQuestionTwo" onChange={onChange}>
                            <option style={{color:"white"}} selected>Choose question 2</option>
                            <option style={{color:"white"}} value="What is the location of your dream vacation?">What is the location of your dream vacation?</option>
                            <option style={{color:"white"}} value="What is the name of your favorite sports team?">What is the name of your favorite sports team?</option>
                            <option style={{color:"white"}} value="Where were you when you first heard about 9/11?">Where were you when you first heard about 9/11?</option>
                            <option style={{color:"white"}} value="What is the name of a college you applied to but didn't attend?">What is the name of a college you applied to but didn't attend?</option>
                        </select>
                    </Form.Group>
                    <Form.Group controlId="secans2">
                        <Form.Control
                            type="sec2"
                            name="securityAnswerTwo"
                            value={userInfo.securityAnswerTwo}
                            placeholder={""}
                            onChange={onChange}
                            style={{backgroundColor:"#424242",  color: registerError ? "red" : "white"}}
                        />
                    </Form.Group>
                </div>
                <small style={{color: rienable ? "#424242" : "red"}}>All Fields must be filled</small>
                <Modal.Footer>
                    <Button type="button" style={{backgroundColor:"white",color:"orange"}} onClick={close}>Close</Button>
                    <Button type="submit" style={{color:"white",backgroundColor:"orange"}} >Register</Button>
                    
                </Modal.Footer>
                    
            
                </Form>
                
            </Modal>
        </div>
     );
};

// export default compose(
//     graphql(REGISTER, { name: 'register' })
// )(RegisterModal);
export default RegisterModal;
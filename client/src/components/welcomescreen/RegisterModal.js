// import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-modal';
import Form from "react-bootstrap/Form";
import "./RegisterModal.css";
import {REGISTER} from "../../cache/mutation"
import React, { useState, useContext } from "react";
import { apolloError } from 'apollo-server-errors';
// import Axios from "axios";
import { graphql,useMutation } from '@apollo/client';
import { flowRight as compose } from 'lodash';
// import ErrorNotice from "../misc/error";
// import logo from '../../images/logo2.png';
// import "../../CSS/auth/register.css"


Modal.setAppElement('#root');
const RegisterModal = (props) => {

    const [error, setError] = useState({});
    const [cpass, setCpass] = useState("");
    

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
    const errror = apolloError

    const [addUser]=useMutation(REGISTER)
    
    const onChange =(e)=>{
        setUserInfo({...userInfo,[e.target.name]:e.target.value});
    }
    const onSubmit= async(e)=>{
        e.preventDefault();
        
        console.log(userInfo);
        const { error, data } = await addUser({ variables: { ...userInfo } });
        // if (loading) { toggleLoading(true) };
        if (error) { return `Error: ${error.message}` };
        if(data){
            console.log(data);
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
                                style={{color: validateEmail() ? "":"red"}}
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
                                style={{color: validatePassword() ? "":"red"}}
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
                                style={{color: checkPassword() ? "":"red"}}
                            />
                        </Form.Group>
                    </div>
                    
                </div>
            
                <div className="sec" class="sec1">
                    <Form.Group size="lg">
                        <select class="custom-select" id="inputGroupSelect01" name="securityQuestionOne" onChange={onChange}>
                            <option  value>Choose categories</option>
                            <option value="What primary school did you attend?">What primary school did you attend?</option>
                            <option value="In what town or city was your first full time job?">In what town or city was your first full time job?</option>
                            <option value="In what town or city did you meet your spouse or partner?">In what town or city did you meet your spouse or partner?</option>
                            <option value="What is your major?">What is your major?</option>
                            <option value="What is your Mother's Maiden name?">What is your Mother's Maiden name?</option>
                            <option value="What is the name of your high school?">What is the name of your high school?</option>
                            <option value="What is your Father's middle name?">What is your Father's middle name?</option>
                            <option value="What time of the day were you born?">What time of the day were you born?</option>
                            <option value="What is your hobby?">What is your hobby?</option>
                            <option value="What is the name of your bestfriend?">What is the name of your bestfriend?</option>
                        </select>

                        
                    </Form.Group>
                    <Form.Group controlId="secans1">
                        <Form.Control
                            type="sec1"
                            name="securityAnswerOne"
                            value={userInfo.securityAnswerOne}
                            placeholder={"Answer 1"}
                            onChange={onChange}
                        />
                    </Form.Group>
                </div>
                <div className="sec" class="sec2">
                    <Form.Group size="lg">
                        <select class="custom-select" id="inputGroupSelect02" name="securityQuestionTwo" onChange={onChange}>
                        <option  value>Choose categories</option>
                            <option value="What primary school did you attend?">What primary school did you attend?</option>
                            <option value="In what town or city was your first full time job?">In what town or city was your first full time job?</option>
                            <option value="In what town or city did you meet your spouse or partner?">In what town or city did you meet your spouse or partner?</option>
                            <option value="What is your major?">What is your major?</option>
                            <option value="What is your Mother's Maiden name?">What is your Mother's Maiden name?</option>
                            <option value="What is the name of your high school?">What is the name of your high school?</option>
                            <option value="What is your Father's middle name?">What is your Father's middle name?</option>
                            <option value="What time of the day were you born?">What time of the day were you born?</option>
                            <option value="What is your hobby?">What is your hobby?</option>
                            <option value="What is the name of your bestfriend?">What is the name of your bestfriend?</option>
                        </select>
                    </Form.Group>
                    <Form.Group controlId="secans2">
                        <Form.Control
                            type="sec2"
                            name="securityAnswerTwo"
                            value={userInfo.securityAnswerTwo}
                            placeholder={"Answer 2"}
                            onChange={onChange}
                        />
                    </Form.Group>
                </div>
                <Form.Group>
                    <input type="submit" value="Register" />
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
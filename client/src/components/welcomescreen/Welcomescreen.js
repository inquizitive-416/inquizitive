import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Welcomescreen.css";

const Welcome = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        
        event.preventDefault();
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
            <Form onSubmit={handleSubmit}>
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
                    <Button  style={{backgroundColor:"#f5ae31"}} block size="lg" disabled={!validateForm()} >
                        Login
                    </Button></div>
                <div class="col">
                    <Button  style={{backgroundColor:"#f5ae31"}} block size="lg" disabled={false}>
                        Register
                    </Button>
                    </div>
                </div>
            </Form>
            </div>
        </div>
    );
};

export default Welcome;
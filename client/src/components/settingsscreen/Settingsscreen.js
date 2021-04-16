import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import NavbarTop from '../navbar/NavbarTop';
import { Card, Button, Form } from 'react-bootstrap'
import { GET_CURRENT_USER } from './queries'

const ChangeProfilePicture = (props) => {
    return (
        <Card className="bg-secondary text-white">
            <Card.Body>
                <Button variant='light'>Upload a New Photo</Button>
            </Card.Body>
        </Card>
    );
};

const ChangeUsername = (props) => {

    return (
        <Card className="bg-secondary text-white">
            <Card.Body>
                <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label className="text-warning">Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter new username" />
                </Form.Group>

                <Button variant="light" type="submit">
                    Update Username
                </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const ChangePassword = (props) => {
    return (
        <Card className="bg-secondary text-white">
            <Card.Body>
                <Form>
                <Form.Group controlId="formPassword">
                    <Form.Label className="text-warning">Password</Form.Label>
                    <Form.Control type="email" placeholder="Enter new password" />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Label className="text-warning">Confirm password</Form.Label>
                    <Form.Control type="email" placeholder="Enter new password again" />
                </Form.Group>

                <Button variant="light" type="submit">
                    Update Password
                </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const ChangeUserInfo = (props) => {
    return (
        <Card className="bg-secondary text-white">
            <Card.Body>
                <Form>
                <Form.Group controlId="formFirstName">
                    <Form.Label className="text-warning">First Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter new first name" />
                </Form.Group>

                <Form.Group controlId="formLastName">
                    <Form.Label className="text-warning">Last Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter new last name" />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label className="text-warning">Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter new email" />
                </Form.Group>

                <Button variant="light" type="submit">
                    Update User Info
                </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const ChangeSecurityQuestions = (props) => {
    return (
        <Card className="bg-secondary text-white">
            <Card.Body>
                <Form>
                <Form.Group controlId="formSecurityQuestion1">
                    <Form.Label className="text-warning">Security Question 1</Form.Label>
                    <Form.Control as="select" size="md" custom>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                        <option>Option 4</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formSecurityAnswer1">
                    <Form.Label className="text-warning">Security Question 1 Answer</Form.Label>
                    <Form.Control type="email" placeholder="Enter answer to security question 1" />
                </Form.Group>

                <Form.Group controlId="formSecurityQuestion2">
                    <Form.Label className="text-warning">Security Question 2</Form.Label>
                    <Form.Control as="select" size="md" custom>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                        <option>Option 4</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formSecurityAnswer2">
                    <Form.Label className="text-warning">Security Question 2 Answer</Form.Label>
                    <Form.Control type="email" placeholder="Enter answer to security question 2" />
                </Form.Group>

                <Button variant="light" type="submit">
                    Update Security Questions
                </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const ChangeProfileVisibility = (props) => {
    return (
        <Card className="bg-secondary text-white">
            <Card.Body>
                <Form>
                <Form.Group controlId="formVisibility">
                    <Form.Label className="text-warning">Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter new username" />
                </Form.Group>

                <Button variant="light" type="submit">
                    Update Username
                </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const Settingsscreen = (props) => {

    // let currentUser = 'base'

    // const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    //     variables: {_id: '6078c4f6f08fd0add52045bf'}
    // })
    // if (loading) {console.log(loading, 'loading'); }
    // if(error) { console.log(error, 'error'); }
	// if(data) { currentUser = data.getUserById.username }

    // console.log("hi")
    // console.log(currentUser)

	return (
		<div className="bg-dark">
            <NavbarTop/>
            <br />
            <ChangeProfilePicture/>
            <br />
            <ChangeUsername/>
            <br />
            <ChangePassword/>
            <br />
            <ChangeUserInfo/>
            <br />
            <ChangeSecurityQuestions/>
            <br />
            <ChangeProfileVisibility/>
        </div>
	);
};

export default Settingsscreen;

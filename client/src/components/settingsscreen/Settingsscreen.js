import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import NavbarTop from '../navbar/NavbarTop';
import { Card, Button, Form } from 'react-bootstrap'
import { GET_CURRENT_USER } from './queries'
import { UPDATE_USER_FIELD, UPDATE_USER_INFO } from './mutations'

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

    const [username, setUsername] = useState(props.user.username);

    const [updateUserField] = useMutation(UPDATE_USER_FIELD);

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleSubmit = async (e) => {
        await updateUserField({ variables: { _id: props.user._id, field: 'username', value: username}});
    }

    return (
        <Card className="bg-secondary text-white">
            <Card.Body>
                <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label className="text-warning">Username</Form.Label>
                    <Form.Control type="username" value={username} onChange={updateUsername}/>
                </Form.Group>

                <Button variant="light" onClick={handleSubmit}>
                    Update Username
                </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const ChangePassword = (props) => {

    const [password, setPassword] = useState(props.user.password);

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

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

    const [input, setInput] = useState({ firstName: props.user.firstName,
                                         lastName: props.user.lastName,
                                         email: props.user.email});

    const [updateUserInfo] = useMutation(UPDATE_USER_INFO);

    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value};
        setInput(updated);
    }

    const handleSubmit = async (e) => {
        await updateUserInfo({ variables: { _id: props.user._id, firstName: input.firstName, lastName: input.lastName, email: input.email}});
    }

    return (
        <Card className="bg-secondary text-white">
            <Card.Body>
                <Form>
                <Form.Group controlId="formFirstName">
                    <Form.Label className="text-warning">First Name</Form.Label>
                    <Form.Control name="firstName" value={input.firstName} onChange={updateInput} />
                </Form.Group>

                <Form.Group controlId="formLastName">
                    <Form.Label className="text-warning">Last Name</Form.Label>
                    <Form.Control name="lastName" value={input.lastName} onChange={updateInput} />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label className="text-warning">Email</Form.Label>
                    <Form.Control name="email" value={input.email} onChange={updateInput} />
                </Form.Group>

                <Button variant="light" onClick={handleSubmit}>
                    Update User Info
                </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

const ChangeSecurityQuestions = (props) => {

    const [input, setInput] = useState({ question1: props.user.securityQuestion1,
                                         answer1: props.user.securityAnswer1,
                                         question2: props.user.securityQuestion2,
                                         answer2: props.user.securityAnswer2});

    console.log(input)
    console.log("hi")

    return (
        <Card className="bg-secondary text-white">
            <Card.Body>
                <Form>
                <Form.Group controlId="formSecurityQuestion1">
                    <Form.Label className="text-warning">Security Question 1</Form.Label>
                    <Form.Control as="select" size="md" defaultValue={input.question1} custom>
                        <option>What was your childhood nickname?</option>
                        <option>What is the name of your favorite childhood friend?</option>
                        <option>What was the name of your first stuffed animal?</option>
                        <option>What is your dream car?</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formSecurityAnswer1">
                    <Form.Label className="text-warning">Security Question 1 Answer</Form.Label>
                    <Form.Control type="email" placeholder="Enter answer to security question 1" />
                </Form.Group>

                <Form.Group controlId="formSecurityQuestion2">
                    <Form.Label className="text-warning">Security Question 2</Form.Label>
                    <Form.Control as="select" size="md" defaultValue={input.question2} custom>
                        <option>What is the location of your dream vacation?</option>
                        <option>What is the name of your favorite sports team?</option>
                        <option>Where were you when you first heard about 9/11?</option>
                        <option>What is the name of a college you applied to but didn't attend?</option>
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

    let currentUser = 'base'

    const { loading, error, data } = useQuery(GET_CURRENT_USER, {
        variables: {_id: '6078c4f6f08fd0add52045bf'}
    })
    if (loading) { return <div></div>; }
    if(error) { console.log(error);
        return <div>Internal Error</div>; }
	if(data) { currentUser = data.getUserById }

    console.log(currentUser)

	return (
		<div className="bg-dark">
            <NavbarTop/>
            <br />
            <ChangeProfilePicture/>
            <br />
            <ChangeUsername user={currentUser}/>
            <br />
            <ChangePassword user={currentUser}/>
            <br />
            <ChangeUserInfo user={currentUser}/>
            <br />
            <ChangeSecurityQuestions user={currentUser}/>
            <br />
            <ChangeProfileVisibility/>
        </div>
	);
};

export default Settingsscreen;

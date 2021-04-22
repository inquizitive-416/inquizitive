import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import NavbarTop from '../navbar/NavbarTop';
import { Card, Button, Form, Col, Row } from 'react-bootstrap'
import { GET_CURRENT_USER } from './queries'
import { UPDATE_USER_FIELD, UPDATE_USER_INFO, UPDATE_SECURITY_QUESTIONS, UPDATE_USER_VISIBILITY } from './mutations'

const ChangeProfilePicture = (props) => {
    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="2">
            </Col>
            <Col xs="8">
                <Card className="bg-secondary text-white text-center">
                    <Card.Body>
                        <Button variant='light'>Upload a New Photo</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="1"></Col>
        </Row>
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
        <Row>
            <Col xs="1"></Col>
            <Col xs="2">
            </Col>
            <Col xs="8">
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
            </Col>
            <Col xs="1"></Col>
        </Row>
    );
};

const ChangePassword = (props) => {

    const [input, setInput] = useState({ 
        password: "",
        confirmPassword: ""
    });

    const [updateUserField] = useMutation(UPDATE_USER_FIELD);

    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value};
        setInput(updated);
    }

    const handleSubmit = async (e) => {
        if (input.password == input.confirmPassword){
            await updateUserField({ variables: { _id: props.user._id, field: 'password', value: input.password}});
        }
    }

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="2">
            </Col>
            <Col xs="8">
                <Card className="bg-secondary text-white">
                    <Card.Body>
                        <Form>
                        <Form.Group controlId="formPassword">
                            <Form.Label className="text-warning">Password</Form.Label>
                            <Form.Control type="password" name="password" value={input.password} onChange={updateInput} />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label className="text-warning">Confirm password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={input.confirmPassword} onChange={updateInput} />
                        </Form.Group>

                        <Button variant="light" onClick={handleSubmit}>
                            Update Password
                        </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="1"></Col>
        </Row>
    );
};

const ChangeUserInfo = (props) => {

    var date = new Date(props.user.dateOfBirth)
    var month = date.getMonth().toString()
    var day = date.getDate().toString()
    var year = date.getFullYear().toString()

    const [input, setInput] = useState({ 
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        month: month,
        day: day,
        year: year
    });

    const [updateUserInfo] = useMutation(UPDATE_USER_INFO);

    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value};
        setInput(updated);
    }

    const handleSubmit = async (e) => {
        var newDate = new Date(input.year, input.month, input.day)
        await updateUserInfo({ variables: { _id: props.user._id, firstName: input.firstName, lastName: input.lastName, 
            email: input.email, dateOfBirth: newDate}});
    }

    const createOptions = (from, to) => {
        var options = [];
        if (from > to) {
            for (var i = to; i >= from; i--){
                options.push(<option key={i.toString()}>{i}</option>);
            }
        }
        else{
            for (var i = from; i <= to; i++){
                options.push(<option key={i.toString()}>{i}</option>);
            }
        }
        return options;
    }

    const createMonthOptions = () => {
        var options = [];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (var i = 0; i <= 11; i++){
            options.push(<option key={i.toString()} value={i}>{months[i]}</option>);
        }
        return options;
    }

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="2">
            </Col>
            <Col xs="8">
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

                        <Form.Group controlId="formDateOfBirth">
                            <Form.Label className="text-warning">Date Of Birth</Form.Label>
                            <Form.Row>

                                <Form.Group as={Col} controlId="month">
                                    <Form.Control as="select" name="month" value={input.month} onChange={updateInput} custom>
                                        {createMonthOptions()}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="day">
                                    <Form.Control as="select" name="day" value={input.day} onChange={updateInput} custom>
                                        {createOptions(1, 31)}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="year">
                                    <Form.Control as="select" name="year" value={input.year} onChange={updateInput} custom>
                                        {createOptions(1900, 2021)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Form.Group>

                        <Button variant="light" onClick={handleSubmit}>
                            Update User Info
                        </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="1"></Col>
        </Row>
    );
};

const ChangeSecurityQuestions = (props) => {

    const [input, setInput] = useState({ 
        question1: props.user.securityQuestion1,
        answer1: props.user.securityAnswer1,
        question2: props.user.securityQuestion2,
        answer2: props.user.securityAnswer2
    });

    const [UpdateSecurityQuestions] = useMutation(UPDATE_SECURITY_QUESTIONS);

    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value};
        setInput(updated);
    }

    const handleSubmit = async (e) => {
        await UpdateSecurityQuestions({ variables: { 
            _id: props.user._id, 
            question1: input.question1, answer1: input.answer1, 
            question2: input.question2, answer2: input.answer2
        }});
    }

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="2">
            </Col>
            <Col xs="8">
                <Card className="bg-secondary text-white">
                    <Card.Body>
                        <Form>
                        <Form.Group controlId="formSecurityQuestion1">
                            <Form.Label className="text-warning">Security Question 1</Form.Label>
                            <Form.Control as="select" size="md" name="question1" value={input.question1} onChange={updateInput} custom>
                                <option>What was your childhood nickname?</option>
                                <option>What is the name of your favorite childhood friend?</option>
                                <option>What was the name of your first stuffed animal?</option>
                                <option>What is your dream car?</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formSecurityAnswer1">
                            <Form.Label className="text-warning">Security Question 1 Answer</Form.Label>
                            <Form.Control name="answer1" value={input.answer1} onChange={updateInput} />
                        </Form.Group>

                        <Form.Group controlId="formSecurityQuestion2">
                            <Form.Label className="text-warning">Security Question 2</Form.Label>
                            <Form.Control as="select" size="md" name="question2" value={input.question2} onChange={updateInput} custom>
                                <option>What is the location of your dream vacation?</option>
                                <option>What is the name of your favorite sports team?</option>
                                <option>Where were you when you first heard about 9/11?</option>
                                <option>What is the name of a college you applied to but didn't attend?</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formSecurityAnswer2">
                            <Form.Label className="text-warning">Security Question 2 Answer</Form.Label>
                            <Form.Control name="answer2" value={input.answer2} onChange={updateInput} />
                        </Form.Group>

                        <Button variant="light" onClick={handleSubmit}>
                            Update Security Questions
                        </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="1"></Col>
        </Row>
    );
};

const ChangeProfileVisibility = (props) => {

    const [isPublic, setIsPublic] = useState(props.user.profilePublic);

    const [updateUserVisibility] = useMutation(UPDATE_USER_VISIBILITY);

    const toggleEnabled = async () => {
        await updateUserVisibility({ variables: { _id: props.user._id, value: !isPublic}});
        setIsPublic(!isPublic)
    }

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="2">
            </Col>
            <Col xs="8">
                <Card className="bg-secondary text-white">
                    <Card.Body>
                        <Form>
                        <Form.Group controlId="formVisibility">
                            <Form.Label className="text-warning">Profile Visibility</Form.Label>
                            <Form.Row>
                                <Col sm="1">
                                    <Form.Label>Private</Form.Label>
                                </Col>
                                <Col sm="1">
                                    <Form.Check
                                        type="switch"
                                        checked={isPublic}
                                        onChange={toggleEnabled}
                                        id="custom-switch"
                                    />
                                </Col>
                                <Col sm="1">
                                    <Form.Label className="text-warning">Public</Form.Label>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="1"></Col>
        </Row>
    );
};

const DeleteProfileButton = (props) => {
    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="2">
            </Col>
            <Col xs="8">
                <Card className="bg-secondary text-white text-center">
                    <Card.Body>
                        <Button variant='warning'>Delete Profile</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="1"></Col>
        </Row>
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

    //console.log(currentUser)

	return (
		<div className="bg-dark">
            <NavbarTop/>
            <br />
            <ChangeProfilePicture user={currentUser}/>
            <br />
            <ChangeUsername user={currentUser}/>
            <br />
            <ChangePassword user={currentUser}/>
            <br />
            <ChangeUserInfo user={currentUser}/>
            <br />
            <ChangeSecurityQuestions user={currentUser}/>
            <br />
            <ChangeProfileVisibility user={currentUser}/>
            <br />
            <DeleteProfileButton />
        </div>
	);
};

export default Settingsscreen;

import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import NavbarTop from '../navbar/NavbarTop';
import { Card, Button, Form, Col, Row } from 'react-bootstrap'
import { GET_CURRENT_USER } from './queries'
import { UPDATE_USER_FIELD, UPDATE_USER_INFO, UPDATE_SECURITY_QUESTIONS, UPDATE_USER_VISIBILITY } from './mutations'
import { getCurrentUser } from "../../data/LocalStorage";
import { uploadFile } from 'react-s3';
const bcrypt = require('bcryptjs');

const ChangeProfilePicture = (props) => {

    const [image, setImage] = useState({});
    const [disableUpdate, setDisableUpdate] = useState(true);

    const [updateUserField] = useMutation(UPDATE_USER_FIELD);

    const handleNewImage = (e) => {
        var newImage = e.target.files[0];
        var ending = newImage.name.split(".");
        var newName = props.user._id + "-" + Date.now() + "." + ending[1];

        var renamedImage = new File([newImage], newName, {type: newImage.type});

        setImage(renamedImage);
        setDisableUpdate(false);
    }

    const uploadNewImage = async (e) => {
        const config = {
            bucketName: 'inquizitive416',
            dirName: 'avatars', // SPECIFY DIRECTORY FOR FILES HERE
            region: 'us-east-1',
            accessKeyId: 'AKIA5IBQXNKG3HMYNPZW',
            secretAccessKey: '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',
        }

        var fileLocation = "";
        
        await uploadFile(image, config)
            .then(data => fileLocation = data.location)
            .catch(err => console.error(err));

        await updateUserField({ variables: { _id: props.user._id, field: 'profilePicture', value: fileLocation}});

        await setDisableUpdate(true);
    }

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="2">
                <Card className="bg-dark text-white text-center" border="dark">
                    <Card.Body>
                        <Form.Label className="text-warning">Change your Platform Picture</Form.Label>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="8">
                <Card className="bg-secondary text-white text-center">
                    <Card.Body>
                        <input type="file" onChange={handleNewImage}/>
                        <Button variant='light' onClick={uploadNewImage} disabled={disableUpdate}>Upload a New Photo</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="1"></Col>
        </Row>
    );
};

const ChangeUsername = (props) => {

    const [username, setUsername] = useState(props.user.username);
    const [disableUpdate, setDisableUpdate] = useState(true);

    const [updateUserField] = useMutation(UPDATE_USER_FIELD);

    const updateUsername = (e) => {
        setUsername(e.target.value);
        setDisableUpdate(false);
    }

    const handleSubmit = async (e) => {
        await updateUserField({ variables: { _id: props.user._id, field: 'username', value: username}});

        setDisableUpdate(true);
    }

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="2">
            <Card className="bg-dark text-white text-center" border="dark">
                    <Card.Body>
                        <Form.Label className="text-warning">Change your Platform Name</Form.Label>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="8">
                <Card className="bg-secondary text-white">
                    <Card.Body>
                        <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label className="text-warning">Platform Name</Form.Label>
                            <Form.Control type="username" value={username} onChange={updateUsername}/>
                        </Form.Group>

                        <Form.Group className="text-center" controlId="formSubmitButton">
                            <Button variant="light" onClick={handleSubmit} disabled={disableUpdate}>
                                Update Platform Name
                            </Button>
                        </Form.Group>
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
    const [disableUpdate, setDisableUpdate] = useState(true);
    const [showError, setShowError] = useState(false);

    const [updateUserField] = useMutation(UPDATE_USER_FIELD);

    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value};
        setInput(updated);
        if (updated.password !== "" && updated.confirmPassword !== ""){
            setDisableUpdate(false);
        }
    }

    const handleSubmit = async (e) => {
        if (input.password === input.confirmPassword){
            await bcrypt.hash(input.password, 10, function(err, hash){
                updateUserField({ variables: { _id: props.user._id, field: 'password', value: hash}});
            });
            setInput({
                password: "",
                confirmPassword: ""
            });
            setShowError(false);
        }
        else{
            setShowError(true);
        }

        setDisableUpdate(true);
    }

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="2">
                <Card className="bg-dark text-white text-center" border="dark">
                    <Card.Body>
                        <Form.Label className="text-warning">Change your Password</Form.Label>
                    </Card.Body>
                </Card>
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

                        <Form.Group className="text-center" controlId="formSubmitButton">
                            <Button variant="light" onClick={handleSubmit} disabled={disableUpdate}>
                                Update Password
                            </Button>
                        </Form.Group>
                        </Form>
                        {showError ?
                        <Form.Group controlId="formPasswordDontMatch" style={{marginBottom: '0'}}>
                            <Form.Label style={{color: '#ff1414', fontWeight: 'bold'}}>Passwords don't match</Form.Label>
                        </Form.Group> :
                        <div></div>}
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
    const [disableUpdate, setDisableUpdate] = useState(true);

    const [updateUserInfo] = useMutation(UPDATE_USER_INFO);

    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value};
        setInput(updated);
        setDisableUpdate(false);
    }

    const handleSubmit = async (e) => {
        var newDate = new Date(input.year, input.month, input.day)
        await updateUserInfo({ variables: { _id: props.user._id, firstName: input.firstName, lastName: input.lastName, 
            email: input.email, dateOfBirth: newDate}});
        setDisableUpdate(true);
    }

    const createOptions = (from, to) => {
        var options = [];
        if (from > to) {
            for (var i = from; i >= to; i--){
                options.push(<option key={i.toString()}>{i}</option>);
            }
        }
        else{
            for (var j = from; j <= to; j++){
                options.push(<option key={j.toString()}>{j}</option>);
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
                <Card className="bg-dark text-white text-center" border="dark">
                    <Card.Body>
                        <Form.Label className="text-warning">Change your User Info</Form.Label>
                    </Card.Body>
                </Card>
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
                                        {createOptions(2021, 1900)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group className="text-center" controlId="formSubmitButton">
                            <Button variant="light" onClick={handleSubmit} disabled={disableUpdate}>
                                Update User Info
                            </Button>
                        </Form.Group>
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
        question1: props.user.securityQuestionOne,
        answer1: props.user.securityAnswerOne,
        question2: props.user.securityQuestionTwo,
        answer2: props.user.securityAnswerTwo
    });
    const [disableUpdate, setDisableUpdate] = useState(true);

    const [UpdateSecurityQuestions] = useMutation(UPDATE_SECURITY_QUESTIONS);

    const updateInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...input, [name]: value};
        setInput(updated);
        setDisableUpdate(false);
    }

    const handleSubmit = async (e) => {
        await UpdateSecurityQuestions({ variables: { 
            _id: props.user._id, 
            question1: input.question1, answer1: input.answer1, 
            question2: input.question2, answer2: input.answer2
        }});
        
        setDisableUpdate(true);
    }

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="2">
                <Card className="bg-dark text-white text-center" border="dark">
                    <Card.Body>
                        <Form.Label className="text-warning">Change your Security Questions</Form.Label>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="8">
                <Card className="bg-secondary text-white">
                    <Card.Body>
                        <Form>
                        <Form.Group controlId="formSecurityQuestionOne">
                            <Form.Label className="text-warning">Security Question 1</Form.Label>
                            <Form.Control as="select" size="md" name="question1" value={input.question1} onChange={updateInput} custom>
                                <option>What was your childhood nickname?</option>
                                <option>What is the name of your favorite childhood friend?</option>
                                <option>What was the name of your first stuffed animal?</option>
                                <option>What is your dream car?</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formSecurityAnswerOne">
                            <Form.Label className="text-warning">Security Question 1 Answer</Form.Label>
                            <Form.Control name="answer1" value={input.answer1} onChange={updateInput} />
                        </Form.Group>

                        <Form.Group controlId="formSecurityQuestionTwo">
                            <Form.Label className="text-warning">Security Question 2</Form.Label>
                            <Form.Control as="select" size="md" name="question2" value={input.question2} onChange={updateInput} custom>
                                <option>What is the location of your dream vacation?</option>
                                <option>What is the name of your favorite sports team?</option>
                                <option>Where were you when you first heard about 9/11?</option>
                                <option>What is the name of a college you applied to but didn't attend?</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formSecurityAnswerTwo">
                            <Form.Label className="text-warning">Security Question 2 Answer</Form.Label>
                            <Form.Control name="answer2" value={input.answer2} onChange={updateInput} />
                        </Form.Group>

                        <Form.Group className="text-center" controlId="formSubmitButton">
                            <Button variant="light" onClick={handleSubmit} disabled={disableUpdate}>
                                Update Security Questions
                            </Button>
                        </Form.Group>
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
                <Card className="bg-dark text-white text-center" border="dark">
                    <Card.Body>
                        <Form.Label className="text-warning">Change your Platform Visibility</Form.Label>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="8">
                <Card className="bg-secondary text-white">
                    <Card.Body>
                        <Form>
                        <Form.Group controlId="formVisibility">
                            <Form.Label className="text-warning">Platform Visibility</Form.Label>
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

const Settingsscreen = (props) => {

    let currentUser = 'base'

    const { loading, error, data } = useQuery(GET_CURRENT_USER, {
        variables: {_id: getCurrentUser()._id}
    })
    if (loading) { return <div></div>; }
    if(error) { console.log(error);
        return <div>Internal Error</div>; }
	if(data) { currentUser = data.getUserById }

    //console.log(currentUser)

	return (
		<div className="bg-dark" style={{minHeight:"100vh"}}>
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
        </div>
	);
};

export default Settingsscreen;

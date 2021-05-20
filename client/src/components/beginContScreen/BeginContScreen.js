import React, { useState } from 'react';
import {  useQuery } from '@apollo/client';
import NavbarTop from '../navbar/NavbarTop';
import { Card, Button, Form, Col, Row, Image } from 'react-bootstrap'
import { getCurrentUser } from "../../data/LocalStorage";
import { GET_QUIZ_OWNER, GET_CURRENT_QUIZ } from './queries';
import "./BeginContScreen.css";

const QuizBaseInfo = (props) => {

    let quizOwner = {}


    console.log("id: " + props.quiz.idOfCreator);

    const { loading, error, data } = useQuery(GET_QUIZ_OWNER, {
        variables: {_id: props.quiz.idOfCreator}
    })
    if (loading) { return <div></div>; }
    if(error) { console.log(error);
        return <div>Internal Error</div>; }
	if(data) { quizOwner = data.getUserById }

    var checkedLink = quizOwner.profilePicture;
    if (typeof checkedLink === "undefined" || checkedLink === ""){
        checkedLink = "https://inquizitive416.s3.amazonaws.com/defaults/defaultAvatar.jpg";
    }

    var link = "/platform/" + props.quiz.idOfCreator;
    let quizhours = Math.floor(props.quiz.timer/3600);
    let quizminutes =  (props.quiz.timer % 3600) /60

    return (
        <Row>
            <Col xs="2"></Col>
            <Col xs="2" className="text-center">
                <a style={{ cursor: 'pointer'}} href={link}>
                    <Image className="avatar" src={checkedLink} roundedCircle />
                </a>
            </Col>
            <Col xs="4">
                <Card border="dark" className="bg-dark text-white text-center">
                    <Card.Body>
                        <Card.Title style={{fontSize: '40px'}}>{props.quiz.title}</Card.Title>
                        <br />
                        <Card.Text>Difficulty: {props.quiz.difficulty}</Card.Text>
                        <Card.Text>Time Limit: {quizhours} hours {quizminutes} minutes </Card.Text>
                        <Card.Text>{props.quiz.questions.length} Questions</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="3"></Col>
            <Col xs="1"></Col>
        </Row>
    );
}

const QuizDescription = (props) => {
    return (
        <Row>
            <Col xs="2"></Col>
            <Col xs="8">
                <Card border="dark" className="bg-secondary text-white text-center">
                    <Card.Body>
                        <Card.Text>{props.quiz.description}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="2"></Col>
        </Row>
    );
}

const StartCancelQuiz = (props) => {
    
    var link = "/play/" + props.quiz._id;

    return (
        <Row style={{height: '4vh'}}>
            <Col xs="1"></Col>
            <Col xs="2">
                <Button href="/explore" variant="warning" style={{width: '100%', height: '100%'}}>Cancel</Button>
            </Col>
            <Col xs="2"></Col>
            <Col xs="2">
                <Button id="answered" variant="secondary" style={{width: '100%', height: '100%'}} disabled>Answered: 0/{props.quiz.questions.length}</Button>
            </Col>
            <Col xs="2"></Col>
            <Col xs="2">
                <Button href={link} variant="warning" style={{width: '100%', height: '100%'}}>Begin</Button>
            </Col>
            <Col xs="1"></Col>
        </Row>
    );
}

const BeginContscreen = (props) => {

    let currentQuiz = {}
    let quizId = props.match.params.id;
    console.log(quizId);

    const { loading, error, data } = useQuery(GET_CURRENT_QUIZ, {
        variables: {_id: quizId}
    })
    if (loading) { return <div></div>; }
    if(error) { console.log(error);
        return <div>Internal Error</div>; }
	if(data) { currentQuiz = data.getQuizById }

    //console.log(currentUser)

	return (
		<div className="bg-dark" style={{minHeight:"100vh"}}>
            <NavbarTop/>
            <br />
            <QuizBaseInfo quiz={currentQuiz}/>
            <br />
            <QuizDescription quiz={currentQuiz}/>
            <br />
            <br />
            <StartCancelQuiz quiz={currentQuiz}/>
            <br />
        </div>
	);
};

export default BeginContscreen;
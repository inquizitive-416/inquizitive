import React, { useState, useEffect, Component, Fragment } from "react";
import "./explorescreen.css";
import {
  Form,
  FormLabel,
  FormControl,
  InputGroup,
  DropdownButton,
  Button,
  Dropdown,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import NavbarTop from "../navbar/NavbarTop";
import { GET_POPULAR_QUIZZES, GET_SEARCHED_QUIZZES, GET_ALL_USERS, GET_USER_BY_ID } from "./queries";
import { useQuery } from "@apollo/client";
import Pagination from "./Pagination";

const SearchBar = (props) => {
  return(
    <Form>
      <Form.Row className="align-items-center">
        <Col xs="auto" className="my-1">
          <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
            Preference
          </Form.Label>
          <Form.Control
            as="select"
            className="mr-sm-2"
            id="inlineFormCustomSelect"
            custom
          >
            <option value="0">Choose...</option>
            <option value="1">Platforms</option>
            <option value="2">Categories</option>
            <option value="3">Hashtags</option>
          </Form.Control>
        </Col>

        <Col sm={3} className="my-1">
          <Form.Label htmlFor="inlineFormInputName" srOnly>
            Search
          </Form.Label>
          <Form.Control id="inlineFormInputName" placeholder="Search" />
        </Col>

        <Col xs="auto" className="my-1">
          <Button type="submit" >Submit</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

/*
const SearchFilters = (props) => {
  return (
    <Container>
      
      <Row>
        <Col>
          <DropdownButton
            bg="#f5ae31"
            variant="#f5ae31"
            className={"dropdownStyle"}
            id="dropdown-subject-filter-button"
            title="Filter By Subject"
          >
            
            <Dropdown.Item as="button">Geography</Dropdown.Item>
            <Dropdown.Item as="button">Science</Dropdown.Item>
            <Dropdown.Item as="button">Math</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col>
          <DropdownButton
            bg="#f5ae31"
            variant="#f5ae31"
            className={"dropdownStyle"}
            id="dropdown-subject-filter-button"
            title="Filter By Difficulty"
          >
            
            <Dropdown.Item as="button">Easy</Dropdown.Item>
            <Dropdown.Item as="button">Medium</Dropdown.Item>
            <Dropdown.Item as="button">Hard</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col>
          <DropdownButton
            bg="#f5ae31"
            variant="#f5ae31"
            className={"dropdownStyle"}
            id="dropdown-subject-filter-button"
            title="Sort By Rating"
          >
            
            <Dropdown.Item as="button">Low to High Rating</Dropdown.Item>
            <Dropdown.Item as="button">High to Low Rating</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs={3}>
          <InputGroup className="mb-3 searchStyle">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">
                Search
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Search"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};
*/

const PopularQuizzes = (props) => {
  let popularQuizzes = [];
  /* Getting top 3 popular quizzes: */
  const { loading, error, data } = useQuery(GET_POPULAR_QUIZZES);
  if (loading) {
    return <div></div>;
  }
  if (error) {
    console.log(error);
    return <div>Internal Error</div>;
  }
  if (data) {
    popularQuizzes = data.getQuizzesByRating;
  }

  const createCard = (quiz) => {
    if (typeof quiz === 'undefined'){
      return (<div></div>);
    }
    var link = "/begin/" + quiz._id;
    var coverImageLink = quiz.coverImage;
    if (typeof coverImageLink === 'undefined' || coverImageLink === ''){
      coverImageLink = "https://inquizitive416.s3.amazonaws.com/defaults/defaultQuiz.jpeg";
    }

    return (
    <Col xs="4">
      <a style={{ cursor: 'pointer'}} href={link}>
        <Card className="bg-dark text-white text-center tooltipCard">
          <Card.Img style={{ width: '100%', height: '20vh', objectFit: 'cover' }} variant="top" src={coverImageLink} />
          <span className="tooltiptext">Average Rating: {quiz.avgRating}</span>
          <Card.Body>
            <h4>{quiz.title}</h4>
          </Card.Body>
        </Card>
      </a>
    </Col>
    )
  }
  return(
    <Container style={{maxWidth: "80%"}}>
      <Row style={{fontSize: "30px", color: "#ffffff", padding: '10px'}}></Row>
      <Row>
        {createCard(popularQuizzes[0])}
        {createCard(popularQuizzes[1])}
        {createCard(popularQuizzes[2])}
      </Row>
      {popularQuizzes.length > 3 ? 
      <div><br />
      <Row>
        {createCard(popularQuizzes[3])}
        {createCard(popularQuizzes[4])}
        {createCard(popularQuizzes[5])}
      </Row></div> :
      <div></div>}
    </Container>
  );
};

const ExplorePlatforms = (props) => {
  /** shows all platforms - before user searches */
  let platforms = {};

  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables: {skip: (page - 1) * 6, limit: 6}
  })
  if (loading) { return <div></div>; }
  if(error) { console.log(error);
    return <div>Internal Error</div>; }
	if(data) { platforms = data.getAllUsers }

  const createCard = (platform) => {
    if (typeof platform === 'undefined'){
      return (<div></div>);
    }
    var link = "/platform/" + platform._id;
    /** user img ? */
    return (
    <Col xs="4">
      <a style={{ cursor: 'pointer'}} href={link}>
        <Card className="bg-dark text-white text-center">
          <Card.Body>
            <h4>{platform.username}</h4>
          </Card.Body>
        </Card>
      </a>
    </Col>
    )
  }
  return(
    <Container style={{maxWidth: "80%"}}>
      <Row style={{fontSize: "30px", color: "#ffffff", padding: '10px'}}></Row>
      <Row>
        {createCard(platforms[0])}
        {createCard(platforms[1])}
        {createCard(platforms[2])}
      </Row>
      {platforms.length > 3 ? 
      <div><br />
      <Row>
        {createCard(platforms[3])}
        {createCard(platforms[4])}
        {createCard(platforms[5])}
      </Row></div> :
      <div></div>}
    </Container>
  );

};

const ExplorePlatformsSearch = (props) => {

  let quizzes = {};
  const [page, setPage] = useState(1);

  /* Return all platforms that have created quizzes in the category that the user searched for */
  const { loading, error, data } = useQuery(GET_SEARCHED_QUIZZES, {
    variables: {categories: "Chemistry", skip: (page - 1) * 6, limit: 6} /* using chemistry for example */
  })
  if (loading) { return <div></div>; }
  if(error) { console.log(error);
    return <div>Internal Error</div>; }
  if(data) { quizzes = data.getSearchedQuizzes }

  const createCard = (quiz) => {
    if (typeof quiz === 'undefined'){
      return (<div></div>);
    }
    /* links to the platform(user), not the quizzes */
    var link = "/platform/" + quiz.idOfCreator;

    return (
    <Col xs="4">
      <a style={{ cursor: 'pointer'}} href={link}>
        <Card className="bg-dark text-white text-center">
          <Card.Body>
            <h4>{quiz.idOfCreator}</h4>
          </Card.Body>
        </Card>
      </a>
    </Col>
    )
  }

  return(
    <div>
      <Container style={{maxWidth: "80%"}}>
        <Row style={{fontSize: "30px", color: "#ffffff", padding: '10px'}}></Row>
        <Row>
          {createCard(quizzes[0])}
          {createCard(quizzes[1])}
          {createCard(quizzes[2])}
        </Row>
        {quizzes.length > 3 ? 
        <div><br />
        <Row>
          {createCard(quizzes[3])}
          {createCard(quizzes[4])}
          {createCard(quizzes[5])}
        </Row></div> :
        <div></div>}
      </Container>

      {/** pagination
      <Container>
        <div>
          <div className="container">
              <div className="text-center">
                  {this.state.pageOfItems.map(quiz =>
                      <div key={quiz._id}>{quiz.title}</div>
                  )}
                  <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
              </div>
          </div>
          <div className="text-center"></div>
        </div>
      </Container>
      */}
    </div>
  );
};

/* move into exploreplatforms instead ^
const QuizPages = (props) => {
  return (
    <Container>
      <Pagination className={"center"}>
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </Container>
  );
};
*/

const Explorescreen = (props) => {
  return (
    <div className={"body"}>
      {/* Navbar on top of screen: */}
      <NavbarTop />
      <br />
      <SearchBar />
      <br />
      <span className={"headerStyle"}>Most Popular Quizzes</span>
      <br />
      <PopularQuizzes />
      <br />
      <span className={"headerStyle"}>Explore Platforms</span>
      <br />
      <ExplorePlatforms />
    </div>
  );
};

export default Explorescreen;

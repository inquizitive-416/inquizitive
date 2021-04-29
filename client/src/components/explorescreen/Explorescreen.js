import React, { useState, useEffect, Component, Fragment } from "react";
import "./explorescreen.css";
import {
  FormControl,
  InputGroup,
  DropdownButton,
  Dropdown,
  Row,
  Col,
  Card,
  Pagination,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import NavbarTop from "../navbar/NavbarTop";
import { GET_POPULAR_QUIZZES } from "./queries";
import { useQuery } from "@apollo/client";

const SearchFilters = (props) => {
  return (
    <Container>
      {/* Row of filter dropdown boxes and the search bar: */}
      <Row>
        <Col>
          <DropdownButton
            bg="#f5ae31"
            variant="#f5ae31"
            className={"dropdownStyle"}
            id="dropdown-subject-filter-button"
            title="Filter By Subject"
          >
            {/* <Dropdown.ItemText>Filter By Subject</Dropdown.ItemText> */}
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
            {/* <Dropdown.ItemText>Filter By Difficulty</Dropdown.ItemText> */}
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
            {/* <Dropdown.ItemText>Sort By Rating</Dropdown.ItemText> */}
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

  return (
    <Container>
      {/* Row of most popular quizzes: top 3 by rating*/}
      <Row>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>{popularQuizzes[0].title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>{popularQuizzes[1].title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>{popularQuizzes[2].title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const ExploreQuizzes = (props) => {
  return (
    <Container>
      {/* 2 rows of 3 quizzes per page */}
      <Row>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Shakespeare Quiz</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Learn Physics</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Hardest Quiz Ever</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Chemistry Quiz</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Name These Marvel Heroes</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Old TV Shows</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const QuizPages = (props) => {
  return (
    <Container>
      {/* will update the explorequizzes shown */}
      <Pagination className={"center"}>
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </Container>
  );
};

const Explorescreen = (props) => {
  return (
    <div className={"body"}>
      {/* Navbar on top of screen: */}
      <NavbarTop />
      <br />
      <SearchFilters />
      <br />
      <span className={"headerStyle"}>Most Popular</span>
      <br />
      <PopularQuizzes />
      <br />
      <span className={"headerStyle"}>Explore</span>
      <br />
      <ExploreQuizzes />
      <br />
      <QuizPages />
    </div>
  );
};

export default Explorescreen;

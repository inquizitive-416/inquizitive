import React, { useState, useEffect } from "react";
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
            {/* <Dropdown.ItemText>Filter By Subject</Dropdown.ItemText> */}
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
            {/* <Dropdown.ItemText>Filter By Subject</Dropdown.ItemText> */}
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
  return (
    <Container>
      {/* Row of most popular quizzes: */}
      <Row>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Biology Quiz</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>All About Disney</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={"exploreCardStyle"}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>React</Card.Title>
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
      {/* 2 rows of quizzes per page */}
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
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{6}</Pagination.Item>
        <Pagination.Item active>{7}</Pagination.Item>
        <Pagination.Item disabled>{8}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Container>
  );
};

const Explorescreen = (props) => {
  return (
    <body className={"body"}>
      <div>
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
    </body>
  );
};

export default Explorescreen;

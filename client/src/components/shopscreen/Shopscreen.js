import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

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

const PopularQuizzes = (props) => {
    return (
      <Container>
        {/* Row of most popular quizzes: */}
        <Row>
          <Col>
            <Card className={"exploreCardStyle"}>
              <Card.Img variant="top" src="./book.jpg" />
              <Card.Body>
                <Card.Title>Uber</Card.Title>
              </Card.Body>
            </Card>
            <Button style={{backgroundColor:"#f5ae31"}} centered>
                    $250
                </Button>
          </Col>
          <Col>
            <Card className={"exploreCardStyle"}>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>Starbucks</Card.Title>
              </Card.Body>
            </Card>
            <Button style={{backgroundColor:"#f5ae31"}}>
                    $150
                </Button>
          </Col>
          
        </Row>
        <Row>
            <Col>
                <Card className={"exploreCardStyle"}>
                <Card.Img variant="top"/>
                <Card.Body>
                    <Card.Title>kindle</Card.Title>
                </Card.Body>
                </Card>
                <Button style={{backgroundColor:"#f5ae31"}}>
                    $1000
                </Button>
            </Col>
            <Col>
                <Card className={"exploreCardStyle"}>
                <Card.Img variant="top" src="" />
                <Card.Body>
                    <Card.Title>Chipotle</Card.Title>
                </Card.Body>
                </Card>
                <Button style={{backgroundColor:"#f5ae31"}}>
                    $100
                </Button>
            </Col>
        </Row>
      </Container>
    );
};

const Shopscreen = (props) => {
    return (
        <body className={"body"}>
      <div>
        {/* Navbar on top of screen: */}
        <NavbarTop />
        <br />
        <PopularQuizzes />
      </div>
    </body>
    );
}
export default Shopscreen;
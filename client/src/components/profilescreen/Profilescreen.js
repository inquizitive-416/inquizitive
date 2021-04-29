import React, { useState, useEffect } from "react";
import "./profilescreen.css";
import { Row, Col, Card, Carousel } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import NavbarTop from "../navbar/NavbarTop";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "./queries";
import { getCurrentUser } from "../../data/LocalStorage";

import initprofile from "./initprofile.jpg";

const ProfileHeading = (props) => {
  let currentUsername = "Username";
  let currentCoins = 0;
  let currentPublic = false;
  let visibility = "Private";

  /* Getting user info: */
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { _id: getCurrentUser()._id },
  });
  if (loading) {
    return <div></div>;
  }
  if (error) {
    console.log(error);
    return <div>Internal Error</div>;
  }
  currentUsername = data.getUserById.username;
  currentCoins = data.getUserById.coins;
  currentPublic = data.getUserById.profilePublic;
  if (currentPublic == true) {
    visibility = "Public";
  } //else, it stays private

  return (
    <Container>
      <div className="sectionBackground">
        {/* Holds the profile img, username, visibility, and coins of user */}
        <Row>
          <Col md={3}>
            <div>
              <img
                alt="profile image"
                className="profilephoto"
                src={initprofile}
              />
            </div>
          </Col>
          <Col md={9}>
            <Row className="username">{currentUsername}</Row>
            <Row>{currentCoins} coins</Row>
            <Row>{visibility}</Row>
            <Row>My Dashboard</Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const RecentlyPlayed = (props) => {
  return (
    <Container>
      <span class="sectionHeading">Recently Played Quizzes</span>
      <div className="sectionBackground">
        {/* displays user's most recently played quizzes */}
        <Row className="smallRow">
          <Col md={4}>
            <Card className={"cardStyle"}>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>Biology Quiz</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={"cardStyle"}>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>All About Disney</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={"cardStyle"}>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>React</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const FinishedQuizzes = (props) => {
  return (
    <Container>
      <span class="sectionHeading">Finished Quizzes</span>
      <Carousel>
        <Carousel.Item>
          <div className="sectionBackground">
            {/* displays user's finished quizzes that they've taken */}
            <Row className="smallRow">
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Biology Quiz</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>All About Disney</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>React</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

const WorksInProgress = (props) => {
  return (
    <Container>
      <span class="sectionHeading">Works in Progress</span>
      <Carousel>
        <Carousel.Item>
          <div className="sectionBackground">
            {/* displays user's works in progress */}
            <Row className="smallRow">
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Biology Quiz</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>All About Disney</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>React</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

const QuizzesInProgress = (props) => {
  return (
    <Container>
      <span class="sectionHeading">Quizzes in Progress</span>
      <Carousel>
        <Carousel.Item>
          <div className="sectionBackground">
            {/* displays user's quizzes that they're currently taking */}
            <Row className="smallRow">
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Biology Quiz</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>All About Disney</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>React</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

const MyAchievements = (props) => {
  return (
    <Container>
      <span class="sectionHeading">Achievements</span>
      <Carousel>
        <Carousel.Item>
          <div className="sectionBackground">
            {/* displays user's achievements */}
            <Row className="smallRow">
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Achievement 1</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Achievement 2</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={"cardStyle"}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Achievement 3</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

const Profilescreen = (props) => {
  return (
    <body className={"body"}>
      <div>
        {/* Navbar on top of screen: */}
        <NavbarTop />
        <br />
        <ProfileHeading />
        <br />
        <RecentlyPlayed />
        <br />
        <FinishedQuizzes />
        <br />
        <WorksInProgress />
        <br />
        <QuizzesInProgress />
        <br />
        <MyAchievements />
      </div>
    </body>
  );
};

export default Profilescreen;

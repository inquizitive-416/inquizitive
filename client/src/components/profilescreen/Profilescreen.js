import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import "./profilescreen.css";
import { Container, Form, Row, Col, Card, Carousel, Image, Button, Modal } from "react-bootstrap";
import NavbarTop from "../navbar/NavbarTop";
import { GET_CURRENT_USER } from "./queries";
import { UPDATE_USER_FIELD } from './mutations';
import { getCurrentUser } from "../../data/LocalStorage";
import { SketchPicker } from 'react-color';
import { uploadFile } from 'react-s3';

const EditProfileModal = (props) => {

  const [newBannerImage, setNewBannerImage] = useState({});
  const [updatedBanner, setUpdatedBanner] = useState(false);
  const [newBgColor, setNewBgColor] = useState("#f5ae31");

  const [updateUserField] = useMutation(UPDATE_USER_FIELD);

  const handleNewImage = (e) => {
    var newImage = e.target.files[0];
    var ending = newImage.name.split(".");
    var newName = props.user._id + "." + ending[1];

    var renamedImage = new File([newImage], newName, {type: newImage.type});

    setUpdatedBanner(true);
    setNewBannerImage(renamedImage);
  }

  const handleNewColor = (color) => {
    setNewBgColor(color.hex);
  }

  const uploadNewImage = async (e) => {
    const config = {
      bucketName: 'inquizitive416',
      dirName: 'banners', // SPECIFY DIRECTORY FOR FILES HERE
      region: 'us-east-1',
      accessKeyId: 'AKIA5IBQXNKG3HMYNPZW',
      secretAccessKey: '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',
    }

    var fileLocation = "";
    
    await uploadFile(newBannerImage, config)
      .then(data => fileLocation = data.location)
      .catch(err => console.error(err));

    await updateUserField({ variables: { _id: props.user._id, field: 'bannerPicture', value: fileLocation}});
  }

  const saveChanges = async (e) => {
    if (updatedBanner){
      await uploadNewImage();
    }

    await updateUserField({ variables: { _id: props.user._id, field: 'bgColor', value: newBgColor}});
  }

  return (
    <Modal size="lg" show={props.show} onHide={props.handleToggle}>
      <Modal.Header closeButton>
        <Modal.Title>Profile Customization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Card className="bg-secondary text-white text-center">
            <Card.Body>
              <Row>
                <Col xs="3">
                  <Form.Label className="text-warning">Banner Image</Form.Label>
                </Col>
                <Col xs="9">
                  <input type="file" onChange={handleNewImage}/>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col xs="3">
                  <Form.Label className="text-warning">Background Color</Form.Label>
                </Col>
                <Col xs="9">
                  <SketchPicker color={newBgColor} onChange={handleNewColor} width="50%" presetColors={[]}/>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleToggle}>
          Cancel
        </Button>
        <Button variant="primary" onClick={saveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ProfileHeading = (props) => {

  const [editProfShow, setEditProfShow] = useState(false);

  const handleToggle = (e) => {
    setEditProfShow(!editProfShow);
  }

  return (
    <div>
      <Container>
        <div className="sectionBackground">
          <Row>
            <Col xs={3}>
              <Image className="profAvatar" src={props.user.profilePicture} roundedCircle />
            </Col>
            <Col xs={6}>
              <Row style={{fontSize: '50px', color: 'f5ae31'}}>{props.user.username}</Row>
              <Row>{props.user.coins} coins</Row>
              <Row>{props.user.visibility ? 'Public' : 'Private'}</Row>
              <Row>My Dashboard</Row>
            </Col>
            <Col>
              <Button variant="warning" onClick={handleToggle}>Customize Profile</Button>
            </Col>
          </Row>
        </div>
      </Container>
      <EditProfileModal show={editProfShow} handleToggle={handleToggle} user={props.user}/>
    </div>
  );
};

const WorksInProgress = (props) => {
  return (
    <Container>
      <span style={{fontSize: "30px", color: '#f5ae31'}}>Works in Progress</span>
      <Carousel>
        <Carousel.Item>
          <div className="sectionBackground">
            {/* displays user's works in progress */}
            <Row style={{margin: '20px'}}>
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

const Profilescreen = (props) => {

  let currentUser = 'base'

  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: {_id: getCurrentUser()._id}
  })
  if (loading) { return <div></div>; }
  if(error) { console.log(error);
    return <div>Internal Error</div>; }
	if(data) { currentUser = data.getUserById }

  console.log(currentUser)

  return (
      <div className="bg-dark">
        <NavbarTop />
        <br />
        <ProfileHeading user={currentUser}/>
        <br />
        <WorksInProgress />
        <br />
        <WorksInProgress />
        <br />
      </div>
  );
};

export default Profilescreen;

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import "./profilescreen.css";
import { Container, Form, Row, Col, Card, Carousel, Image, Button, Modal, ButtonGroup } from "react-bootstrap";
import NavbarTop from "../navbar/NavbarTop";
import { GET_CURRENT_USER, GET_PAGINIZED_QUIZZES_BY_AGE } from "./queries";
import { UPDATE_USER_FIELD } from './mutations';
import { getCurrentUser } from "../../data/LocalStorage";
import { SketchPicker } from 'react-color';
import { uploadFile } from 'react-s3';
import { SocialIcon } from 'react-social-icons';

const EditProfileModal = (props) => {

  const [newProfileImage, setNewProfileImage] = useState({});
  const [updatedProfile, setUpdatedProfile] = useState(false);
  const [newBannerImage, setNewBannerImage] = useState({});
  const [updatedBanner, setUpdatedBanner] = useState(false);
  const [newBgColor, setNewBgColor] = useState(props.currBgColor);

  const [updateUserField] = useMutation(UPDATE_USER_FIELD);

  const handleNewProfile = (e) => {
    var newImage = e.target.files[0];
    var ending = newImage.name.split(".");
    var newName = props.platform._id + "-" + Date.now() + "." + ending[1];

    var renamedImage = new File([newImage], newName, {type: newImage.type});

    setUpdatedProfile(true);
    setNewProfileImage(renamedImage);
  }

  const handleNewBanner = (e) => {
    var newImage = e.target.files[0];
    var ending = newImage.name.split(".");
    var newName = props.platform._id + "-" + Date.now() + "." + ending[ending.length - 1];

    var renamedImage = new File([newImage], newName, {type: newImage.type});

    setUpdatedBanner(true);
    setNewBannerImage(renamedImage);
  }

  const handleNewColor = (color) => {
    setNewBgColor(color.hex);
  }

  const uploadNewImage = async (directory, file, field) => {
    const config = {
      bucketName: 'inquizitive416',
      dirName: directory, // SPECIFY DIRECTORY FOR FILES HERE
      region: 'us-east-1',
      accessKeyId: 'AKIA5IBQXNKG3HMYNPZW',
      secretAccessKey: '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',
    }

    var fileLocation = "";
    
    await uploadFile(file, config)
      .then(data => fileLocation = data.location)
      .catch(err => console.error(err));

    await updateUserField({ variables: { _id: props.platform._id, field: field, value: fileLocation}});

    if (field === 'bannerPicture'){
      await props.setBannerLink(fileLocation);
    }
    else{
      await props.setProfileLink(fileLocation);
    }
  }

  const saveChanges = async (e) => {
    if (updatedBanner){
      await uploadNewImage('banners', newBannerImage, 'bannerPicture');
    }

    if (updatedProfile){
      await uploadNewImage('avatars', newProfileImage, 'profilePicture');
    }

    await updateUserField({ variables: { _id: props.platform._id, field: 'bgColor', value: newBgColor}});
    await props.setBgColor(newBgColor);

    await props.handleToggle();
  }

  return (
    <Modal size="lg" show={props.show} onHide={props.handleToggle}>
      <Modal.Header className="bg-dark text-warning" closeButton>
        <Modal.Title>Profile Customization</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <Container>
          <Card className="bg-secondary text-white text-center">
            <Card.Body>
              <Row>
                <Col xs="3">
                  <Form.Label className="text-warning">Profile Image</Form.Label>
                </Col>
                <Col xs="9">
                  <input type="file" onChange={handleNewProfile}/>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col xs="3">
                  <Form.Label className="text-warning">Banner Image</Form.Label>
                </Col>
                <Col xs="9">
                  <input type="file" onChange={handleNewBanner}/>
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
      <Modal.Footer className="bg-dark">
        <Button variant="light" onClick={props.handleToggle}>
          Cancel
        </Button>
        <Button variant="warning" onClick={saveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const EditMediaLinksModal = (props) => {

  const [newLinks, setNewLinks] = useState({
    facebook: props.links.facebook,
  });

  const updateLink = (e) => {
    const { name, value } = e.target;
    const updated = { ...newLinks, [name]: value };
    setNewLinks(updated);
  }

  return (
    <Modal size="lg" show={props.show} onHide={props.handleToggle2}>
      <Modal.Header className="bg-dark text-warning" closeButton>
        <Modal.Title>Media Link Customization</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <Container>
          <Card className="bg-secondary text-white text-center">
            <Card.Body>
              <Row className="align-items-center">
                <Col xs="3">
                  <Form.Label className="text-warning">Facebook Link:</Form.Label>
                </Col>
                <Col xs="9">
                  <Form>
                    <Form.Group>
                      <Form.Control name="facebook" value={newLinks.facebook} onChange={updateLink}></Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="light" onClick={props.handleToggle2}>
          Cancel
        </Button>
        <Button variant="warning" onClick={props.handleToggle2}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ProfileHeading = (props) => {

  var checkedLink = props.platform.profilePicture;
  if (typeof checkedLink === "undefined" || checkedLink === ""){
    checkedLink = "https://inquizitive416.s3.amazonaws.com/defaults/defaultAvatar.jpg";
  }

  const [editProfShow, setEditProfShow] = useState(false);
  const [editLinksShow, setEditLinksShow] = useState(false);
  const [profileLink, setProfileLink] = useState(checkedLink);

  // for Media Links Modal
  const [links, setLinks] = useState({
    facebook: "https://www.facebook.com/LinusTech",
  });

  const handleToggle = (e) => {
    setEditProfShow(!editProfShow);
  }

  const handleToggle2 = (e) => {
    setEditLinksShow(!editLinksShow);
  }

  return (
    <div>
      <Row className="bg-dark text-white platformInfo align-items-center">
        <Col xs={2}></Col>
        <Col xs={1} className="text-center">
          <Image className="profAvatar" src={profileLink} roundedCircle />
        </Col>
        <Col xs={4}>
          <Row style={{fontSize: '40px'}}>{props.platform.username}</Row>
        </Col>
        <Col xs={2} className="text-center">
          <SocialIcon style={{width: '4vh', height: '4vh', marginRight: '5px'}}
                      url={links.facebook} 
                      fgColor="white"></SocialIcon>
        </Col>
        <Col xs={3}>
          {props.currUser === props.platform._id ?
          <ButtonGroup>
            <Button variant="warning" onClick={handleToggle}>Customize Profile</Button>
            <Button variant="warning" onClick={handleToggle2}>Customize Media</Button>
          </ButtonGroup> :
          <div></div>}
        </Col>
      </Row>
      <EditProfileModal show={editProfShow} handleToggle={handleToggle} platform={props.platform} setBgColor={props.setBgColor} currBgColor={props.currBgColor}
                        setBannerLink={props.setBannerLink} setProfileLink={setProfileLink}/>
      <EditMediaLinksModal show={editLinksShow} handleToggle2={handleToggle2} links={links}/>
    </div>
  );
};

const RecentWorks = (props) => {

  let quizzes = {};

  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(GET_PAGINIZED_QUIZZES_BY_AGE, {
    variables: {idOfCreator: props.platform._id, skip: (page - 1) * 8, limit: 8}
  })
  if (loading) { return <div></div>; }
  if(error) { console.log(error);
    return <div>Internal Error</div>; }
	if(data) { quizzes = data.getPaginizedQuizzesByAge }

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
    <Col xs="3">
      <a style={{ cursor: 'pointer'}} href={link}>
        <Card className="bg-dark text-white text-center">
          <Card.Img style={{ width: '100%', height: '20vh', objectFit: 'cover' }} variant="top" src={coverImageLink} />
          <Card.Body>
            <h4>{quiz.title}</h4>
          </Card.Body>
        </Card>
      </a>
    </Col>
    )
  }

  return (
    <Container style={{maxWidth: "80%"}}>
      <Row style={{fontSize: "30px", color: "#ffffff", padding: '10px'}}>Recent Quizzes</Row>
      <Row>
        {createCard(quizzes[0])}
        {createCard(quizzes[1])}
        {createCard(quizzes[2])}
        {createCard(quizzes[3])}
      </Row>
      {quizzes.length > 4 ? 
      <div><br />
      <Row>
        {createCard(quizzes[4])}
        {createCard(quizzes[5])}
        {createCard(quizzes[6])}
        {createCard(quizzes[7])}
      </Row></div> :
      <div></div>}
    </Container>
  );
};

const Profilescreen = (props) => {

  let currentPlatform = 'base';
  let currUserId = getCurrentUser()._id;
  let platformId = props.match.params.id;
  const [bgColor, setBgColor] = useState("blank");
  const [bannerLink, setBannerLink] = useState("blank");

  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: {_id: platformId}
  })
  if (loading) { return <div></div>; }
  if(error) { console.log(error);
    return <div>Internal Error</div>; }
	if(data) { currentPlatform = data.getUserById }

  // set the state only once
  if (bgColor === "blank"){
    setBgColor(currentPlatform.bgColor);
  }
  if (bannerLink === "blank"){
    setBannerLink(currentPlatform.bannerPicture);
  }

  // if bg color or banner link arent set use these as defaults
  if (bgColor === null){
    setBgColor("#808080")
  }
  if (bannerLink === null){
    setBannerLink("https://inquizitive416.s3.amazonaws.com/defaults/defaultBanner.jpeg");
  }

  return (
      <div style={{backgroundColor: bgColor, minHeight: '100vh'}}>
        <NavbarTop />
        <Image className="bannerImage" src={bannerLink}/>
        <br />
        <ProfileHeading platform={currentPlatform} setBgColor={setBgColor} currBgColor={bgColor} setBannerLink={setBannerLink} currUser={currUserId}/>
        <br />
        <RecentWorks platform={currentPlatform}/>
        <br />
      </div>
  );
};

export default Profilescreen;

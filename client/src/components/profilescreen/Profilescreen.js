import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import "./profilescreen.css";
import { Container, Form, Row, Col, Card, Image, Button, Modal, ButtonGroup } from "react-bootstrap";
import NavbarTop from "../navbar/NavbarTop";
import { GET_CURRENT_PLATFORM, GET_PAGINIZED_QUIZZES_BY_AGE } from "./queries";
import { UPDATE_USER_FIELD } from './mutations';
import { getCurrentUser } from "../../data/LocalStorage";
import { SketchPicker } from 'react-color';
import { uploadFile } from 'react-s3';
import { SocialIcon } from 'react-social-icons';
import verifiedImg from './verified.png';

const EditProfileModal = (props) => {

  const [newProfileImage, setNewProfileImage] = useState({});
  const [updatedProfile, setUpdatedProfile] = useState(false);
  const [newBannerImage, setNewBannerImage] = useState({});
  const [updatedBanner, setUpdatedBanner] = useState(false);
  const [newBgColor, setNewBgColor] = useState(props.currBgColor);
  const [disableUpdate, setDisableUpdate] = useState(true);

  const [updateUserField] = useMutation(UPDATE_USER_FIELD);

  const handleNewProfile = (e) => {
    var newImage = e.target.files[0];
    var ending = newImage.name.split(".");
    var newName = props.platform._id + "-" + Date.now() + "." + ending[1];

    var renamedImage = new File([newImage], newName, {type: newImage.type});

    setUpdatedProfile(true);
    setNewProfileImage(renamedImage);
    setDisableUpdate(false);
  }

  const handleNewBanner = (e) => {
    var newImage = e.target.files[0];
    var ending = newImage.name.split(".");
    var newName = props.platform._id + "-" + Date.now() + "." + ending[ending.length - 1];

    var renamedImage = new File([newImage], newName, {type: newImage.type});

    setUpdatedBanner(true);
    setNewBannerImage(renamedImage);
    setDisableUpdate(false);
  }

  const handleNewColor = (color) => {
    setNewBgColor(color.hex);
    setDisableUpdate(false);
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
    setDisableUpdate(true);
  }

  const handleAway = (e) => {
    setDisableUpdate(true);
    props.handleToggle();
  }

  return (
    <Modal size="lg" show={props.show} onHide={handleAway}>
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
        <Button variant="light" onClick={handleAway}>
          Cancel
        </Button>
        <Button variant="warning" onClick={saveChanges} disabled={disableUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const EditMediaLinksModal = (props) => {

  const [newLinks, setNewLinks] = useState({
    facebook: props.links.facebook,
    twitter: props.links.twitter,
    youtube: props.links.youtube,
    instagram: props.links.instagram,
    custom: props.links.custom,
  });
  const [updated, setUpdated] = useState({
    facebook: false,
    twitter: false,
    youtube: false,
    instagram: false,
    custom: false,
  });
  const [disableUpdate, setDisableUpdate] = useState(true);

  const [updateUserField] = useMutation(UPDATE_USER_FIELD);

  const updateLink = (e) => {
    const { name, value } = e.target;
    const updatedLinks = { ...newLinks, [name]: value };
    const updatedBools = { ...updated, [name]: true };

    setNewLinks(updatedLinks);
    setUpdated(updatedBools);
    setDisableUpdate(false);
  }

  const handleLink = async (link, status, matchUrl) => {
    if (status && (link.includes(matchUrl) || matchUrl === "custom")) {
      var concatLink = matchUrl + "Link"
      await updateUserField({ variables: { _id: props.platform._id, field: concatLink, value: link }});

      return true;
    }
    return false;
  }

  const handleUpdate = async (e) => {
    var facebookUpdate = await handleLink(newLinks.facebook, updated.facebook, "facebook");
    var twitterUpdate = await handleLink(newLinks.twitter, updated.twitter, "twitter");
    var youtubeUpdate = await handleLink(newLinks.youtube, updated.youtube, "youtube");
    var instagramUpdate = await handleLink(newLinks.instagram, updated.instagram, "instagram");
    var customUpdate = await handleLink(newLinks.custom, updated.custom, "custom");

    var newSetLinks = { ...newLinks };
    newSetLinks = facebookUpdate ? { ...newSetLinks, facebook: newLinks.facebook } : { ...newSetLinks };
    newSetLinks = twitterUpdate ? { ...newSetLinks, twitter: newLinks.twitter } : { ...newSetLinks };
    newSetLinks = youtubeUpdate ? { ...newSetLinks, youtube: newLinks.youtube } : { ...newSetLinks };
    newSetLinks = instagramUpdate ? { ...newSetLinks, instagram: newLinks.instagram } : { ...newSetLinks };
    newSetLinks = customUpdate ? { ...newSetLinks, custom: newLinks.custom } : { ...newSetLinks };

    await props.setLinks(newSetLinks);

    setDisableUpdate(true);
    await props.handleToggle2()
  }

  const handleAway = (e) => {
    setDisableUpdate(true);
    props.handleToggle2();
  }

  return (
    <Modal size="lg" show={props.show} onHide={handleAway}>
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
              <br />
              <Row className="align-items-center">
                <Col xs="3">
                  <Form.Label className="text-warning">Twitter Link:</Form.Label>
                </Col>
                <Col xs="9">
                  <Form>
                    <Form.Group>
                      <Form.Control name="twitter" value={newLinks.twitter} onChange={updateLink}></Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <br />
              <Row className="align-items-center">
                <Col xs="3">
                  <Form.Label className="text-warning">Youtube Link:</Form.Label>
                </Col>
                <Col xs="9">
                  <Form>
                    <Form.Group>
                      <Form.Control name="youtube" value={newLinks.youtube} onChange={updateLink}></Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <br />
              <Row className="align-items-center">
                <Col xs="3">
                  <Form.Label className="text-warning">Instagram Link:</Form.Label>
                </Col>
                <Col xs="9">
                  <Form>
                    <Form.Group>
                      <Form.Control name="instagram" value={newLinks.instagram} onChange={updateLink}></Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <br />
              <Row className="align-items-center">
                <Col xs="3">
                  <Form.Label className="text-warning">Custom Link:</Form.Label>
                </Col>
                <Col xs="9">
                  <Form>
                    <Form.Group>
                      <Form.Control name="custom" value={newLinks.custom} onChange={updateLink}></Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="light" onClick={handleAway}>
          Cancel
        </Button>
        <Button variant="warning" onClick={handleUpdate} disabled={disableUpdate}>
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

  var verified = props.platform.verified;
  if (typeof checkedLink === "undefined" || checkedLink === ""){
    verified = "false";
  }

  const [editProfShow, setEditProfShow] = useState(false);
  const [editLinksShow, setEditLinksShow] = useState(false);
  const [profileLink, setProfileLink] = useState(checkedLink);

  // for Media Links Modal
  const [links, setLinks] = useState({
    facebook: props.platform.facebookLink == null ? "" : props.platform.facebookLink,
    twitter: props.platform.twitterLink == null ? "" : props.platform.twitterLink,
    youtube: props.platform.youtubeLink == null ? "" : props.platform.youtubeLink,
    instagram: props.platform.instagramLink == null ? "" : props.platform.instagramLink,
    custom: props.platform.customLink == null ? "" : props.platform.customLink,
  });

  const handleToggle = (e) => {
    setEditProfShow(!editProfShow);
  }

  const handleToggle2 = (e) => {
    setEditLinksShow(!editLinksShow);
  }

  const createSocialIcon = (link) => {
    if (link === ""){
      return;
    }
    else {
      return <SocialIcon style={{width: '4vh', height: '4vh', marginRight: '5px'}}
                         url={link} 
                         fgColor="white"></SocialIcon>
    }
  }

  return (
    <div>
      <Row className="bg-dark text-white platformInfo align-items-center">
        <Col xs={2}></Col>
        <Col xs={1} className="text-center">
          <Image className="profAvatar" src={profileLink} roundedCircle />
        </Col>
        <Col xs={4}>
          <Row className="align-items-center" style={{fontSize: '40px'}}>
            {props.platform.username}
            {verified === "true" ?
            <Image src={verifiedImg} style={{width: '4vh', height: '4vh', marginLeft: '5px'}} /> :
            <div></div>}
          </Row>
        </Col>
        <Col xs={2} className="text-center">
          {createSocialIcon(links.facebook)}
          {createSocialIcon(links.twitter)}
          {createSocialIcon(links.youtube)}
          {createSocialIcon(links.instagram)}
          {createSocialIcon(links.custom)}
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
      <EditProfileModal show={editProfShow} handleToggle={handleToggle} platform={props.platform} 
                        setBgColor={props.setBgColor} currBgColor={props.currBgColor}
                        setBannerLink={props.setBannerLink} setProfileLink={setProfileLink}/>
      <EditMediaLinksModal show={editLinksShow} handleToggle2={handleToggle2} platform={props.platform} 
                           links={links} setLinks={setLinks}/>
    </div>
  );
};

const RecentWorks = (props) => {

  let quizzes = {};

  const [scrollBot, setScrollBot] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (scrollBot) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'auto'
      });
    }
  });

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
    if(props.myplatform === true)
    {
      var link = "/create/" + quiz._id
    }
    else{
      var link = "/begin/" + quiz._id;

    }
    
    var coverImageLink = quiz.coverimage;

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

  const handleNewPage = (e) => {
    const { name } = e.target;
    var nameInt = parseInt(name);
    setPage(nameInt);
    setScrollBot(true);
  }

  const createPaginations = () => {
    let items = [];
    let pages = props.numOfQuizzes / 8 + 1;
    for (var i = 1; i < pages; i++){
      items.push(
        <Button variant="warning" name={i} onClick={handleNewPage} disabled={i === page}>
          {i}
        </Button>
      );
    }
    return items;
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
      <div><br />
      <Row>
        <Col xs="3">
          <Card className="bg-dark text-white text-center" style={{ visibility: 'hidden'}}>
            <Card.Img style={{ width: '100%', height: '20vh', objectFit: 'cover' }} variant="top" src="https://inquizitive416.s3.amazonaws.com/defaults/defaultQuiz.jpeg" />
            <Card.Body>
              <h4>"bruh"</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row></div>}
      <br />
      <Row>
        <Col className="text-center">
          <ButtonGroup>
            {createPaginations()}
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

const Profilescreen = (props) => {

  let currentPlatform = 'base';
  let currUserId = getCurrentUser()._id;
  let platformId = props.match.params.id;
  let numOfQuizzes = -1;
  
  const [bgColor, setBgColor] = useState("blank");
  const [bannerLink, setBannerLink] = useState("blank");
  let myplatform = false

  const { loading, error, data} = useQuery(GET_CURRENT_PLATFORM, {
    variables: {_id: platformId}
  })
  if (loading) { return <div></div>; }
  if(error) { console.log(error);
    return <div>Internal Error</div>; }
	if(data) { currentPlatform = data.getUserById;
             numOfQuizzes = data.getAllQuizzesFromCreator.length; }

  // set the state only once

  if (platformId === currUserId)                                    //sara block
  {
   myplatform = true
  }
  else{
    myplatform = false
  }
  
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
        <RecentWorks platform={currentPlatform} myplatform = {myplatform} numOfQuizzes={numOfQuizzes}/>        
        <br />
      </div>
  );
};

export default Profilescreen;

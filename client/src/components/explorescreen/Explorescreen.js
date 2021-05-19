import React, { useState, useEffect, Component, Fragment, Select, SearchField } from "react";
import { ButtonGroup } from "react-bootstrap";
import "./explorescreen.css";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import NavbarTop from "../navbar/NavbarTop";
import { GET_POPULAR_QUIZZES, GET_SEARCHED_PLATFORMS_COUNT, GET_SEARCHED_CATEGORY_COUNT, SEARCH_BY_CATEGORY, SEARCH_BY_HASHTAG, GET_ALL_USERS, GET_ALL_USERS_COUNT, GET_SEARCHED_PLATFORMS, GET_ALL_QUIZZES_COUNT, FILTER_BY_DIFFICULTY } from "./queries";
import { useQuery } from "@apollo/client";
import SearchBar from './SearchBar';

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
  
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(GET_ALL_USERS, {
    variables: {skip: (page - 1) * 6, limit: 6}
  })
  const { loading, error, data } = useQuery(GET_ALL_USERS_COUNT);

  if (loadingUser) { return <div></div>; }
  if(errorUser) { console.log(error);
    return <div>Internal Error</div>; }
	if(dataUser) { platforms = dataUser.getAllUsers }

  let numOfPlatforms = 0; //GET # OF PLATFORMS
  if (loading) { return <div></div>; }
  if(error) { console.log(error);
    return <div>Internal Error</div>; }
	if(data) { numOfPlatforms = data.getAllUsersCount.length }

  const createCard = (platform) => {
    if (typeof platform === 'undefined'){
      return (<div></div>);
    }
    var link = "/platform/" + platform._id;
    var profileImg  = platform.profilePicture;
    if(profileImg == "" ){ profileImg = "https://inquizitive416.s3.amazonaws.com/defaults/defaultQuiz.jpeg" }

    return (
    <Col xs="4">
      <a style={{ cursor: 'pointer'}} href={link}>
        <Card className="bg-dark text-white text-center">
          <Card.Img style={{ width: '100%', height: '20vh', objectFit: 'cover' }} variant="top" src={profileImg} />
          <Card.Body>
            <h4>{platform.username}</h4>
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
  }

  const createPaginations = () => {
    let items = [];
    let pages = numOfPlatforms / 6 + 1;
    for (var i = 1; i < pages; i++){
      items.push(
        <Button variant="warning" name={i} onClick={handleNewPage} disabled={i === page}>
          {i}
        </Button>
      );
    }
    return items;
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

const ExplorePlatformSearch = (props) => {
  let platforms = {};
  const [page, setPage] = useState(1);

  const { loading:LoadingPlatform, error:errorPlatform, data:dataPlatform } = useQuery(GET_SEARCHED_PLATFORMS, {
    variables: {username: "nasa", skip: (page - 1) * 6, limit: 6}
  })
  const { loading, error, data } = useQuery(GET_SEARCHED_PLATFORMS_COUNT, {
    variables: {username: "nasa"}
  })

  if (LoadingPlatform) { return <div></div>; }
  if(errorPlatform) { console.log(errorPlatform);
    return <div>Internal Error</div>; }
  if(dataPlatform) { platforms = dataPlatform.getSearchedPlatforms }

  let numOfPlatforms = 0; //GET # OF PLATFORMS
  if (loading) { return <div></div>; }
  if(error) { console.log(error);
    return <div>Internal Error</div>; }
	if(data) { numOfPlatforms = data.getSearchedPlatformsCount.length }

  const createCard = (platform) => {
    if (typeof platform === 'undefined'){
      return (<div></div>);
    }
    var link = "/platform/" + platform._id;
    var profileImg  = platform.profilePicture;
    if(profileImg == "" ){ profileImg = "https://inquizitive416.s3.amazonaws.com/defaults/defaultQuiz.jpeg" }

    return (
    <Col xs="4">
      <a style={{ cursor: 'pointer'}} href={link}>
        <Card className="bg-dark text-white text-center">
          <Card.Img style={{ width: '100%', height: '20vh', objectFit: 'cover' }} variant="top" src={profileImg} />
          <Card.Body>
            <h4>{platform.username}</h4>
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
  }

  const createPaginations = () => {
    let items = [];
    let pages = numOfPlatforms / 6 + 1;
    for (var i = 1; i < pages; i++){
      items.push(
        <Button variant="warning" name={i} onClick={handleNewPage} disabled={i === page}>
          {i}
        </Button>
      );
    }
    return items;
  }

  return(
    <div>
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
        <br />
      <Row>
        <Col className="text-center">
          <ButtonGroup>
            {createPaginations()}
          </ButtonGroup>
        </Col>
      </Row>
      </Container>

    </div>
  );
};

const ExploreCategorySearch = (props) => {
  let quizzes = {};
  const [page, setPage] = useState(1);
  /* Return all quizzes in that category the user searched for if there are any */
  const { loading:loadingCat, error:errorCat, data:dataCat } = useQuery(SEARCH_BY_CATEGORY, {
    variables: {categories: "biology", skip: (page - 1) * 6, limit: 6} /* using biology for example */
  })
  const { loading, error, data } = useQuery(GET_SEARCHED_CATEGORY_COUNT, {
    variables: {categories: "biology"}
  })

  if (loadingCat) { return <div></div>; }
  if(errorCat) { console.log(errorCat);
    return <div>Internal Error</div>; }
  if(dataCat) { quizzes = dataCat.searchByCategory }

  let numOfQuizzes = 0; //GET # OF PLATFORMS
  if (loading) { return <div></div>; }
  if(error) { console.log(error);
    return <div>Internal Error</div>; }
	if(data) { numOfQuizzes = data.getSearchedCategoryCount.length }

  const createCard = (quiz) => {
    if (typeof quiz === 'undefined'){
      return (<div></div>);
    }
    var link = "/begin/" + quiz._id;
    var quizImg  = quiz.coverimage;
    if(quizImg == "" ){ quizImg = "https://inquizitive416.s3.amazonaws.com/defaults/defaultQuiz.jpeg" }

    return (
    <Col xs="4">
      <a style={{ cursor: 'pointer'}} href={link}>
        <Card className="bg-dark text-white text-center tooltipCard">
          <Card.Img style={{ width: '100%', height: '20vh', objectFit: 'cover' }} variant="top" src={quizImg} />
          <span className="tooltiptext">Average Rating: {quiz.avgRating}</span>
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
  }

  const createPaginations = () => {
    let items = [];
    let pages = numOfQuizzes / 6 + 1;
    for (var i = 1; i < pages; i++){
      items.push(
        <Button variant="warning" name={i} onClick={handleNewPage} disabled={i === page}>
          {i}
        </Button>
      );
    }
    return items;
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
        <br />
      <Row>
        <Col className="text-center">
          <ButtonGroup>
            {createPaginations()}
          </ButtonGroup>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

const ExploreHashtagSearch = (props) => {
  let quizzes = {};
  const [page, setPage] = useState(1);
  /* Return all quizzes with the hashtag the user searched for if there are any */
  const { loading, error, data } = useQuery(SEARCH_BY_HASHTAG, {
    variables: {hashtag: "maps", skip: (page - 1) * 6, limit: 6}
  })
  if (loading) { return <div></div>; }
  if(error) { console.log(error);
    return <div>Internal Error</div>; }
  if(data) { quizzes = data.searchByHashtag}

  const createCard = (quiz) => {
    if (typeof quiz === 'undefined'){
      return (<div></div>);
    }
    var link = "/quiz/" + quiz._id;
    var quizImg  = quiz.coverimage;
    if(quizImg == "" ){ quizImg = "https://inquizitive416.s3.amazonaws.com/defaults/defaultQuiz.jpeg" }

    return (
    <Col xs="4">
      <a style={{ cursor: 'pointer'}} href={link}>
        <Card className="bg-dark text-white text-center">
          <Card.Img style={{ width: '100%', height: '20vh', objectFit: 'cover' }} variant="top" src={quizImg} />
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
  }

  let numOfQuizzes = 12; //GET # OF QUIZZES

  const createPaginations = () => {
    let items = [];
    let pages = numOfQuizzes / 6 + 1;
    for (var i = 1; i < pages; i++){
      items.push(
        <Button variant="warning" name={i} onClick={handleNewPage} disabled={i === page}>
          {i}
        </Button>
      );
    }
    return items;
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
        <br />
      <Row>
        <Col className="text-center">
          <ButtonGroup>
            {createPaginations()}
          </ButtonGroup>
        </Col>
      </Row>
      </Container>
    </div>
  );
}; //giving 400 error on query

const FilterByDifficulty = (props) => {
  let quizzes = {};
  const [page, setPage] = useState(1);
  let diff = "Easy";

  const { loading: loadingQuiz, error: errorQuiz, data: dataQuiz } = useQuery(FILTER_BY_DIFFICULTY, {
    variables: {difficulty: diff, skip: (page - 1) * 6, limit: 6}
  })
  const { loading, error, data } = useQuery(GET_ALL_QUIZZES_COUNT);

  if (loadingQuiz) { return <div></div>; }
  if(errorQuiz) { console.log(errorQuiz);
    return <div>Internal Error</div>; }
	if(dataQuiz) { quizzes = dataQuiz.filterByDifficulty }

  let numOfQuizzes = 0; //GET # OF QUIZZES
  if (loading) { return <div></div>; }
  if(error) { console.log(error);
    return <div>Internal Error</div>; }
	if(data) { numOfQuizzes = data.getAllQuizzesCount.length }

  const createCard = (quiz) => {
    if (typeof quiz === 'undefined'){
      return (<div></div>);
    }
    var link = "/begin/" + quiz._id;
    var quizImg  = quiz.coverimage;
    if(quizImg == "" ){ quizImg = "https://inquizitive416.s3.amazonaws.com/defaults/defaultQuiz.jpeg" }

    return (
    <Col xs="4">
      <a style={{ cursor: 'pointer'}} href={link}>
        <Card className="bg-dark text-white text-center tooltipCard">
          <Card.Img style={{ width: '100%', height: '20vh', objectFit: 'cover' }} variant="top" src={quizImg} />
          <span className="tooltiptext">Average Rating: {quiz.avgRating}</span>
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
  }

  const createPaginations = () => {
    let items = [];
    let pages = numOfQuizzes / 6 + 1;
    for (var i = 1; i < pages; i++){
      items.push(
        <Button variant="warning" name={i} onClick={handleNewPage} disabled={i === page}>
          {i}
        </Button>
      );
    }
    return items;
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
        <br />
      <Row>
        <Col className="text-center">
          <ButtonGroup>
            {createPaginations()}
          </ButtonGroup>
        </Col>
      </Row>
      </Container>
    </div>
  );
} //internal error on query

class Explorescreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchfield:'init', categoryVar:'', platformVar:'', filterDifficulty:''};
    
    this.handlePlatform = this.handlePlatform.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }
  
  handlePlatform() {
    this.setState({searchfield: 'platform'});
  }
  handleCategory() {
    this.setState({searchfield: 'category'});
  }

  handleCatVar(e) {
    this.setState({categoryVar: e.target.value});
  }
  handlePlatVar(e) {
    this.setState({platformVar: e.target.value});
  }

  render (){
    if(this.state.searchfield==='init'){
      return(
      <div className={"body"}>
        {/* Navbar on top of screen: */}
        <NavbarTop />
        <br />
        <SearchBar placeholder={"Search"}  />
        <br/>
          <Col xs="auto" className="my-1">
              <Button type="submit" variant="warning" onClick={this.handlePlatform}>Platform</Button>
              <Button type="submit" variant="warning" onClick={this.handleCategory}>Category</Button>
          </Col>
        <br />
        <span className={"headerStyle"}>Most Popular Quizzes</span>
        <br />
        <PopularQuizzes />
        <br />
        <span className={"headerStyle"}>Explore Platforms</span>
        <br />
        <ExplorePlatforms  />
      </div>
      );
    }
    else if(this.state.searchfield==='platform'){
      return(
        <div className={"body"}>
          <NavbarTop />
          <br />
          <SearchBar placeholder={"Search"} />
          <br/>
          <Col xs="auto" className="my-1">
              <Button type="submit" variant="warning" onClick={this.handlePlatform}>Platform</Button>
              <Button type="submit" variant="warning" onClick={this.handleCategory}>Category</Button>
          </Col>
          <br />
          <span className={"headerStyle"}>Explore 'nasa' Platforms</span>
          <br />
          <ExplorePlatformSearch />
        </div>
        );
    }
    else{
      return(
        <div className={"body"}>
          <NavbarTop />
          <br />
          <SearchBar placeholder={"Search"} />
          <br/>
          <Col xs="auto" className="my-1">
              <Button type="submit" variant="warning" onClick={this.handlePlatform}>Platform</Button>
              <Button type="submit" variant="warning" onClick={this.handleCategory}>Category</Button>
          </Col>
          <br />
          <span className={"headerStyle"}>Explore 'biology' Quizzes</span>
          <br />
          <ExploreCategorySearch />
        </div>
        );
    }
  }
}

export default Explorescreen;

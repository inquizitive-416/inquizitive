import React, {useState}from "react";
import "./styles.css";
import { Card, Button, Form, Col, Row } from 'react-bootstrap'


const Star = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

const StarRating = ({ totalStars }) => {
  const [starsSelected, selectStar] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => selectStar(i + 1)}
        />
      ))}
      <p style = {{color: "goldenrod"}}>
        {starsSelected} of {totalStars} stars
      </p>
    </div>
  );
};


const RatingBar = (props) =>  {
  
  return (

    <Card style = {{}}>
  <Card.Header style = {{backgroundColor: "grey", color: "gold", fontSize: 20, paddingLeft: 630}}><b>Rate This Quiz </b></Card.Header>
  <Card.Body style={{backgroundColor: "#353434"}}>
  <div style={{width: 900, paddingLeft: 508}}>
       <StarRating totalStars={5} />
   </div>
    
    
  </Card.Body>
</Card>
   
  

  
  );
}
export default RatingBar;

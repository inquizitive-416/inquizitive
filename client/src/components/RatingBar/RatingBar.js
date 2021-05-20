import React, {useState}from "react";
import "./styles.css";
import { Card, Button, Form, Col, Row } from 'react-bootstrap'


const Star = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

const StarRating = ({ totalStars , onRate}) => {

  

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
      <button style= {{backgroundColor: "gold"}} onClick = {()=>onRate(starsSelected)} class= "btn btn-primary" >Submit rating </button>
    </div>
  );
};


const RatingBar = (props) =>  {
  
  return (

    <Card style={{width:495}}>
  <Card.Header style = {{backgroundColor: "grey", color: "gold", fontSize: 20,paddingLeft:172}}><b>Rate This Quiz </b></Card.Header>
  <Card.Body style={{backgroundColor: "#353434"}}>
  <div style={{width:450}}>
       <StarRating totalStars={5} onRate={props.onRate}/>
       
   </div>
    
    
  </Card.Body>
</Card>
   
  

  
  );
}
export default RatingBar;

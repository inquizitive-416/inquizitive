import React from "react";
import StarRating from 'react-star-rating'




const RatingBar = (props) =>  {
  
  return (
   
   <div>
       <StarRating name="react-star-rating" caption="Rate this component!" totalStars={5} />

        <button type="submit" className="btn btn-primary">Submit Rating</button>

   </div>
    

  
  );
}
export default RatingBar;

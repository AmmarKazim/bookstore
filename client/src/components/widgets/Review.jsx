import React from "react";
import Rating from "./Rating";

// represents a review
function Review({ review }) {
  return (
    <article className="review mt-3 p-1">
      <div className="header">
        <h5 className="m-0">{review.user}</h5>
      </div>
      <div className="body">
        <div className="content">
          <small>Review:</small>
          <p className="m-0">{review.feedback}</p>
        </div>
        <div className="rating ">
          <small>Rating:</small>
          <Rating stars={review.stars} />
        </div>
      </div>
    </article>
  );
}

export default Review;

import React, { useEffect, useContext } from "react";
import Rating from "./Rating";
import UserContext from "../../state_contexts/user_context";
import { deleteReview } from "../../libraries/reviews";

// represents a review
function Review({ review, loadReviews }) {
  // accessing user state
  const { user, setUser } = useContext(UserContext);

  return (
    <article className="review mt-3 p-1 bg-body-tertiary">
      <div className="header d-flex justify-content-between">
        <h5 className="m-0">{review.user}</h5>
        {user && user.displayname == review.user && (
          <button
            className="btn"
            onClick={async (e) => {
              await deleteReview(review.id);
              await loadReviews();
            }}
          >
            <i className="bi bi-trash3"></i>
          </button>
        )}
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

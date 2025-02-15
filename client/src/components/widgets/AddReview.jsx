import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchReviewsForProduct, postReview } from "../../libraries/reviews";
import Rating from "./Rating";

function AddReview(props) {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(3);

  return (
    <article>
      <form
        className="d-grid"
        role="add-review"
        onSubmit={async (event) => {
          event.preventDefault();
          // post this review and reload all reviews for this product
          if (props.user) {
            const formData = new FormData(event.target);
            const userId = props.user.id;
            const feedback = formData.get("feedback");
            const rating = formData.get("rating-slider");
            const productId = props.productId;
            const timestamp = new Date();
            const result = await postReview(
              userId,
              feedback,
              rating,
              productId,
              timestamp
            );
            // TODO: if user has already posted a review, retrieve that back and place into input fields and then update review in db
            if (result == "OK") {
              const allReviews = await fetchReviewsForProduct(productId);
              props.setReviews(allReviews);
            } else {
              window.alert("There was an error posting your review.");
            }
          } else {
            window.alert("You must log-in to post your review.");
            navigate("/account");
          }
        }}
      >
        <fieldset className="d-flex flex-column mb-2">
          <legend>Enter your review</legend>
          <label htmlFor="review-textarea">Feedback :-</label>
          <textarea
            name="feedback"
            id="feedback"
            rows="3"
            placeholder="Enter your review here."
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          ></textarea>
          <label htmlFor="rating-slider">Rating: {rating}</label>
          <Rating stars={rating} />
          <div className="d-flex justify-content-between">
            <small>1</small>
            <small>2</small>
            <small>3</small>
            <small>4</small>
            <small>5</small>
          </div>
          <input
            className="mt-3"
            type="range"
            name="rating-slider"
            id="rating-slider"
            value={rating}
            min={1}
            step={1}
            max={5}
            onChange={(e) => {
              setRating(parseInt(e.target.value));
            }}
          />
        </fieldset>
        <input className="btn btn-primary mt-1" type="submit" value="Submit" />
      </form>
    </article>
  );
}

export default AddReview;

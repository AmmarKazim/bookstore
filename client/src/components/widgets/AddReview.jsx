import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postReview, updateReview } from "../../libraries/reviews";
import Rating from "./Rating";
import UserContext from "../../state_contexts/user_context";
import UserReviewContext from "../../state_contexts/userReviewContext";

function AddReview({ productId, loadReviews }) {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(3);
  const { userReview } = useContext(UserReviewContext);
  // accessing user state
  const { user, setUser } = useContext(UserContext);
  const [previousReview, setPreviousReview] = useState(null);

  useEffect(() => {
    try {
      if (userReview.length > 0) {
        setPreviousReview(userReview[0]);
        setFeedback(userReview[0].feedback);
        setRating(userReview[0].stars);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userReview]);

  return (
    <article>
      <form
        className="d-grid"
        id="addReview"
        role="add-review"
        onSubmit={async (event) => {
          event.preventDefault();
          // post this review and reload all reviews for this product
          if (user) {
            const formData = new FormData(event.target);
            const userId = user.id;
            const feedback = formData.get("feedback");
            const rating = formData.get("rating-slider");
            const timestamp = new Date();
            if (feedback.trim()) {
              let result = previousReview
                ? await updateReview(
                    previousReview.id,
                    feedback,
                    rating,
                    timestamp
                  )
                : await postReview(
                    userId,
                    feedback,
                    rating,
                    productId,
                    timestamp
                  );
              if (result == "OK") {
                await loadReviews();
                setFeedback("");
                setRating(3);
              } else {
                window.alert("There was an error posting your review.");
              }
            } else {
              alert("Empty feedback can't be submitted.");
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
            className="form-control"
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
            className="mt-3 form-control border-0"
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
        <input
          className="btn btn-primary mt-1"
          type="submit"
          value={previousReview ? "Update" : "Submit"}
        />
      </form>
    </article>
  );
}

export default AddReview;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { addToCartItem } from "../../libraries/cart";
import UserContext from "../../state_contexts/user_context";
import { fetchReviewsForProduct } from "../../libraries/reviews";
import Review from "../widgets/Review";
import AddReview from "../widgets/AddReview";
import Rating from "../widgets/Rating";
import { loadUser } from "../../libraries/user";

// product details page
function Product() {
  // retrieving url parameters
  const { id } = useParams();
  // retrieving book parameter/state from navigation
  const { state: book } = useLocation();
  // accessing user state
  const { user, setUser } = useContext(UserContext);
  // local state management
  const [reviews, setReviews] = useState([]);
  const [bookRating, setBookRating] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    loadUser(setUser);
    const loadReviews = async () => {
      const reviews = await fetchReviewsForProduct(id);
      setReviews(reviews);
    };
    loadReviews();
  }, []);

  // calculate and set/show book rating
  useEffect(() => {
    let initialStars = 0;
    let totalStars = reviews.reduce(
      (prevStarsAccumulator, currentReview, index, reviews) => {
        return prevStarsAccumulator + currentReview.stars;
      },
      initialStars
    );
    let averageRating = totalStars / reviews.length;
    averageRating = Math.round(averageRating);
    averageRating && setBookRating(averageRating);
  }, [reviews]);

  return (
    <main className="container">
      {/* img, title, price, rating, and add-to-cart button */}
      <section className="mt-5">
        <div className="product-details d-flex justify-content-center">
          <div className="img-di pe-2 pe-sm-4 pe-md-5 me-2 me-sm-4 me-md-5 border-end">
            <img className="product-img" src={book.cover} alt={book.title} />
          </div>
          <div className="product-information">
            <h1 className="product-title">{book.title}</h1>
            <p className="m-0 p-0">Rs. {book.price}</p>
            <div className="product-title-rating mt-4">
              <p className="m-0 p-0">Rating: {bookRating}</p>
              <Rating stars={bookRating} />
              <p className="m-0 p-0">Reviews: {reviews.length}</p>
            </div>
            <div className="product-buttons mt-4">
              <button
                className="btn btn-primary m-0"
                onClick={(e) => {
                  if (user) {
                    addToCartItem(book, true);
                  } else {
                    window.alert("You must log-in to add this item to cart.");
                    navigate("/account");
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <hr className="mt-5 w-75 mx-auto" />
      {/* description */}
      <section className="mt-5">
        <article className="product-description">
          <h2>Product Description</h2>
          <p>{book.description}</p>
        </article>
      </section>
      <hr className="mt-5 w-75 mx-auto" />
      {/* reviews */}
      <section className="reviews">
        <h2>Public Reviews</h2>
        {/* show each review */}
        {reviews.map((review, i) => (
          <Review key={i} review={review} />
        ))}
         <hr className="mt-5 w-75 mx-auto" />
        {/* add new review */}
        <AddReview user={user} productId={book.id} setReviews={setReviews} />
      </section>
    </main>
  );
}

export default Product;

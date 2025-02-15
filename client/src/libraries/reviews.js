import axios from "axios";

async function fetchReviewsForProduct(product_id) {
  const reviewsResponse = await axios.get(
    `http://localhost:3000/reviews/${product_id}`,
    {
      withCredentials: true,
    }
  );
  const reviews = reviewsResponse.data;
  return reviews;
}

async function postReview(userId, feedback, rating, productId, timestamp) {
  const response = await axios.post(
    "http://localhost:3000/reviews",
    {
      userId: userId,
      feedback: feedback,
      stars: rating,
      productId: productId,
      timestamp: timestamp,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
}

export { fetchReviewsForProduct, postReview };

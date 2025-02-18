import { db } from "../app.js";

// fetch and return either reviews for product_id or a false flag
async function fetchReviewsForProduct(review_productid) {
  try {
    const result = await db.query(
      ` SELECT reviews.id, users.displayname AS user, reviews.feedback, reviews.stars, reviews.timestamp
      FROM reviews 
      JOIN users ON (reviews.userid = users.id)
      WHERE (reviews.productid = $1);`,
      [review_productid]
    );
    return result.rows;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function postReview(db, userid, feedback, rating, productid, timestamp) {
  try {
    await db.query(
      "INSERT INTO reviews (userid, feedback, stars, productid, timestamp) VALUES ($1, $2, $3, $4, $5);",
      [userid, feedback, rating, productid, timestamp]
    );
    return process.env.SUCCESSSTATUS;
  } catch (e) {
    console.log(e);
    return process.env.FAILURESTATUS;
  }
}

async function deleteReview(db, id) {
  try {
    await db.query("DELETE FROM reviews WHERE id=$1;", [id]);
    return process.env.SUCCESSSTATUS;
  } catch (e) {
    console.log(e);
    return process.env.FAILURESTATUS;
  }
}

async function updateReview({ id, feedback, stars, timestamp }) {
  try {
    await db.query(
      `UPDATE reviews
      SET feedback = $2, stars = $3, timestamp = $4
      WHERE id=$1;`,
      [id, feedback, stars, timestamp]
    );
    return process.env.SUCCESSSTATUS;
  } catch (e) {
    console.log(e);
    return process.env.FAILURESTATUS;
  }
}

export { fetchReviewsForProduct, postReview, deleteReview, updateReview };

/*
CREATE TABLE reviews (id SERIAL, userid INTEGER NOT NULL, feedback TEXT, stars INTEGER, productid INTEGER NOT NULL, timestamp TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (userid) REFERENCES users(id), FOREIGN KEY (productid) REFERENCES books(id));
INSERT INTO reviews (userid, feedback, stars, productid, timestamp) VALUES (1, 'This is test feedback for History of Art.', 1, 1, '2016-06-22 19:10:25-07');
INSERT INTO reviews (userid, feedback, stars, productid, timestamp) VALUES (2, 'This is test feedback for Basic Physics.', 2, 2, '2020-08-24 07:06:30');
SELECT * FROM reviews;
*/

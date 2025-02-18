import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";
import { fetchAllCategories } from "./helpers/categories_helper.js";
import { fetchAllBooks } from "./helpers/books_helper.js";
import {
  deleteReview,
  fetchReviewsForProduct,
  postReview,
  updateReview,
} from "./helpers/reviews_helper.js";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  verifyUser,
  registerUser,
  logoutSession,
} from "./helpers/auth_helper.js";

// creating an express backend app/server
const app = express();
// configuring/starting dotenv values
dotenv.config();

// --------------------------------- MIDDLEWARES ---------------------------------

// using cros-origin-resource-sharing middleware
app.use(
  cors({
    origin: process.env.CORSORIGIN,
    credentials: true,
  })
);
// using request body parser middleware to access req.body
app.use(express.urlencoded({ extended: true }));
// using espress session persistence middleware
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
// using and initializing passport middleware
app.use(passport.initialize());
// using passport sessions
app.use(passport.session());
// creating a db connection
export const db = new pg.Client({
  user: process.env.DATABASEUSER,
  password: process.env.DATABASEPASSWORD,
  host: process.env.DATABASEHOST,
  port: process.env.DATABASEPORT,
  database: process.env.DATABASENAME,
});
// connecting to db
try {
  db.connect();
} catch (e) {
  console.log(e);
}
// using local strategy as passport middleware
passport.use(new LocalStrategy("local", verifyUser));

// --------------------------------- ROUTES ---------------------------------

// returns either logged-in user or false flag
app.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send(null);
  }
});

// login user credentials with local-strategy and redirect to GET("/me")
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/me",
    failureRedirect: "/me",
  })
);

// register new user and redirect to GET("/me")
app.post("/register", registerUser);

// logout user and redirect to GET("/me")
app.delete("/logout", logoutSession);

// returns either all-categories or failure-status
app.get("/categories", async (req, res) => {
  const categories = await fetchAllCategories();
  if (categories) {
    res.send(categories);
  } else {
    res.sendStatus(process.env.FAILURESTATUS);
  }
});

// returns either all-books or failure-status
app.get("/books", async (req, res) => {
  const books = await fetchAllBooks();
  if (books) {
    res.send(books);
  } else {
    res.sendStatus(process.env.FAILURESTATUS);
  }
});

// returns either all-reviews for parameter product_id or a failure-status
app.get("/reviews/:product_id", async (req, res) => {
  // accessing product_id parameter as an integer
  const product_id = parseInt(req.params.product_id);
  const reviews = await fetchReviewsForProduct(product_id);
  if (reviews) {
    res.send(reviews);
  } else {
    res.sendStatus(process.env.FAILURESTATUS);
  }
});

// returns either success-status or failure-status
app.post("/reviews", async (req, res) => {
  // extract review from req
  const { userId, feedback, stars, productId, timestamp } = req.body;
  // post review in db
  const result = await postReview(
    db,
    userId,
    feedback,
    stars,
    productId,
    timestamp
  );
  res.sendStatus(result);
});

// returns eith success-status or failure-status
app.delete("/review/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteReview(db, id);
  res.sendStatus(result);
});
// returns eith success-status or failure-status
app.patch("/review", async (req, res) => {
  const result = await updateReview(req.body);
  res.sendStatus(result);
});

// --------------------------------- SESSION MANAGEMENT ---------------------------------

// app.use(session) creates req.session, app.use(passport.session) creates req.session.passport, and serializing creates req.session.passport.user
passport.serializeUser((user, cb) => {
  cb(null, user);
});
// deserializes/unfolds req.session.passport.user to req.user
passport.deserializeUser((user, cb) => {
  cb(null, user);
});
// starting express app server
app.listen(process.env.PORT, () => {
  console.log(`app listening at port ${process.env.PORT}`);
});

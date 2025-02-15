import { db } from "../app.js";
import { fetchUser, insertUser } from "./users_helper.js";

// login user with email & password using passport
async function verifyUser(username, password, done) {
  const user = await fetchUser(db, username);
  // user found in db
  if (user) {
    // credentials matched
    if (password == user.password) {
      return done(null, user);
    } // wrong credentials
    else {
      return done(null, false);
    }
  } // user not found in db
  else {
    return done(null, false);
  }
}

// insert new user in db & login using passport
async function registerUser(req, res) {
  const { username, password, displayname } = req.body;
  const prevUser = await fetchUser(db, username);
  // user already registered
  if (prevUser) {
    res.send("User already regitered. Please login.");
  } // add new user in db
  else {
    const newUser = await insertUser(db, username, password, displayname);
    // adding new user successful
    if (newUser) {
      // login newly created/added user
      req.login(newUser, (err) => {
        err && console.log(err);
        res.redirect("/me");
      });
    } // adding new user failure
    else {
      res.redirect("/me");
    }
  }
}

// logout user from current session using passport
function logoutSession(req, res) {
  req.logout((err) => {
    if (err) {
      console.log(err)
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
}

export { verifyUser, registerUser, logoutSession };

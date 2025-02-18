import axios from "axios";
import UserContext from "../state_contexts/user_context";

// fetch the currently logged in user
const fetchUser = async () => {
  const { data: user } = await axios.get("http://localhost:3000/me", {
    withCredentials: true,
  });
  return user;
};

const loginUser = async (username, password) => {
  // send url-encoded request
  const { data: user } = await axios.post(
    // request path
    "http://localhost:3000/login",
    // request data
    { username: username, password: password },
    // request configs
    {
      // provide credentials to use cookies in expressjs
      withCredentials: true,
      // meta data about request
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return user;
};

const logoutUser = async () => {
  const { data: response } = await axios.delete(
    "http://localhost:3000/logout",
    {
      withCredentials: true,
    }
  );
  return response;
};

const registerUser = async (username, password, displayname) => {
  // send url-encoded request
  const { data: user } = await axios.post(
    "http://localhost:3000/register",
    {
      username: username,
      password: password,
      displayname: displayname,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return user;
};

const resetPassword = async () => {};

// load logged in user
const loadUser = async (setUser) => {
  const user = await fetchUser();
  setUser(user);
};

export {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  loadUser,
};

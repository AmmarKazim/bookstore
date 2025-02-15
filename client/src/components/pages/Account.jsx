import React, { useContext, useEffect } from "react";
import { loadUser, logoutUser } from "../../libraries/user";
import UserContext from "../../state_contexts/user_context";
import { useNavigate } from "react-router-dom";

// account page
function Account() {
  // accessing user state from context
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser(setUser);
  }, []);

  return (
    <main className="flex-grow-1 container d-flex justify-content-center align-items-center">
      {user ? (
        <section className="d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1>Welcome, {user.displayname}!</h1>
            <p>{JSON.stringify(user)}</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={async (e) => {
              await logoutUser();
              loadUser(setUser);
            }}
          >
            Logout
          </button>
        </section>
      ) : (
        <section className="d-flex flex-column justify-content-center align-items-center">
          {/* else if user not logged in, show login & signup buttons */}
          <h1>To continue to your account</h1>
          <div>
            <button
              className="btn btn-primary ms-1"
              onClick={(e) => {
                navigate("/account/signin");
              }}
            >
              Login
            </button>
            <button
              className="btn btn-primary ms-1"
              onClick={(e) => {
                navigate("/account/signup");
              }}
            >
              Singup
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default Account;

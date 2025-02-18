import React, { useContext, useEffect } from "react";
import { loadUser, logoutUser } from "../../libraries/user";
import UserContext from "../../state_contexts/user_context";
import { NavLink } from "react-router-dom";

// account page
function Account() {
  // accessing user state from context
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    loadUser(setUser);
  }, []);

  return (
    <main className="flex-grow-1 container d-flex justify-content-center align-items-center bg-body-tertiary">
      {user ? (
        <section className="">
          <h1>
            Welcome <b>{user.displayname},</b>
          </h1>
          <p>
            Email: <b>{user.username}</b>
          </p>
          <p>
            DisplayName: <b>{user.displayname}</b>
          </p>
          <p>
            Password: <b>{user.password}</b>
          </p>
          <button
            className="btn btn-primary"
            onClick={async (e) => {
              await logoutUser();
              await loadUser(setUser);
            }}
          >
            Logout
          </button>
        </section>
      ) : (
        <section className="text-center">
          <i className="bi bi-book h1"></i>
          <div className="card p-2 bg-body-light d-flex flex-column justify-content-evenly shadow">
            <h1>Welcome to Book Store</h1>
            <div className="card-body d-grid">
              <NavLink className="btn btn-primary m-2" to="/account/signin">
                Sing-in
              </NavLink>
              <NavLink className="btn btn-primary m-2" to="/account/signup">
                Sing-up
              </NavLink>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Account;

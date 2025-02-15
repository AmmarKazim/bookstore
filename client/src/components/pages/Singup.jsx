import React from "react";
import { registerUser } from "../../libraries/user";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <main className="flex-grow-1 container d-flex flex-column justify-content-center align-items-center">
      <section className="card p-2">
        <form
          className="d-grid"
          method="post"
          role="register"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get("username");
            const password = formData.get("password");
            const displayname = formData.get("displayname");
            const user = await registerUser(username, password, displayname);
            if (user) {
              navigate("/account");
            } else {
              console.log("error logging the user");
            }
          }}
        >
          <fieldset className="d-flex flex-column mb-2">
            <legend>Register</legend>
            <label htmlFor="username">Username: </label>
            <input
              className="mb-2"
              type="text"
              name="username"
              placeholder="Email"
            />
            <label htmlFor="password">Password: </label>
            <input
              className="mb-2"
              type="text"
              name="password"
              placeholder="Password"
            />
            <label htmlFor="displaname">Display Name: </label>
            <input
              className="mb-1"
              type="text"
              name="displayname"
              placeholder="Display Name"
            />
          </fieldset>
          <input className="btn btn-primary" type="submit" value="Register" />
        </form>
      </section>
    </main>
  );
}

export default Signup;

import React, { useState } from "react";
import { registerUser } from "../../libraries/user";
import { NavLink, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  // to show/hide password in input field
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex-grow-1 container d-flex flex-column justify-content-center align-items-center bg-body-tertiary">
      <i className="bi bi-book h1"></i>
      <section className="card signup-card p-2 bg-body-light d-flex flex-column justify-content-evenly shadow">
        <h1 className="text-center">Register a new account</h1>
        <form
          method="post"
          role="register"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get("username");
            const password = formData.get("password");
            const displayname = formData.get("displayname");
            if (username && password && displayname) {
              const user = await registerUser(username, password, displayname);
              if (user) {
                navigate("/account");
              } else {
                console.log("error logging the user");
              }
            } else {
              alert("Please provide all fields.");
            }
          }}
        >
          <fieldset className="d-flex flex-column mb-2">
            <legend>Register</legend>
            <label className="form-label" htmlFor="username">
              Username:
            </label>
            <input
              className="mb-2 form-control"
              type="email"
              name="username"
              placeholder="Email"
            />
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <div className="d-flex align-items-center form-control p-0">
              <input
                className="mb-1 form-control border-0"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
              />
              <i
                className={`bi ${
                  showPassword ? "bi-eye-slash" : "bi-eye"
                } ms-2 me-1`}
                onClick={(e) => {
                  setShowPassword((prev) => !prev);
                }}
              ></i>
            </div>

            {/* <input
              className="mb-2 form-control"
              type="password"
              name="password"
              placeholder="Password"
            /> */}
            <label className="form-label" htmlFor="displaname">
              Display Name:
            </label>
            <input
              className="mb-1 form-control"
              type="text"
              name="displayname"
              placeholder="Display Name"
            />
          </fieldset>
          <input
            className="btn btn-primary form-control"
            type="submit"
            value="Register"
          />
        </form>
        <p>
          If you already have an account{" "}
          <NavLink to="/account/signin">Sign-in</NavLink>.
        </p>
      </section>
    </main>
  );
}

export default Signup;

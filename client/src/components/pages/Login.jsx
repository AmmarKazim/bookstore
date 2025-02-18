import React, { useEffect, useState } from "react";
import { loginUser } from "../../libraries/user";
import { NavLink, useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  // to show/hide password in input field
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex-grow-1 container d-flex flex-column justify-content-center align-items-center bg-body-tertiary">
      <i className="bi bi-book h1"></i>
      <section className="card signin-card p-2 bg-body-light d-flex flex-column justify-content-evenly shadow">
        <h1 className="text-center">Log-in to your account</h1>
        <form
          method="post"
          role="login"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get("username");
            const password = formData.get("password");
            if (username && password) {
              const user = await loginUser(username, password);
              if (user) {
                navigate("/account");
              } else {
                console.log("error logging the user");
              }
            } else {
              alert("Please provide both email and password");
            }
          }}
        >
          <fieldset className="d-flex flex-column mb-2">
            <legend>Login</legend>
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
          </fieldset>
          <input
            className="btn btn-primary form-control"
            type="submit"
            value="Login"
          />
        </form>
        <p>
          If you don not have an account{" "}
          <NavLink to="/account/signup">Sign-up</NavLink>.
        </p>
      </section>
    </main>
  );
}

export default Signin;

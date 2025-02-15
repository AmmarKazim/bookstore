import React from "react";
import { NavLink } from "react-router-dom";

// navigate between pages
function Navbar() {
  return (
    <nav className="order-2 col-8 order-sm-2 col-sm-8 order-md-3 col-md-4 d-flex justify-content-end align-items-center">
      <menu className="d-flex justify-content-end align-items-center list-unstyled m-0">
        <NavLink className="nav-link text-light" to={"/"}>
          Home
        </NavLink>
        <NavLink className="nav-link text-light" to={"/cart"}>
          Cart
        </NavLink>
        <NavLink className="nav-link text-light" to={"/account"}>
          Account
        </NavLink>
      </menu>
    </nav>
  );
}

export default Navbar;

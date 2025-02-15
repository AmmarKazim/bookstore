import React from "react";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import { NavLink } from "react-router-dom";

// top widget containing logo, search bar, and navigation links
function Header() {
  return (
    <header className="bg-primary">
      <div className="container row mx-auto p-0">
        <span className="order-1 col-4 order-sm-1 col-sm-4 order-md-1 col-md-2 overflow-hidden d-flex justify-content-start align-items-center">
          <NavLink to={"/"}>
            <i className="bi bi-book h1 text-light px-2 logo"></i>
          </NavLink>
        </span>
        <Searchbar />
        <Navbar />
      </div>
    </header>
  );
}

export default Header;

import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductsContext from "../../state_contexts/products_context";
import $ from "jquery";

function Header() {
  // accessing products state context
  const { products, setProducts, allProducts } = useContext(ProductsContext);

  const searchResults = (searchTerm) => {
    if (searchTerm) {
      const filteredBooks = allProducts.filter((book, i) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredBooks);
    } else {
      setProducts(allProducts);
    }
  };

  // adding jQuery code
  useEffect(() => {
    // fire/trigger a button.navbar-toggler click event to toggle menu
    const toggleMenu = (e) => {
      // for mobile
      if (window.screen.width < 576) {
        setTimeout(() => {
          $("#root > div > header > section > button").trigger("click");
        }, [100]);
      }
    };
    // when .logo is clicked
    $("#root > div > header > section > span > a").on("click", toggleMenu);
    // when <a> link is clicked
    $("header nav ul li a").on("click", toggleMenu);
  });

  return (
    <header
      className="navbar navbar-expand-lg bg-primary m-0 p-0"
      role="navigation"
    >
      <section className="container-fluid m-0 px-1">
        <span className="navbar-brand m-0 p-0">
          <NavLink to={"/"}>
            <i className="bi bi-book fs-1 text-light px-2 logo"></i>
          </NavLink>
        </span>
        <button
          className="navbar-toggler text-light border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-1 text-light"></i>
        </button>
        <nav className="navbar-collapse collapse" id="navbarContent">
          <form
            className="d-flex mx-auto"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const searchTerm = formData.get("search");
              searchResults(searchTerm);
            }}
          >
            <input
              className="form-control me-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="search"
            />
            <button className="btn btn-outline-light px-3" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link active" aria-current="page">
                <NavLink to="/">Home</NavLink>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link">
                <NavLink to="/account">Account</NavLink>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link">
                <NavLink to="/cart">Cart</NavLink>
              </span>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}

export default Header;

import React, { useState, useContext, useEffect } from "react";
import ProductsContext from "../../state_contexts/products_context";
import $ from "jquery";
import SelectedCategoryContext from "../../state_contexts/selected_category_context";

// to filter products based on
function PriceFilter() {
  const [icon, setIcon] = useState("plus");
  // accessing products state context
  const { products, setProducts, allProducts } = useContext(ProductsContext);
  // accessing selected category state
  const { selectedCategory, setSelectedCategory } = useContext(
    SelectedCategoryContext
  );

  return (
    <div className="filter-tile" id="filter-tile">
      <div className="d-grid">
        <button
          className="btn btn-block d-inline d-flex justify-content-between align-items-center p-0 border-0"
          type="button"
          id="priceFilterButton"
          data-bs-target="#priceFilter"
          onClick={(e) => {
            // update icon after toggling filter tile
            _setIcon("priceFilter", setIcon);
            setTimeout(() => {
              _setIcon("priceFilter", setIcon);
            }, 500);
          }}
        >
          <h6 className="d-inline">Price</h6>
          <i className={`bi bi-${icon} filterToggleIcon`} />
        </button>
      </div>
      <div id="priceFilter">
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.target);
              const minPrice = formData.get("minPrice");
              const maxPrice = formData.get("maxPrice");
              // if price fields are not empty
              if (minPrice && maxPrice) {
                // filter books within given price range
                const filteredBooks = products.filter(
                  (book, i) => minPrice < book.price && book.price < maxPrice
                );
                setProducts(filteredBooks);
                setSelectedCategory("");
              }
              // if price fields are empty
              else {
                setProducts(allProducts);
                setSelectedCategory("");
              }
            }}
            role="price-filter"
            className="d-flex justify-content-between"
          >
            <input
              type="number"
              className="form-control"
              name="minPrice"
              placeholder="min"
              min={0}
            />
            <input
              type="number"
              className="form-control"
              name="maxPrice"
              placeholder="max"
              min={0}
            />
            <input
              type="submit"
              value="Apply"
              className="btn btn-primary white-space-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default PriceFilter;

// update icon in filter button according to .class set by bootstrap
const _setIcon = (identifier, setIcon) => {
  const filterBody = document.querySelector(`.filter-tile #${identifier}`);
  if (filterBody.classList.contains("show")) {
    setIcon("dash");
  } else if (filterBody.classList.contains("collapsing")) {
    setIcon("x");
  } else {
    setIcon("plus");
  }
};

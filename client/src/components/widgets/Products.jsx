import React from "react";
import ProductTile from "./ProductTile";

// to show product-tile for each product
function Products({ books }) {
  return (
    <section className="col-12 col-md-8 col-lg-9 p-0 m-0">
      <h1>Product List</h1>
      <section className="row m-0 p-0">
        {books && books.length > 0 ? (
          books.map((book, i) => <ProductTile key={i} book={book} />)
        ) : (
          <p>No products found yet...</p>
        )}
      </section>
    </section>
  );
}

export default Products;

import React, { useContext } from "react";
import ProductsContext from "../../state_contexts/products_context";

// used to search/filter products results
function Searchbar() {
  // accessing products state context
  const { products, setProducts, allProducts } = useContext(ProductsContext);

  const filterResults = (event) => {
    const title = event.target.value;
    if (title) {
      const filteredBooks = allProducts.filter((book, i) =>
        book.title.toLowerCase().includes(title.toLowerCase())
      );
      setProducts(filteredBooks);
    } else {
      setProducts(allProducts);
    }
  };

  return (
    <search className="order-3 col-12 order-sm-3 col-sm-12 order-md-2 col-md-6 my-auto">
      <form role="search" className="search-bar d-flex m-0 p-0 py-1">
        <input
          type="text"
          name="searchText"
          placeholder="Search"
          className="text-box py-1"
          onChange={filterResults}
        />
      </form>
    </search>
  );
}

export default Searchbar;

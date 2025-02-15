import React, { useState, useEffect, useContext } from "react";
import Categories from "../widgets/Categories";
import Filters from "../widgets/Filters";
import Products from "../widgets/Products";
import fetchAllCategories from "../../libraries/categories.js";
import ProductsContext from "../../state_contexts/products_context.js";
import { loadUser } from "../../libraries/user.js";
import UserContext from "../../state_contexts/user_context.js";

// Home page
function Home() {
  // managing categories state
  const [categories, setCategories] = useState([]);
  // accessing/managing global states
  const { products, setProducts, allProducts } = useContext(ProductsContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const loadAllCategories = async () => {
      const categories = await fetchAllCategories();
      setCategories(categories);
    };
    loadAllCategories();
    loadUser(setUser);
  }, []);

  return (
    <main className="container">
      <Categories categories={categories} />
      <div className="row m-0 p-0">
        <Filters allBooks={products} setFilteredBooks={setProducts} />
        <Products books={products} />
      </div>
    </main>
  );
}

export default Home;

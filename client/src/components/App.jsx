import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./widgets/Header";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import Footer from "./widgets/Footer";
import UserContext from "../state_contexts/user_context";
import Signup from "./pages/Singup";
import Signin from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import ProductsContext from "../state_contexts/products_context.js";
import { fetchAllBooks } from "../libraries/products.js";
import SelectedCategoryContext from "../state_contexts/selected_category_context.js";

// App component to return header, pages (under routes), and footer
function App() {
  // managing these states gloablly
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  // use allProduct state to reset results to allProducts when clearing filters
  const [allProducts, setAllProducts] = useState([]);
  // state for currently selected category (to highlight that visually)
  const [selectedCategory, setSelectedCategory] = useState("");

  // to run non-react specific code.
  useEffect(() => {
    const loadAllProductsFromDB = async () => {
      const books = await fetchAllBooks();
      setProducts(books);
      setAllProducts(books);
    };
    loadAllProductsFromDB();
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* provide ProductsContext to access/manage products search/filtering globally */}
      <ProductsContext.Provider
        value={{
          products,
          setProducts,
          allProducts,
        }}
      >
        <SelectedCategoryContext.Provider
          value={{ selectedCategory, setSelectedCategory }}
        >
          <Header />
          {/* provide UserContext to access/manage login state globaly */}
          <UserContext.Provider value={{ user, setUser }}>
            {/* setting routes to their corresponding pages */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              {/* using nested routes */}
              <Route path="/account">
                <Route index element={<Account />} />
                <Route path="signup" element={<Signup />} />
                <Route path="signin" element={<Signin />} />
                <Route
                  path="password-recovery"
                  element={<PasswordRecovery />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserContext.Provider>
        </SelectedCategoryContext.Provider>
      </ProductsContext.Provider>
      <Footer />
    </div>
  );
}

export default App;

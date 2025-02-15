import React, { useContext, useEffect, useState } from "react";
import {
  addToCartItem,
  clearCart,
  removeFromCart,
  getCartItems,
} from "../../libraries/cart.js";
import { calculateOrder } from "../../libraries/orders.js";
import { loadUser } from "../../libraries/user.js";
import UserContext from "../../state_contexts/user_context.js";

// cart page
function Cart() {
  // cart-items state
  const [cartItems, setCartItems] = useState(getCartItems());
  const [orderSummary, setOrderSummary] = useState({
    totalItems: 0,
    totalAmount: 0,
  });
  // user state
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setOrderSummary(calculateOrder(getCartItems()));
  }, [cartItems]);

  useEffect(() => {
    loadUser(setUser);
  }, []);

  return (
    <main className="container">
      <div className="row">
        <section className="order-items col-12 col-md-8">
          <div className="d-flex justify-content-between mt-3">
            <h1>Order Items</h1>
            <button
              className="btn px-3"
              onClick={(e) => {
                if (cartItems.length > 0) {
                  clearCart();
                  setCartItems(getCartItems());
                }
              }}
            >
              <span>Clear Cart</span> <i className="bi bi-trash3 h3"></i>
            </button>
          </div>
          <hr />
          {cartItems.map(
            (item, i) =>
              item.quantity > 0 && (
                <div key={i}>
                  <div className="d-flex justify-content-between align-items-center my-1 cart-tile">
                    <div>
                      <img
                        className="cart-tile-img"
                        src={item.cover}
                        alt={item.title}
                      />
                    </div>
                    <div className="cart-tile-controls">
                      <p className="m-0 p-0 h5 text-wrap">{item.title}</p>
                      <small>Rs {item.price}</small>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="m-0 px-2 btn"
                          onClick={(e) => {
                            removeFromCart(item);
                            setCartItems(getCartItems());
                          }}
                        >
                          <i className="bi bi-dash-lg"></i>
                        </button>
                        <p className="m-0 p-0">{item.quantity}</p>
                        <button
                          className="m-0 px-2 btn"
                          onClick={(e) => {
                            addToCartItem(item);
                            setCartItems(getCartItems());
                          }}
                        >
                          <i className="bi bi-plus-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              )
          )}
        </section>
        <section className="order-summary col-12 col-md-4">
          <h1>Order Summary</h1>
          <p>Total Items: {orderSummary.totalItems}</p>
          <p>Total Amount: Rs {orderSummary.totalAmount}</p>
          <button className="btn btn-success" onClick={(e) => {}}>
            Check Out
          </button>
        </section>
      </div>
    </main>
  );
}

export default Cart;

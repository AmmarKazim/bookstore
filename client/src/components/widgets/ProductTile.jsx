import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addToCartItem } from "../../libraries/cart";
import UserContext from "../../state_contexts/user_context";

// to show quick details about product
function ProductTile(props) {
  const { book } = props;
  const { id, title, cover, price, category } = book;
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  return (
    <section className="p-0 col-6 col-lg-4 col-xl-3">
      <div className="card product-tile m-2 shadow">
        <img src={cover} className="card-img-top" alt={title} />
        <div className="card-body p-0 m-1">
          <h5 className="card-title mb-0">{title}</h5>
          <p className="card-text mb-0">Rs. {price}</p>
          <hr className="mt-1 mb-2 mx-auto p-0 w-75" />
          <button
            className="btn btn-primary m-0 p-0 px-1 mb-1 me-1"
            onClick={(e) => {
              navigate(`/product/${id}`, { state: book });
            }}
          >
            Product Details
          </button>
          <button
            className="btn btn-primary m-0 p-0 px-1 mb-1 me-1"
            onClick={(e) => {
              if (user) {
                addToCartItem(book, true);
              } else {
                window.alert("You must log-in to add this item to cart.");
                navigate("/account/signin");
              }
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductTile;

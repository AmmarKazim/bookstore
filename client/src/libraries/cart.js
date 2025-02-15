// return cart-items from local-storage, if not yet initialized, store and return empty array
const getCartItems = () => {
  let cartItems;
  const isCartItemsInitialized = localStorage.getItem("cartItems");
  if (isCartItemsInitialized) {
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
  } else {
    localStorage.setItem("cartItems", "[]");
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
  }
  return cartItems;
};

// if item already in cart, increment its quantity by 1, else add it with quantity equals 1, also show alert to notify user
const addToCartItem = (item, showAlert = false) => {
  // get previous cart-items
  let cartItems = getCartItems();
  // check if item is already in cart
  const isItemAlreadyInCart = cartItems.find(
    (cartItem) => cartItem.id == item.id
  );
  // if item is already in cart, increment its quantity
  if (isItemAlreadyInCart) {
    cartItems = cartItems.map((cartItem) =>
      cartItem.id == item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // else, push item to cart-items setting its quantity to 1
  else {
    // cartItems.push({ ...item, quantity: 1 });
    cartItems = [...cartItems, { ...item, quantity: 1 }];
  }
  // store updated cartItems in localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // notify user that item has been added to cart
  if (showAlert) {
    window.alert("Item added to cart");
  }
};

// decrement quantity by 1, if quantity 0, remove item from cartItems
const removeFromCart = (item) => {
  // get previous cart-items
  let cartItems = getCartItems();
  // decrement quantity for the item
  cartItems = cartItems.map((cartItem, i) => {
    if (cartItem.id == item.id) {
      return cartItem.quantity > 0
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem;
    } else {
      return cartItem;
    }
  });
  // remove all cart items with quantity = 0
  cartItems.filter((cartItem) => cartItem.quantity > 0);
  // store updated cartItems in localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const clearCart = () => {
  localStorage.setItem("cartItems", "[]");
};

export { getCartItems, addToCartItem, removeFromCart, clearCart };

// get total amout and num of products for the order
const calculateOrder = (items) => {
  let order = { totalItems: 0, totalAmount: 0 };
  items.forEach((item) => {
    order.totalAmount = order.totalAmount + item.quantity * item.price;
    order.totalItems = order.totalItems + item.quantity;
  });
  return order;
};

export { calculateOrder };

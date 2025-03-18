// Action Types (use consistent naming for the action types)
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// Action Creators
export const addToCart = (product, quantity) => {
  return {
    type: ADD_TO_CART,
    payload: {
      id: product.id,
      name: product.name,  // Assuming product.name exists at this level
      price: product.price,
      quantity: quantity,
      sellerId: product.sellerId,
    }
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { id: productId }
  };
};

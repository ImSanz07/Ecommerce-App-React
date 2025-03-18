import { ADD_TO_CART, REMOVE_FROM_CART } from "./CartActions";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        totalAmount: state.totalAmount + action.payload.price * action.payload.quantity,
        totalQuantity: parseInt(state.totalQuantity) + parseInt(action.payload.quantity),
      };
    case REMOVE_FROM_CART:
      // Remove the product from the cart and update the total amount and quantity
      const removedItem = state.cartItems.find(item => item.id === action.payload.id);
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
        totalAmount: state.totalAmount - removedItem.price * removedItem.quantity,
        totalQuantity: state.totalQuantity - removedItem.quantity,
      };
    default:
      return state;
  }
};

export default CartReducer;

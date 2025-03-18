import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "./CartActions";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // Check if the item already exists in the cart
      if (existingItemIndex >= 0) {
        const updatedCartItems = [...state.cartItems];
        const existingItem = updatedCartItems[existingItemIndex];

        // Update the quantity and amount of the existing item
        updatedCartItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };

        return {
          ...state,
          cartItems: updatedCartItems,
          totalAmount:
            state.totalAmount + action.payload.price * action.payload.quantity,
          totalQuantity:
            parseInt(state.totalQuantity) + parseInt(action.payload.quantity),
        };
      } else {
        // Add the item to the cart if it's not already there
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          totalAmount:
            state.totalAmount + action.payload.price * action.payload.quantity,
          totalQuantity:
            parseInt(state.totalQuantity) + parseInt(action.payload.quantity),
        };
      }
    }

    case REMOVE_FROM_CART:{
      const removedItem = state.cartItems.find(item => item.id === action.payload.id);
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
        totalAmount: state.totalAmount - removedItem.price * removedItem.quantity,
        totalQuantity: state.totalQuantity - removedItem.quantity,
      };
    }


    case UPDATE_CART_QUANTITY: {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const updatedTotalAmount = updatedCartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const updatedTotalQuantity = updatedCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: updatedTotalAmount,
        totalQuantity: updatedTotalQuantity,
      };
    }
    default:
      return state;
  }
};

export default CartReducer;

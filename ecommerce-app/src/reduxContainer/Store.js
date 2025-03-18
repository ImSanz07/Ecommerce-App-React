import { createStore } from "redux";
import CartReducer from "./CartReducers";

export const store = createStore(CartReducer);

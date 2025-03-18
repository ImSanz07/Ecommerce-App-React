import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const cartItems = useSelector(state => state.cartItems);
  const totalAmount = useSelector(state => state.totalAmount);
  const totalQuantity = useSelector(state => state.totalQuantity);
  const dispatch = useDispatch();

  return (
    <div>
        <h2>Cart</h2>

        {
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      <p>Total Amount: {totalAmount}</p>
      <p>Total Quantity: {totalQuantity}</p>
    </div>
  )
}

export default Cart
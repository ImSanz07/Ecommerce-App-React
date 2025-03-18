import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Orders.css";
import { getOrders } from "../../services/marketplaceService";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await getOrders();
      setOrders(orderData);
    };

    fetchOrders();
  }, []);

  // Return if no orders
  if (orders.length === 0) {
    return <h2>No orders found !</h2>;
  }

  return (
    <div className="orders-container">
      {" "}
      <h2>Orders Made in System</h2>{" "}
      {orders.map((order, index) => (
        <div key={order.id} className="order-card">
          {" "}
          <h3>Order ID: {order.id}</h3>{" "}
          <div className="order-items">
            {" "}
            {Object.keys(order)
              .filter((key) => key !== "id") // Ignore the order id key

              .map((key) => (
                <div key={order[key].id} className="order-item">
                  {" "}
                  <h4> {order[key].name}</h4>{" "}
                  <p>
                    {" "}
                    <strong>Price:</strong> ₹ {order[key].price}
                  </p>{" "}
                  <p>
                    {" "}
                    <strong>Quantity:</strong> {order[key].quantity}
                  </p>{" "}
                  <p>
                    {" "}
                    <strong>Seller ID:</strong> {order[key].sellerId}
                  </p>{" "}
                  <p>
                    {" "}
                    <strong>Created at:</strong> {order.createdAt}
                  </p>{" "}
                </div>
              ))}
          </div>{" "}
        </div>
      ))}
    </div>
  );
};

export default Orders;

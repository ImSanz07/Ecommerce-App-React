import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import "../../styles/Products.css";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [enrichedInventory, setEnrichedInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);

        // Only join tables after products are fetched
        if (data.length > 0 && props.inventory) {
          const enriched = props.inventory.map((item) => {
            const product = data.find((product) => product.id === item.productId);
            return {
              ...item,
              product: product || {}, // Provide empty object as fallback
            };
          });
          setEnrichedInventory(enriched);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [props.inventory]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="vendor-products-container">
      <h2>Products</h2>
      {enrichedInventory.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>CURRENT STOCK</th>
              <th>LISTED PRICE</th>
            </tr>
          </thead>
          <tbody>
            {enrichedInventory.map((item) => (
              <tr key={item.id}>
                <td>{item.productId || 'N/A'}</td>
                <td>{item.product?.name || 'N/A'}</td>
                <td>{item.product?.category || 'N/A'}</td>
                <td>{item.quantity || 'N/A'}</td>
                <td>{item.price ? `Rs ${Number(item.price).toLocaleString()}` : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found in inventory.</p>
      )}
    </div>
  );
};

export default Products;
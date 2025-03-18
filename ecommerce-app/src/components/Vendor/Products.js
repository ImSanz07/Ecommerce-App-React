import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import "../../styles/Products.css";
import AddProduct from "./AddProduct";
import AddStock from "./AddStock";
import { useLocation } from "react-router-dom";

const Products = (props) => {
  const location = useLocation();
  const { gstin } = location.state || {};
  const [products, setProducts] = useState([]);
  const [enrichedInventory, setEnrichedInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddStock, setShowAddStock] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
        console.log(props.inventory);
        

        // Joining tables
        if (data.length > 0 && props.inventory) {
          const enriched = props.inventory
          .filter(item => item.sellerId === gstin) 
          .map((item) => {
            const product = data.find((product) => product.id === item.productId);
            return {
              ...item,
              product: product || {},
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

  const handleAddStock = () => {
    setShowAddStock(!showAddStock);
  }

  const handleUpdateStock = (item) => {
    setSelectedProduct(item); // Set the selected product for stock update
    setShowAddStock(true); // Show the AddStock form
  };


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
              <th>Actions</th>
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
                <td><button onClick={() => handleUpdateStock(item)} >Update Stock</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found in inventory.</p>
      )}

      {showAddStock && (
        <AddStock
          selectedProduct={selectedProduct}
          closeAddStock={() => setShowAddStock(false)}
        />
      )}
      <button onClick={handleAddStock}>Add Stock</button>
    </div>
  );
};

export default Products;
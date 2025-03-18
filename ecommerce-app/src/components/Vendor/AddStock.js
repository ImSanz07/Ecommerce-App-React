import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../services/productService';
import { addStock, updateStock } from '../../services/inventoryService'; // Assuming you have updateStock function
import { useLocation } from 'react-router-dom';

const AddStock = ({ selectedProduct, closeAddStock }) => {
    const location = useLocation();
    const { gstin } = location.state || {};

    const [products, setProducts] = useState([]);
    const [newStock, setNewStock] = useState({
        productId: selectedProduct ? selectedProduct.productId : "",
        sellerId: gstin,
        quantity: selectedProduct ? selectedProduct.quantity : "",
        price: selectedProduct ? selectedProduct.price : "",
    });

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchAllProducts();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStock((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Submit form (add or update stock)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const stockData = { ...newStock, sellerId: gstin };

            if (selectedProduct) {
                // If selectedProduct exists, update the stock
                const response = await updateStock(stockData);
                console.log('Stock updated successfully:', response);
            } else {
                // If no selectedProduct, add new stock
                const response = await addStock(stockData);
                console.log('Stock added successfully:', response);
            }

            // Reset form after submission
            setNewStock({
                productId: "",
                sellerId: gstin,
                quantity: "",
                price: ""
            });
            closeAddStock();  // Close form after successful submission
        } catch (error) {
            console.error("Error updating/adding stock:", error);
        }
    };

    return (
        <div>
            <h2>{selectedProduct ? "Update Stock" : "Add New Stock"}</h2>
            <form onSubmit={handleSubmit}>
                {/* Product Dropdown */}
                <div>
                    <label htmlFor="productId">Select Product:</label>
                    <select
                        id="productId"
                        name="productId"
                        value={newStock.productId}
                        onChange={handleInputChange}
                        disabled={!!selectedProduct}  // Disable dropdown if updating stock
                    >
                        <option value="">--Select a Product--</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Quantity Input */}
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={newStock.quantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Price Input */}
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={newStock.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit">{selectedProduct ? "Update Stock" : "Add Stock"}</button>
                <button type="button" onClick={closeAddStock}>Cancel</button>
            </form>
        </div>
    );
}

export default AddStock;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/ProductDetails.css";
import { getInventoryWithSellers } from "../../services/inventoryService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reduxContainer/CartActions";

export const ProductDetails = () => {
    const location = useLocation();
    const product = location.state?.product;
    const [enrichedInventory, setEnrichedInventory] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const dispatch = useDispatch();


    // Fetch product details and sellers
    useEffect(() => {
        const fetchProductDetails = async () => {
            if (product?.productId) {
                const inventoryData = await getInventoryWithSellers(product.productId);
                setEnrichedInventory(inventoryData);

                // Set the first seller as default when data is available
                if (inventoryData.length > 0) {
                    setSelectedSeller(inventoryData[0]);
                }
            }
        };

        fetchProductDetails();
    }, [product]);

    // Handle quantity change
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1) setQuantity(value);
    };

    // Handle seller change
    const handleSellerChange = (e) => {
        const selectedId = e.target.value;
        const newSeller = enrichedInventory.find((item) => item.id === selectedId);
        setSelectedSeller(newSeller);
    };

    // Handle Add to Cart
    const handleAddToCart = () => {
        if (!selectedSeller) {
            alert("Please select a seller.");
            return;
        }

        const cartItem = {
            id: product.productId,
            name: product.product.name,
            price: selectedSeller.price,
            quantity: quantity,
            sellerId: selectedSeller.seller.id,
        };
        console.log("Added to Cart:", cartItem);

        dispatch(addToCart(cartItem, quantity));
        alert("Product added to cart successfully!");
        //navigate back to marketplace
        window.history.back();
    };

    // Return if product is not available
    if (!product) {
        return <h2>No product details available!</h2>;
    }

    return (
        <div className="product-details-container">
            <div className="product-details-card">
                <h2>{product.product.name}</h2>
                <p>
                    <strong>Price:</strong> ₹{selectedSeller?.price || "N/A"}
                </p>
                <p>
                    <strong>Category:</strong> {product.product.category}
                </p>
                <p>
                    <strong>Description:</strong>{" "}
                    {product.product.description || "No description available."}
                </p>

                {/* Seller Selection */}
                <div className="seller-section">
                    <label htmlFor="seller">Choose Seller:</label>
                    <select
                        id="seller"
                        value={selectedSeller?.id || ""}
                        onChange={handleSellerChange}
                    >
                        {enrichedInventory.length > 0 ? (
                            enrichedInventory.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.seller.businessName} - ₹{item.price} ({item.seller.location})
                                </option>
                            ))
                        ) : (
                            <option disabled>No sellers available</option>
                        )}
                    </select>
                </div>

                {/* Quantity Selection */}
                <div className="quantity-section">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>

                {/* Add to Cart Button */}
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    🛒 Add to Cart
                </button>
            </div>
        </div>
    );
};

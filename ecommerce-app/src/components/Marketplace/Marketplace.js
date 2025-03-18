import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import { getInventory } from '../../services/inventoryService';
import '../../styles/Marketplace.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../reduxContainer/CartActions';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import { NavLink } from 'react-router-dom';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [enrichedInventory, setEnrichedInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const Cart = useSelector(state => state.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        const allInventory = await getInventory();
        setProducts(allProducts);
        setInventory(allInventory);

        if (allProducts.length > 0 && allInventory.length > 0) {
          const groupedInventory = allInventory.reduce((acc, item) => {
            if (!acc[item.productId]) {
              acc[item.productId] = [];
            }
            acc[item.productId].push(item);
            return acc;
          }, {});

          console.log(groupedInventory);


          const enriched = Object.keys(groupedInventory).map((productId) => {
            const lowestPriceItem = groupedInventory[productId][0];




            const product = allProducts.find((product) => product.id === productId);

            return {
              ...lowestPriceItem,
              product: product || {},
            };
          });

          setEnrichedInventory(enriched);
          console.log(enriched);

        }

      } catch (error) {
        setError('Failed to fetch products');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


    fetchAllProducts();
    return () => setLoading(false);
  }, []);

  const handleAddToCart = (product) => {
    console.log(product);

    const cartItem = {
      id: product.id,
      name: product.product.name,
      price: product.price,
      quantity: quantity,
      sellerId: product.sellerId,
    };


    dispatch(addToCart(cartItem, quantity));

    alert('Product added to cart successfully!');
  };

  const handleNavigateToCart = () => {
    // Navigate to the cart page

  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };


  return (
    <div className='marketplace-container'>
      {
        <h2>MP</h2>
      }
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : enrichedInventory.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Product Description</th>
              <th>Seller</th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            {enrichedInventory.map((product) => (
              <tr key={product.productId}>
                <td>{product.product.name}</td>
                <td>{product.price}</td>
                <td>{product.product.category}</td>
                <td>{product.product.description}</td>
                <td>{product.sellerId}</td>
                <td>
                  <button onClick={() => {
                    handleAddToCart(product);
                  }}>Add to Cart</button>

                  <input type='number' onChange={handleChange} value={quantity} placeholder='Enter Quantity'></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
      <NavLink to={'/marketplace/cart'}>
        <button onClick={() => handleNavigateToCart}>🛒 Cart</button>
      </NavLink>
    </div>
  );
};

export default Marketplace;

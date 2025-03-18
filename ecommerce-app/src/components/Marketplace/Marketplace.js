import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import { getInventory } from '../../services/inventoryService';
import '../../styles/Marketplace.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../reduxContainer/CartActions';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import { NavLink, useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [enrichedInventory, setEnrichedInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Cart = useSelector(state => state.cartItems);
  const dispatch = useDispatch();

  const navigate = useNavigate();

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
      quantity: 1,
      sellerId: product.sellerId,
    };


    dispatch(addToCart(cartItem, 1));

    alert('Product added to cart successfully!');
  };

  const handleNavigateToCart = () => {
    // Navigate to the cart page
  };

  const handleProductDetails = (product) => {
    // Navigate to the product details page
    console.log(product);
    navigate(`/marketplace/${product.productId}`, { state: { product } });

  };



  return (
    <div className='marketplace-container'>
      {
        <h2>Marketplace</h2>
      }
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : enrichedInventory.length > 0 ? (


        <div className='product-card-container'>

          {
            enrichedInventory.map((product) => {
              return (
                <div className='product-card' key={product.id}>
                  <h3 onClick={() => handleProductDetails(product)}>{product.product.name}</h3>
                  <h3>Rs. {product.price}</h3>
                  <p>Category: {product.product.category}</p>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              )

            })
          }

        </div>

      ) : (
        <p>No products found.</p>
      )}
      <NavLink to={'/marketplace/cart'}>
        <button onClick={() => handleNavigateToCart}>🛒 Cart {Cart.length > 0 && <h3>{Cart.length}</h3>}
        </button>
      </NavLink>
    </div>
  );
};

export default Marketplace;

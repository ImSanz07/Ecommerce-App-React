import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../services/productService';
import '../../styles/CreatedProduct.css'

const CreatedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                setProducts(res)
            })
            .catch((err) => {
                console.log(err);
            })

    })
    return (
        <div className='created-product-container'>
            <h2>Created Products</h2>
            {
                products.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Product Category</th>
                                <th>Product Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.description}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <p>No products created yet.</p>
                )
            }
        </div>
    )
}

export default CreatedProducts
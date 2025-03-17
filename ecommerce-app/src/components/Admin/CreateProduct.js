import React, { useState } from 'react'
import '../../styles/CreateProduct.css'
import { addProduct } from '../../services/productService';

const CreateProduct = () => {
  const [product,setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description:""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    const response = addProduct(product);
    alert("Product Added Successfully");
    setProduct({name:"",price:"",category:"",description:""});

  };

  return (
    <div className='create-product-container'>
      <h2>
        Add new Product
      </h2>
      <form onSubmit={handleSubmit} className='product-form'>
        <div className='form-group'>
          <label>Product Name</label>
          <input type='text' name='name' value={product.name} onChange={handleChange} required></input>
        </div>

        <div className="form-group">
          <label>Price (₹)</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home-appliances">Home Appliances</option>
            <option value="books">Books</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Add Product</button>

      </form>

    </div>
  )
}

export default CreateProduct
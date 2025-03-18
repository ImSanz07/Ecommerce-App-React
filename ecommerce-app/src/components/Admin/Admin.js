import React from 'react'
import CreateProduct from './CreateProduct'
import CreatedProducts from './CreatedProducts'
import RegisteredVendors from './RegisteredVendors'
import Orders from './Orders'

const Admin = () => {
  return (
    <div>
      <CreateProduct></CreateProduct>
      <CreatedProducts></CreatedProducts>

      <hr></hr>
      <RegisteredVendors></RegisteredVendors>

      <Orders></Orders>
    </div>
  )
}

export default Admin
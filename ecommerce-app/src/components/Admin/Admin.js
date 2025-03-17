import React from 'react'
import CreateProduct from './CreateProduct'
import CreatedProducts from './CreatedProducts'
import RegisteredVendors from './RegisteredVendors'

const Admin = () => {
  return (
    <div>
      <CreateProduct></CreateProduct>
      <CreatedProducts></CreatedProducts>

      <hr></hr>
      <RegisteredVendors></RegisteredVendors>
    </div>
  )
}

export default Admin
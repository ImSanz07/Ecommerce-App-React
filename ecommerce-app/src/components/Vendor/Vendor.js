import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import '../../styles/Vendor.css'

const Vendor = () => {
  const navigate = useNavigate();
  return (
    <div className='vendor-container'>
      <button onClick={() => { navigate("/vendors/register") }}>Register Yourself as a Vendor</button>

      <button onClick={() => { navigate("/vendors/validate-vendor") }}>Manage Inventory</button>

    </div>
  )
}

export default Vendor
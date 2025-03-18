import React, { useState } from 'react'
import '../styles/Home.css'
import Marketplace from './Marketplace/Marketplace';
import Vendor from './Vendor/Vendor';
import Admin from './Admin/Admin'
import { NavLink, Route, Routes } from 'react-router-dom';
import RegisterVendor from './Vendor/RegisterVendor';
import Inventory from './Vendor/Inventory';
import ValidateVendor from './Vendor/ValidateVendor';
import Cart from './Cart/Cart';


export const Home = () => {





    return (
        <div>
            <header>
                <h1>
                    Ecommerce Store
                </h1>
                <nav>
                    <ul>
                        <NavLink className='links' to='/'>Marketplace</NavLink>

                        <NavLink className='links' to='/vendors'>Vendors</NavLink>

                        <NavLink className='links' to='/admin'>Admin</NavLink>
 
                    </ul>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path='/' element={<Marketplace/>}></Route>

                    <Route path='/vendors' element={<Vendor />}>
                    </Route>

                    <Route path='/vendors/register' element={<RegisterVendor />}></Route>

                    <Route path='/vendors/validate-vendor' element={<ValidateVendor />}></Route>

                    <Route path='/vendors/inventory' element={<Inventory />}></Route>


                    <Route path='/admin' element={<Admin />}></Route>

                    <Route path='/marketplace/cart' element={<Cart />}></Route>



                </Routes>
                {/* {
                    showMarketplace && <Marketplace></Marketplace>

                }
                {
                    showVendors && <Vendor></Vendor>
                }
                {
                    showAdmin && <Admin></Admin>
                } */}
            </main>

        </div>
    
    )
}

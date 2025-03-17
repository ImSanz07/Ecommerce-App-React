import React, { useEffect, useState } from 'react'
import { getAllVendors } from '../../services/vendorService';

const RegisteredVendors = () => {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        getAllVendors()
            .then((res) => {
                console.log(res);
                
                setVendors(res)
            })
            .catch((err) => {
                console.log(err);
            })
    },[])

    return (
        <div className='created-product-container'>
            <h2>Registered Vendors</h2>
            {
                vendors.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Vendor ID</th>
                                <th>GSTIN</th>
                                <th>Vendor Name</th>
                                <th>Vendor Location</th>
                                <th>Vendor Ratings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vendors.map((vendor) => (
                                    <tr key={vendor.id}>
                                        <td>{vendor.id}</td>
                                        <td>{vendor.gstin}</td>
                                        <td>{vendor.businessName}</td>
                                        <td>{vendor.location}</td>
                                        <td>{vendor.rating}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <p>No Vendors Registered yet.</p>
                )
            }
        </div>
    )
}

export default RegisteredVendors
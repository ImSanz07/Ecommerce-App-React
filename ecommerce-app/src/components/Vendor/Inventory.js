import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Products from './Products';
import { getInventory } from '../../services/vendorService';
import AddProduct from './AddProduct';

const Inventory = () => {
    const location = useLocation();
    const { gstin } = location.state || {};

    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchInventory = async () => {
            if (!gstin) {
                alert('Please provide a valid GSTIN to view your inventory.');
                return;
            }

            try {
                const data = await getInventory(gstin);
                setInventory(data);
                console.log(data);
                
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventory();
    }, [gstin]);

    return (
        <div>
            <h2>Vendor Inventory</h2>
            {gstin ? (
                <p>Welcome Vendor! Your GSTIN: {gstin}</p>
            ) : (
                <p>Error: No GSTIN provided</p>
            )}
            <hr></hr>
            <Products inventory={inventory} />


            <AddProduct></AddProduct>
        </div>
    );
};

export default Inventory
import React, { useState } from 'react'
import { validateVendor } from '../../services/vendorService';
import { useNavigate } from 'react-router-dom';

const ValidateVendor = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        gstin: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await validateVendor(formData.gstin);
        if (!response) {
            alert("No Such Vendor Exists!");
            setFormData({ gstin: "" });
            return
        }
        else{
            alert("Vendor Validated Successfully!");
            navigate('/vendors/inventory', { state: { gstin: formData.gstin } });
        }
    }

    return (
        <div>
            <h2>Please Validate Yourself as a Vendor</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>GSTIN</label>
                    <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} required />

                    <button type="submit">Register</button>

                </div>
            </form>
        </div>
    )
}

export default ValidateVendor
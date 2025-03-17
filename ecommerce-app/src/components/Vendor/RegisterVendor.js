import React, { useState } from "react";
import "../../styles/RegisterVendor.css";
import { addVendor } from "../../services/vendorService";

const RegisterVendor = () => {
    const [formData, setFormData] = useState({
        businessName: "",
        gstin:"",
        location: "",
        rating: 4.5
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addVendor(formData);

            if (!response || response.error) {
                throw new Error(response?.error || "Something went wrong");
            }

            console.log("Vendor Registered:", response);
            alert("Vendor Registered Successfully!");

            setFormData({
                gstin: "",
                businessName: "",
                location: "",
                rating: 4.5,
            });

        } catch (error) {
            console.error("Error registering vendor:", error);
            alert(`Failed to register vendor: ${error.message}`);
        }
    };


    return (
        <div className="register-vendor">
            <h2>Register as a Vendor</h2>
            <form onSubmit={handleSubmit}>

                {/* <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required /> */}

                {/* <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required /> */}

                <label>GSTIN</label>
                <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} required />

                <label>Business Name</label>
                <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required />

                <label>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />

                {/* <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required /> */}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterVendor;

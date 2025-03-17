import axios from "axios";

export const addVendor = async (vendorData) => {
    try {
        const response = await axios.post("http://localhost:4000/vendors", vendorData);
        return response.data; 
    } catch (error) {
        console.error("Error adding vendor:", error);
        throw error; 
    }
};


export const getAllVendors = async () => {
    try {
        const response = await axios.get("http://localhost:4000/vendors");
        return response.data; 
    } catch (error) {
        console.error("Error fetching vendors:", error);
        throw error; 
    }
};

export const validateVendor = async (gstin) => {
    try {
        const response = await axios.get(`http://localhost:4000/vendors/?gstin=${gstin}`);
        console.log(response);
        if(response.data.length > 0)
            return true;
        else 
            return false
    } catch (error) {
        console.error("Error validating vendor:", error);
        throw error; 
    }
};

export const getInventory = async (gstin) => {
    try {
        const response = await axios.get(`http://localhost:4000/inventory/?gstin=${gstin}`);
        return response.data; 

        
    } catch (error) {
        console.error("Error fetching Inventory:", error);
        throw error; 
        
    }
}
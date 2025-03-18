import axios from "axios";

export const addProduct = async (productData) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/products",
            productData
        );
        return response;
    } catch (error) {
        console.log("Error Adding Product", error);
        throw error;
    }
};

export const editProduct = async (productData) => {
    try {
        const response = await axios.put(
            "http://localhost:4000/products/" + productData.id,
            productData
        );
        return response.data;
    } catch (error) {
        console.log("Error Adding Product", error);
        throw error;
    }
};

export const getAllProducts = async () => {
    try {
        const response = await axios.get("http://localhost:4000/products");
        return response.data;
    } catch (error) {
        console.log("Error Fetching Product", error);
        throw error;
    }
};

export const getProductDetails = async (productId) => {
    try {

        const response = await axios.get(`http://localhost:4000/products/${productId}`);
        return response.data;
    } catch (error) {
        console.log("Error Fetching Product", error);
        throw error;
    }
};

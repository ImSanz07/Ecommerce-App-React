import axios from "axios"

export const getProducts = async () => {
    try {
        axios.get("http://localhost:4000/products")
        .then((res)=>{
            return res.data
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const createOrder = async (order) => {
    try {
        const orderWithTimestamp = {
            ...order,
            createdAt: new Date().toLocaleString(), 
        };

        axios.post("http://localhost:4000/orders",orderWithTimestamp)
        .then((res)=>{
            return res.data
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const getOrders = async () => {
    try {
        const res = await axios.get("http://localhost:4000/orders");
        return res.data || []; // Return an empty array if no data is found
    } catch (error) {
        console.error("Error fetching orders:", error);
        return []; // Return an empty array on error to prevent crashes
    }
};

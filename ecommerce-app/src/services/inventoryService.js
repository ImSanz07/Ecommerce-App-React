import axios from "axios";

export const addStock = async (stockData) => {
    try {
        const response = await axios.post("http://localhost:4000/inventory", stockData);
        return response.data;
    } catch (error) {
        console.error("Error adding stock:", error);
        throw error;
    }
};

export const updateStock = async (stockData) => {
    console.log("Received stock data for update:", stockData);

    try {
        const { productId, sellerId } = stockData;

        const response = await axios.get(`http://localhost:4000/inventory`, {
            params: { productId, sellerId }
        });

        const existingStock = response.data[0];

        if (existingStock) {
            const updatedStock = {
                ...existingStock,
                quantity: stockData.quantity,
                price: stockData.price
            };


            const updateResponse = await axios.put(
                `http://localhost:4000/inventory/${existingStock.id}`,
                updatedStock
            );

            return updateResponse.data;
        } else {
            throw new Error("Stock record not found for update.");
        }
    } catch (error) {
        console.error("Error updating stock:", error);
        throw error;
    }
};

export const getInventory = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/inventory`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Inventory:", error);
        throw error;
    }
};

export const getInventoryWithSellers = async (productId) => {
    try {
        // Fetch inventory and sellers in parallel
        const [inventoryRes, sellersRes] = await Promise.all([
            axios.get(`http://localhost:4000/inventory/?productId=${productId}`),
            axios.get("http://localhost:4000/vendors"),
        ]);

        const inventory = inventoryRes.data;
        const sellers = sellersRes.data;
        
        const enrichedInventory = inventory.map((item) => {
            return {
                ...item,
                seller: sellers.find((seller) => seller.gstin === item.sellerId),
            };
        });
        console.log(`eV`,enrichedInventory);
        


        return enrichedInventory;
    } catch (error) {
        console.error("Error fetching Inventory:", error);
        throw error;
    }
};

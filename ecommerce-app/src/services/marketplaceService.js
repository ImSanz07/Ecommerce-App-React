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
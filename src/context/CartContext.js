import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {


    const endPoint = "https://ecommerce.routemisr.com/api/v1/cart";
    const { userToken } = useContext(AuthContext);
    const headers = {
        token: userToken,

    }
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState(null);


    async function addToCart(productId) {
        try {
            const { data } = await axios.post(endPoint,
                {
                    productId
                }, {
                headers
            },
            )
            setNumOfCartItems(data.numOfCartItems);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function getCart() {
        try {
            const { data } =await axios.get(endPoint, {headers});
            setNumOfCartItems(data.numOfCartItems);
            setCartId(data.data._id)



            
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function removeFromCart(id){
        try{
      const{data} = await axios.delete(`${endPoint}/${id}`, {headers});
      setNumOfCartItems(data.numOfCartItems);
      return data;
    } catch(error) {
        console.log(error);
    }

    }

    async function clearCart(){
        try{
      const{data} = await axios.delete(`${endPoint}`, {headers});
      setNumOfCartItems(0);
      return data;
    } catch(error) {
        console.log(error);
    }}

async function updateProductQty(id, count){
    try{
         const {data} = await axios.put(`${endPoint}/${id}`,{count }, {headers});
   return data  
    }catch(error){
console.log(error);
    }

}


    return (<CartContext.Provider value={{ numOfCartItems, addToCart, getCart, removeFromCart,clearCart,updateProductQty, cartId,setNumOfCartItems }}>{children}</CartContext.Provider>);
}
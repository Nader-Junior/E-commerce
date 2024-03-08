import axios from 'axios';
import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import { AuthContext } from "./AuthContext";





export const wishListContext = createContext();

// https://ecommerce.routemisr.com/api/v1/wishlist

export default function WhishListcontextProvider({ children }) {
    const { userToken } = useContext(AuthContext);

    const headers = {
        token : userToken
        
    }
    const [wishMsg , setWishMsg] = useState("");
    const[showList , setShowList] = useState([])
// Add product to wishlist function
async function addToWishlist(productId){
 return await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
    productId
  },
  {
    headers
  }).then((data)=>toast.success(data?.data?.message)).catch(err=>err)

}

async function getWishList(){
  return await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {headers}
  ).then(data =>setShowList(data?.data?.data)).catch(err=>err)
}

async function deleteListItem(itemId){
  return await axios.delete(` https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}` , {
    headers
  }).catch(err=>err)
}
    
  return (
    <>
      <wishListContext.Provider value={{addToWishlist , wishMsg , getWishList ,setShowList, showList , deleteListItem}}>
      {children}
      </wishListContext.Provider>
    </>
  )
}

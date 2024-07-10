import axios from 'axios';
import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';



export const WebData = createContext({
    userId: null,
    shopId: null,
    userName: null,
    userRoles: null,
})
// let mine = editconte
function WebInfo({children}: {children:any}) {
    const [shopId, setShopID] = useState<string>();
    const [responses, setResponse] = useState()
    axios.defaults.headers.common = {
        'Authorization': `Bearer ${Cookies.get("JwtToken")}`
      };
      const getOneShop = async ()=>{
        try{
          const response = await axios.get(`http://localhost:5050/api/v1/shop/${Cookies.get("userID")}`)
          // axios.defaults.headers.common.Authorization = `Bearer ${getJWTCookie("JwtToken")}`
          console.log(response);
          console.log(response.headers);
          setShopID(response.data.id);
          console.log(response.data.owner.firstName);
          setResponse(response.data.owner.lastName);
 
          // console.log(User.name);
          
        }
        catch(error){
          console.log(error);
        }
    
      }
      getOneShop();
  return (
    <>
        <WebData.Provider value={{
            shopId: shopId,
            userId: Cookies.get("userID"),
            userName: responses,
            userRoles: responses
        }}>

            {children}
        </WebData.Provider>
    </>
  )
}

export default WebInfo;
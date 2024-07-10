import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import SideBar from './Sidebar'
import { Outlet } from 'react-router'
import Cookies from 'js-cookie';
import axios from 'axios';



function SellerDashboard() {
    axios.defaults.headers.common = {
        'Authorization': `Bearer ${Cookies.get("JwtToken")}`
      };
      const [shopID, setShopID] = useState();
      const [shopUser, setUserID] = useState();
    
      const CheckShopOwner = async ()=>{
        // Cookies.remove("shopID");
        // setShopID(null)
        try{
          const response = await axios.get(`http://localhost:5050/api/v1/shop/${Cookies.get("userID")}`)
          
          setShopID(response.data.id);
          Cookies.set("shopID", response.data.id);
          setUserID(response.data.ownerID);
          console.log(response.data.ownerID);
          console.log(Cookies.get("shopID"));
          console.log(response);
         
         
        }catch(err){
          console.log(err);
        }
      
      }
      CheckShopOwner();
  return (
    <>
        <Box w='100%' display='flex' bg='' className="home">
        
        <Box w='23%' h={'100vh'} position={'sticky'} top={'0'} bg=''display={'flex'} borderRight={'1px solid gainsboro'} justifyContent={'center'} className="sidebar_con">
        <SideBar/>
        </Box>
        <Box w='77%' h={''} padding={'1.4% 2%'} bg='gainsboro' >
          {/* <Chart/> */}
          
          <Outlet/>
         
        </Box>
       </Box>
    </>
  )
}

export default SellerDashboard
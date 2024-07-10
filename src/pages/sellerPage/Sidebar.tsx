import React, { useContext, useEffect, useState } from "react";
import "../../styles/dashboard.css";
import { Box, Flex, Avatar, Badge, Text, UnorderedList, ListItem, } from "@chakra-ui/react";
import { GiDeliveryDrone } from "react-icons/gi";
import { TbDrone } from "react-icons/tb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faAngleRight, faBagShopping, faBell, faCartShopping, faEnvelope, faGear, faHome, faLayerGroup, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import WebInfo from "../../global/WebInfo";
import { WebData } from "../../global/WebInfo";
import axios from "axios";
import { ShopType } from "../../interfaces/shopInterface.interface";



function Sidebar() {

    const {userId, shopId, userName, userRoles} = useContext(WebData)
    const location = useLocation();
    const isActive =(currentPath:string, pagePath:string) =>{
     if (currentPath === pagePath) {
       console.log(location);
       return "active";
     }else{
       return "";
     }
    }
     const [userID, setUserID] = useState<string>();
     const[token, setToken] = useState<string>()
     const [UserShop, setUser] = useState<ShopType>()
     
    function getJWTCookie(name:string) {
       let nameEQ = name + "=";
       let ca = document.cookie.split(';');
       for (let i = 0; i < ca.length; i++) {
           let c = ca[i];
           while (c.charAt(0) === ' ') c = c.substring(1, c.length);
           if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
       }
       return null;
   }
   
   axios.defaults.headers.common = {
     'Authorization': `Bearer ${Cookies.get("JwtToken")}`
   };
   
     console.log(getJWTCookie("userID"));
    
     const [userRole, setUserRole] = useState<string>()
     const getOneShop = async ()=>{
       try{
         setUserID(Cookies.get("userID"))
         const response = await axios.get(`http://localhost:5050/api/v1/shop/${Cookies.get("userID")}`)
         // axios.defaults.headers.common.Authorization = `Bearer ${getJWTCookie("JwtToken")}`
         setToken(Cookies.get("JwtToken"))
         console.log(response);
         console.log(response.headers);
         setUserRole(Cookies.get("userRole"))
         setUser(response.data)
         console.log(response.data.owner.firstName);
         console.log(UserShop?.owner.lastName);
         console.log(UserShop?.owner.username);
         console.log(UserShop?.owner.role);
         // console.log(User.name);
         
       }
       catch(error){
         console.log(error);
       }
   
     }
     // getOneShop();
     useEffect(()=>{
       // console.log(User.owner.firstName);
       getOneShop();
     }, [])
  return (
    <>
          <Box w="100%" h={'100%'} display={'flex'} flexDir={'column'} padding={'5% 7%'} alignItems={'center'} bg={'white'} gap={'25px'} className="sidebar">
       <Box className="header_sec" display={'flex'} flexDir={'column'} gap={'25px'} w={'100%'}>
       <Box className="logo" w={'100%'}>
          <Text fontWeight={'bold'} display={'flex'} alignItems={'center'} gap={'14px'} className="title" fontSize={20}><Box fontSize={'40px'}   onClick={getOneShop}><GiDeliveryDrone/></Box>Bidify</Text>
        </Box>
       
            <Flex w={'100%'} alignItems='' padding={'10px 20px'} bg={'#fffefe'} cursor={'pointer'} transition={".6s ease-in-out"} borderRadius={7} className='profile' gap='7%'>
            <Box w={'10%'}>
            <Avatar w='47px' h='47px' onClick={()=>console.log(UserShop?.owner.role)}  borderRadius='50%' src="https://bit.ly/sage-adebayo" />
            </Box>
             <Flex w={'85%'} justifyContent={'space-between'} alignItems='center'>
             <Box ml="3" display={'flex'} flexDir={'column'} gap={'0px'}>
               <Text display={'flex'} flexDir={'column'} alignItems={''} gap={'6px'} fontWeight="bold">
                 <Badge ml="1" variant='subtle' w={'fit-content'} colorScheme="green">
                   {userRole}
                 </Badge>
                 {UserShop?.name}
               </Text>
               {/* <Text fontSize="sm" fontWeight={600}>User's name</Text> */}
             </Box>
             <Box>
               <FontAwesomeIcon icon={faAngleRight}/>
             </Box>
             </Flex>
           </Flex>
       </Box>
       <Box w={'100%'} display={'flex'} flexDir={'column'} gap={'25px'}>
        <Box>
          <Text fontWeight={600} fontSize={'18px'} color={'gray.5 00'}>Menu</Text>
        </Box>
        <UnorderedList listStyleType={'none'} display={'flex'} flexDir={'column'} alignItems={'flex-start'} gap={'7px'} w={'100%'}>
          
          <ListItem  bg={''} h={'55px'} listStyleType={'none'} w={'100%'}>
          <Link className={`sidebarLink ${isActive(location.pathname, "/admin")}`} to={''} >
            <Flex padding={'0 0 0 12px'} h={'100%'} w={'100%'} alignItems={'center'} gap={'12px'}>
            <Box bg={'#e8f2fd'} borderRadius={'7px'} display={'flex'}  className='menuIcon' alignItems={'center'} justifyContent={'center'} >
            <FontAwesomeIcon className="sidebarIcon" color="#238ae6" fontSize={'15px'}  icon={faHome}/></Box> 
                
              <Text fontWeight={600} fontSize={'18px'} margin={'auto 0'} >Home</Text>
            </Flex>
            </Link>
          </ListItem>
          <ListItem  h={'55px'} listStyleType={'none'} w={'100%'}>
          <Link className={`sidebarLink ${isActive(location.pathname, "/admin/notification")}`} to={'notification'}>
          <Flex padding={'0 0 0 12px'} h={'100%'}  w={'100%'} alignItems={'center'} gap={'12px'}>
          <Box bg={'#ffeced'} borderRadius={'7px'} display={'flex'} className='menuIcon' alignItems={'center'} justifyContent={'center'}>
          <FontAwesomeIcon className="sidebarIcon" color="#fa5e5e" fontSize={'15px'}  icon={faBell}/></Box>
          
              <Text fontWeight={600} fontSize={'18px'} margin={'auto 0'}>Notification</Text>
          </Flex>
         </Link>
          </ListItem>

          {/* <ListItem  h={'55px'} listStyleType={'none'} w={'100%'}>
          <Link className={`sidebarLink ${isActive(location.pathname, "/admin/vehicle")}`} to={'vehicle'} w={'100%'} h={'100%'}>
          <Flex padding={'0 0 0 12px'} h={'100%'}  w={'100%'} alignItems={'center'} gap={'12px'}>
          <Box bg={'#fff3e6'} borderRadius={'7px'} display={'flex'} className='menuIcon' alignItems={'center'} justifyContent={'center'}>
          <GiDeliveryDrone/>
          </Box>
          
              <Text fontWeight={600} fontSize={'18px'} margin={'auto 0'} >Vehicle</Text>
          </Flex>
         </Link>
          </ListItem> */}
          <ListItem  h={'55px'} listStyleType={'none'} w={'100%'}>
          <Link className={`sidebarLink ${isActive(location.pathname, "/admin/products")}`} to={'products'} >
          <Flex padding={'0 0 0 12px'} h={'100%'} w={'100%'} alignItems={'center'} gap={'12px'}>
          <Box bg={'#ecf8ef'} borderRadius={'7px'} display={'flex'} className='menuIcon' alignItems={'center'} justifyContent={'center'}>
          <FontAwesomeIcon className="sidebarIcon" color="#40c057" fontSize={'15px'}  icon={faBagShopping}/>
          </Box>
          
              <Text fontWeight={600}  margin={'auto 0'} fontSize={'18px'}>Products</Text>
          </Flex>
         </Link>
          </ListItem>
          <ListItem>
            {userId}
          </ListItem>
          <ListItem>
            {shopId}
          </ListItem>
          <ListItem>
            {userName}
          </ListItem>
          <ListItem>
            {userRoles}
          </ListItem>
          
          {/* <ListItem  h={'55px'} listStyleType={'none'} w={'100%'}>
          <Link className={`sidebarLink ${isActive(location.pathname, "/admin/request")}`} to={'request'} w={'100%'} h={'100%'}>
          <Flex padding={'0 0 0 12px'} h={'100%'}  w={'100%'} alignItems={'center'} gap={'12px'}>
          <Box bg={'#ecf0ff'} borderRadius={'7px'} display={'flex'} className='menuIcon' alignItems={'center'} justifyContent={'center'}>
          <FontAwesomeIcon className="sidebarIcon" color="#6d88f6" fontSize={'17px'}  icon={faAdd}/></Box>
          
              <Text fontWeight={600} fontSize={'18px'} margin={'auto 0'} >All Requests</Text>
          </Flex>
         </Link>
          </ListItem> */}
          {/* <ListItem  h={'55px'} listStyleType={'none'} w={'100%'}>
          <Link className={`sidebarLink ${isActive(location.pathname, "/admin/add-request")}`} to={'add-request'} w={'100%'} h={'100%'}>
          <Flex padding={'0 0 0 12px'} h={'100%'}  w={'100%'} alignItems={'center'} gap={'12px'}>
          <Box bg={'#ecf0ff'} borderRadius={'7px'} display={'flex'} className='menuIcon' alignItems={'center'} justifyContent={'center'}>
            <TbDrone/>
          </Box>
          
              <Text fontWeight={600} fontSize={'18px'} margin={'auto 0'} >Add Request</Text>
          </Flex>
         </Link>
          </ListItem> */}
          {/* <ListItem  h={'55px'} listStyleType={'none'} w={'100%'}>
          <Link className={`sidebarLink ${isActive(location.pathname, "/admin/missions")}`} to={'missions'} w={'100%'} h={'100%'}>
          <Flex padding={'0 0 0 12px'} h={'100%'}  w={'100%'} alignItems={'center'} gap={'12px'}>
          <Box bg={'#f2f9e8'} borderRadius={'7px'} display={'flex'} className='menuIcon' alignItems={'center'} justifyContent={'center'}>
          <FontAwesomeIcon className="sidebarIcon" color="#83c91f" fontSize={'15px'}  icon={faCartShopping}/></Box>
          
              <Text fontWeight={600} fontSize={'18px'} margin={'auto 0'} >Missions</Text>
          </Flex>
         </Link>
          </ListItem> */}
          {/* <ListItem  h={'55px'} listStyleType={'none'} w={'100%'}>
          <Link className={`sidebarLink ${isActive(location.pathname, "/")}`} to={'settings'} w={'100%'} h={'100%'}>
          <Flex padding={'0 0 0 12px'} h={'100%'}  w={'100%'} alignItems={'center'} gap={'12px'}>
          <Box bg={'#e7f7f9'} borderRadius={'7px'} display={'flex'} className='menuIcon' alignItems={'center'} justifyContent={'center'}>
          <FontAwesomeIcon className="sidebarIcon" color="#20afc2" fontSize={'15px'}  icon={faGear}/></Box>
          
              <Text fontWeight={600} fontSize={'18px'} margin={'auto 0'} >Settings</Text>
          </Flex>
         </Link>
          </ListItem> */}
        </UnorderedList>
        </Box>
      </Box>
    </>
  )
}

export default Sidebar
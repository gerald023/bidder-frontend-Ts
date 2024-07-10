import { Box, Flex, Grid, GridItem,  Text,  } from '@chakra-ui/react'
import { faBagShopping, faChartLine,  faHandHoldingDollar,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
// import svImage from '../data/blood.gif'
import { GiDeliveryDrone } from 'react-icons/gi'
import { Graph, PieChart } from './data/Graph'
import axios from 'axios';
import Cookies from 'js-cookie';



function SellerHome() {

    const [userID, setUserID] = useState<string>(); 
    const[token, setToken] = useState<string>();
    const [UserShop, setUser] = useState({})
    
  
  
  axios.defaults.headers.common = {
    'Authorization': `Bearer ${Cookies.get("JwtToken")}`
  };
  
   
    const [userRole, setUserRole] = useState<string>()
    const [Products, setProducts] = useState([]);
  
    const getAllProduct = async ()=>{
      try{
        const response = await axios.get(`http://localhost:5050/api/v1/user/product/shop/${Cookies.get("shopID")}`)
        console.log(response.data)
        setProducts(response.data)
      }catch(error){
        console.log(error);
      }
  
    }
  
    const getOneShop = async ()=>{
      try{
        setUserID(Cookies.get("userID"))
        const response = await axios.get(`http://localhost:5050/api/v1/shop/${Cookies.get("userID")}`)
        setToken(Cookies.get("JwtToken"))
        console.log(response);
        console.log(response.headers);
        setUserRole(Cookies.get("userRole"))
        setUser(response.data)
            
      }
      catch(error){
        console.log(error);
      }
  
    }
    // getOneShop();
    useEffect(()=>{
      getAllProduct();
      console.log(Products.length);
      getOneShop();
    }, [])
  return (
    <>
         <Box w={'100%'}>
        <Box w={'100%'} display={'flex'} flexDir={'column'} gap={'40px'} className='data_sec'>
            <Box className='title'>
            <Text fontSize={'25px'} fontWeight={600}>Home</Text>
            </Box>
            <Grid w={'100%'} templateColumns={'repeat(auto-fit, minmax(20%, 23.4%))'} justifyContent={'center'} gap={'7'}>
           
                <GridItem display={'flex'} flexDir={'column'} padding={'23px 7%'} bg={'#fefeff'} boxShadow={'10px 10px 10px grey'} fontFamily={''} color={''}  borderRadius={'12px'} w={'100%'}>
                    <Box w={'100%'} display={'flex'} gap={'20px'} flexDir={'column'} >
                        <Box>
                            <Text fontSize={'17px'} color={'#727272'} fontWeight={600}>Total Products</Text>
                        </Box>
                        <Flex alignItems={'center'} justifyContent={'space-between'}>
                            <Box padding={'5px 12px'} borderRadius={'4px'} bg={'#ecf9ee'}>
                            <FontAwesomeIcon color='#238ae6' fontSize={'30px'} icon={faBagShopping}/>
                            </Box>
                            <Box>
                                <Text fontSize={'30px'} fontWeight={'700'}>{Products.length}</Text>
                                
                            </Box>
                        </Flex>
                    </Box>
                </GridItem>
                <GridItem display={'flex'} flexDir={'column'} padding={'23px 7%'} bg={'#fefeff'} boxShadow={'10px 10px 10px grey'} fontFamily={''} color={''}  borderRadius={'12px'} w={'100%'}>
                    <Box w={'100%'} display={'flex'} gap={'20px'} flexDir={'column'} >
                        <Box>
                            <Text fontSize={'17px'} color={'#727272'} fontWeight={600}>Bids</Text>
                        </Box>
                        <Flex alignItems={'center'} justifyContent={'space-between'}>
                            <Box padding={'5px 12px'} borderRadius={'4px'} bg={'#ecf9ee'}>
                            <FontAwesomeIcon color='#238ae6' fontSize={'30px'} icon={faChartLine}/>
                            </Box>
                            <Box>
                                <Text fontSize={'30px'} fontWeight={'700'}>{''}</Text>
                                
                            </Box>
                        </Flex>
                    </Box>
                </GridItem>
                <GridItem display={'flex'} flexDir={'column'} padding={'23px 7%'} bg={'#fefeff'} boxShadow={'10px 10px 10px grey'} fontFamily={''} color={''}  borderRadius={'12px'} w={'100%'}>
                    <Box w={'100%'} display={'flex'} gap={'20px'} flexDir={'column'} >
                        <Box>
                            <Text fontSize={'17px'} color={'#727272'} fontWeight={600}>Income   </Text>
                        </Box>
                        <Flex alignItems={'center'} justifyContent={'space-between'}>
                            <Box padding={'5px 12px'} borderRadius={'4px'} bg={'#ecf9ee'}>
                            <FontAwesomeIcon color='#844fef' fontSize={'30px'} icon={faHandHoldingDollar}/>
                            </Box>
                            <Box>
                                <Text fontSize={'30px'} fontWeight={'700'}>12,000</Text>
                                
                            </Box>
                        </Flex>
                    </Box>
                </GridItem>
            </Grid>
            <Grid w={'100%'} marginTop={'20px'} templateColumns={'repeat(auto-fit, minmax(40%, 47%))'} h={'500px'} gap={'3%'} justifyContent={'center'}>
            <GridItem w={'100%'} h={'100%'} bg={'white'} display={'flex'} flexDir={'column'} padding={'12px'} alignItems={'center'} justifyContent={'center'} boxShadow={'10px 10px 10px grey'} borderRadius={'20px'}>
                {/* <DisplayChart/> */}
                <Graph/>
            </GridItem>
            <GridItem w={'100%'} h={'100%'} bg={'white'} display={'flex'} justifyContent={'center'} padding={'12px'} alignItems={'center'} boxShadow={'10px 10px 10px grey'} borderRadius={'20px'}>
                <Box w={'80%'} display={'flex'} alignItems={'center'} justifyContent={'center'} h={'80%'}>
                        <PieChart/>
                </Box>
                
            </GridItem>
         </Grid>
        
        </Box>
        </Box>
    </>
  )
}

export default SellerHome 
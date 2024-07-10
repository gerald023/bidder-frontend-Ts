import { Box, Img, ListItem, Text, Tooltip, UnorderedList } from '@chakra-ui/react'
import axios from 'axios';
import  { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { faBell, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductInterface } from '../../interfaces/productInterface.interface';


function TopProducts() {
    axios.defaults.headers.common = {
        'Authorization': `Bearer ${Cookies.get("JwtToken")}`
      };
      
        const [Products, setProducts] = useState<ProductInterface[]>([]);
        const [topProducts, setTopProducts] = useState([]);
    
        useEffect(()=>{
          const getAllProduct = async ()=>{
            try{
              const response = await axios.get(`http://localhost:5050/api/v1/user/product/all-product`)
              console.log(response.data)
              setProducts(response.data)
            }catch(error){
              console.log(error);
            }
    
          }
          getAllProduct()
        }, Products) 
    
        const ProductSIze = Products.length;
  return (
    <>
        <Box display={'flex'} w={'100%'} justifyContent={'center'}>
      <Box display={'flex'} w={'1300px'} flexDir={'column'} gap={'15px'}>
            <Box display={'flex'} w={'100%'} borderBottom={'3px solid gainsboro'} className='' justifyContent={'space-between'}>
                    <Box h={'100%'} borderBottom={'1px solid black'} pos={'relative'}  padding={'12px 3%'}>
                        <Text fontSize={'23px'} fontWeight={700}>Top Products</Text>
                    </Box>
                  
            </Box>
            <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                        <UnorderedList w={'100%'} listStyleType={'none'} display={'grid'} gridTemplateColumns={'repeat(auto-fit, minMax(200px, 340px))'} gap={'45px'} padding={'50px 0 120px 0'} justifyContent={'center'}>
                            {
                              Products.slice(Products.length - 6, ProductSIze).map((prods)=>{
                                return(
                                  <ListItem w={'100%'} h={''} bg={''} color={''}>
                                     <Box w={'100%'} bg={'white'} transition={'0.5s linear'}  boxShadow={"7px 10px 15px 0px #70727448"} _hover={{boxShadow: "7px 10px 15px 0px #707274"}} borderRadius={'14px'} overflow={'hidden'} display={'flex'} flexDir={'column'} gap={'10px'}>
                                        <Box className='prod_img' borderBottom={'2px solid black'} height={'250px'} overflow={'hidden'}  w={'100%'}>
                                            <Img cursor={'pointer'} w={'100%'}  transition={'0.6s linear'} _hover={{transform: "scale(1.5)"}} h={'100%'} objectFit={'contain'} src={prods.imageUrl}/>
                                        </Box>
                                        <Box className='prod_desc' display={'flex'} w={'100%'} flexDir={'column'} padding={'10px 20px 20px 20px'}>
                                            <Text fontWeight={700} fontSize={'17px'}>{prods.name}</Text>
                                            <Text fontSize={'16px'} fontWeight={600} color={'GrayText'} w={'80%'} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{prods.description}</Text> 
                                            <Text fontSize={'19px'} fontWeight={600}>
                                              Current Bid:  ₦{prods.currentBid}
                                            </Text>
                                            <Box display={'flex'}  w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                                               <Tooltip label='group' colorScheme='black' hasArrow placement='top'>
                                                     <Box cursor={'pointer'} w={'50px'} h={'50px'} borderRadius={'7px'} bg={'white'} display={'flex'} justifyContent={'center'} alignItems={'center'} boxShadow={'2px 1px 9px 2px gray'}>
                                                        <FontAwesomeIcon icon={faLayerGroup}/>
                                                    </Box>
                                               </Tooltip>
                                                <Link style={{
                                                        width: "30%",
                                                        height: "50px"
                                                    }} to={''}>
                                                    <Box w={'100%'} h={'100%'} borderRadius={'7px'} bg={'black'} display={'flex'} justifyContent={'center'} alignItems={'center'} color={'white'} fontSize={'17px'} fontWeight={600}>
                                                        Bid
                                                    </Box>
                                                </Link>
                                                <Tooltip label='get notification' colorScheme='black' hasArrow placement='top'>
                                                    <Box cursor={'pointer'} w={'50px'} h={'50px'} borderRadius={'7px'} bg={'white'} display={'flex'} justifyContent={'center'} alignItems={'center'} boxShadow={'2px 1px 9px 2px gray'}>
                                                    <FontAwesomeIcon icon={faBell}/>
                                                    </Box>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </Box>
                                  </ListItem>
                                )
                              })
                            }
                        </UnorderedList>
                    </Box>
            
        </Box>
    </Box> 
    </>
  )
}

export default TopProducts
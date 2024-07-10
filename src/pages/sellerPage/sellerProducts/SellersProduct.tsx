import { Badge, Box, Button, Checkbox, Img, Menu, MenuButton, MenuItem, MenuList, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Toast, Tooltip, Tr, border } from '@chakra-ui/react'
import React from 'react'
// import { products } from '../data/products'
import { Link, useFetcher } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AddProduct from './AddProduct'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faLock, faPenToSquare, faSignOut, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import EditProduct from './EditProduct'
import { ProductInterface } from '../../../interfaces/productInterface.interface'

function SellersProduct() {

  
  axios.defaults.headers.common = {
    'Authorization': `Bearer ${Cookies.get("JwtToken")}`
  };
  
    const [AllProducts, setProducts] = useState<ProductInterface[]>([]);
    const [className, setClassName] = useState<number>();


 
    const getAllProduct = async ()=>{
      try{
        const response = await axios.get(`http://localhost:5050/api/v1/user/product/shop/${Cookies.get("shopID")}`)
        console.log(response.data)
        setProducts(response.data)
      }catch(error){
        console.log(error);
      }

    }

    useEffect(()=>{
     
      getAllProduct()
    }, []) 

    
    const deleteProduct = async (id:number|undefined) => {

      try{
        const response = await axios.put(`http://localhost:5050/api/v1/admin/product/delete/${id}`)
        console.log(response);
      }catch(error){
        console.log(error);
      }
     setTimeout(() => {
      // window.location.reload(true);
     }, 2000);
     }
   
console.log(AllProducts);
  return (
    <>
         < Box display={'flex'} flexDir={'column'} gap={'40px'} w={'100%'}>
                <Box w={'100%'}>
                <Box w={'100%'}>
                <Text fontSize={'25px'} fontWeight={600}>Products</Text>
                </Box>
                </Box>
                <Box display={'flex'} flexDir={'column'} w={'100%'} gap={'30px'} bg={'white'}>
                    <Box display={'flex'} padding={'20px'} justifyContent={'flex-end'} w={'100%'}>
                       <AddProduct
                        // Products={AllProducts}
                        // setProducts={setProducts}
                         
                       />
                    
                    </Box>
                  
                <TableContainer w={'100%'} bg={'white'} display={'flex'} justifyContent={'center'}>
                    <Table w={'90%'} variant='simple'>
                    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                        <Thead>
                           <Tr >
                          
                            <Th fontSize={'14px'} color={'black'}  fontWeight={700}>Name</Th>
                            <Th fontSize={'14px'} color={'black'}  fontWeight={700}>product image</Th>
                           <Th  fontSize={'14px'} color={'black'}  fontWeight={700}>Description</Th>
                            <Th fontSize={'14px'} color={'black'}  fontWeight={700}>Condition</Th>
                            <Th fontSize={'14px'} color={'black'}  fontWeight={700}>Minimum Bid</Th>
                            <Th fontSize={'14px'} color={'black'}  fontWeight={700}>Current Bid</Th>
                            <Th fontSize={'14px'} color={'black'}  fontWeight={700}>Actions
                            </Th>
                            {/* <Th fontSize={'14px'} color={'black'}  fontWeight={700}>Delete</Th> */}
                            
                           </Tr>
                        </Thead>
                        <Tbody>
                    { 
                       AllProducts && AllProducts.flatMap(product =>{
                            return(
                                <Tr fontSize={'17px'} onMouseOver={() => setClassName(1)} key={product.id} fontWeight={'600'}>
                                    <Td>
                                      {product.name}
                                    </Td>
                                    <Td>
                                      <Img w={'50px'} h={'50px'} borderRadius={'50%'} objectFit={'cover'} objectPosition={'top'} src={product.imageUrl} />
                                    </Td>
                                    <Td whiteSpace={'nowrap'} maxW={'120px'} overflow={'hidden'} textOverflow={'ellipsis'}>{product.description}</Td>
                                    <Td>
                                      <Badge colorScheme='green'>
                                      {product.condition}
                                      </Badge>
                                    </Td>
                                    <Td>{product.minimumBid}</Td>
                                    <Td>{product.currentBid}</Td>
                                    <Td>
                                    <Menu>
                                      <MenuButton display={'flex'} w={'40px'} h={'40px'} justifyContent={'center'} transition={'0.5s linear'} className="logoutBtn" _hover={{bg: "gainsboro"}} borderRadius={'50%'} alignItems={'center'} gap={'7px'} fontWeight={600} fontSize={'18px'}>
                                        <FontAwesomeIcon className="logoutIcon" icon={faBars}/>
                                        
                                      </MenuButton>
                                      <MenuList display={'flex'} flexDir={'column'} gap={'7px'}>
                                        
                                          <EditProduct/> 
                                         
                                        <MenuItem padding={'9px 12px'} transition={'0.5s linear'} fontWeight={600}  display={'flex'} justifyContent={'space-between'} borderBottom={"2px solid gainsboro"}  bg={''} color={''} _hover={{
                                          borderBottom: "2px solid transparent",
                                          bg: "#f8ecfa",
                                          color: "#fd8018"
                                        }}>
                                          close bid 
                                          <FontAwesomeIcon icon={faLock}/>
                                        </MenuItem>
                                        <MenuItem padding={'9px 12px'} transition={'0.5s linear'} fontWeight={600} onClick={()=>{
                                                 Swal.fire({
                                                  title: `Are you sure you want to delete ${product.name}?`,
                                                  text: "You won't be able to revert this!",
                                                  icon: "warning",
                                                  showCancelButton: true,
                                                  confirmButtonColor: "#3085d6",
                                                  cancelButtonColor: "#d33",
                                                  confirmButtonText: "Yes, delete it!"
                                                }).then((result) => {
                                                  if (result.isConfirmed) {
                                                    Swal.fire({
                                                      title: "Deleted!",
                                                      text: "Your file has been deleted.",
                                                      icon: "success",
                                                      
                                                    }
                                                    );
                                                    deleteProduct(product.id)
                                                  }
                                                });
                                        }} borderBottom={"2px solid gainsboro"}  bg={''} display={'flex'} justifyContent={'space-between'} color={''} _hover={{
                                          bg: "#ffeced",
                                          borderBottom: "2px solid transparent",
                                          color: "#fa5e5e"
                                        }}>
                                          Delete 
                                          <FontAwesomeIcon icon={faTrash}/> 
                                        </MenuItem>
                                      </MenuList>
                                    </Menu>
                                    </Td>
                                  
                                    
                                </Tr>
                            )
                        })
                    }
                        
                        </Tbody>
                    </Table>
                </TableContainer>
                <Box w={'100%'} display={ AllProducts.length === 0 ? 'flex' : 'none'} padding={'30px 0'} justifyContent={'center'}>
                    <Spinner size={'xl'} color='blue' thickness='4px' emptyColor='gray.200'/> lootif
                  </Box>
                </Box>
            </Box>  
    </>
  )
}

export default SellersProduct
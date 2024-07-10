import { Box, Checkbox, Flex, FormControl, FormLabel, Img, Input, InputGroup, InputLeftAddon, InputRightAddon, ListItem, Menu, MenuButton, MenuItem, MenuList, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text, Tooltip, UnorderedList } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaDollarSign, FaMoneyBill, FaSearch } from 'react-icons/fa'
import Cookies from 'js-cookie'
import { Link  } from 'react-router-dom';
import OneProduct from '../../components/productComponents/OneProduct';
import { MdGraphicEq } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBell, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { ProductInterface } from '../../interfaces/productInterface.interface';
import { CategoryInterface } from '../../interfaces/categoryInterface.interface';

function AllProduct() {
    const [grid, setGrid] = useState(3);
    axios.defaults.headers.common = {
        'Authorization': `Bearer ${Cookies.get("JwtToken")}`
      };
    
        const [Products, setProducts] = useState<ProductInterface[]>([]);
        const [ErrorMes, setErrorMeg] = useState<unknown>()
        const [Category, setCategory] = useState<CategoryInterface[]>([])
        // const [filteredProducts, setFilteredProduct] = useState([])
        const [Search, setSearch] = useState('')
        // const [filters, setFilters] = useState<ProductInterface[]>();
   
         const getCategory = async ()=>{
           try{
               const response = await axios.get(`http://localhost:5050/api/v1/categories`
               )
               console.log(response.data);
               // Cookies.set("productID", response.data.id)
              //  setCategory(response.data)
           
           }catch(err){
               console.log(err);
               console.log(err);
           }
         }   
         
        useEffect(()=>{
            getCategory();
          const getAllProduct = async ()=>{
            try{
              const response = await axios.get(`http://localhost:5050/api/v1/user/product/all-product`)
              console.log(response)
              setProducts(response.data)
            }catch(error){
              console.log(error);
              setErrorMeg(error)
            }
                console.log(Products)
          }
          getAllProduct()
        //   setFilteredProduct(students)
        }, []) 
        
        
         
  return (
    <>
        <Box w={'100%'} display={'flex'} alignItems={'center'} flexDir={'column'} overflowX={'hidden'} justifyContent={'center'}> 
            <Box className='shop_header' display={'flex'} justifyContent={'center'} flexDir={'column'} alignItems={'center'} height={'350px'} w={'100%'} bg={'blueviolet'}> 
                    <Text fontSize={'60px'} color={'white'} fontWeight={800} >Shop</Text>
                    <Text fontSize={'20px'} fontWeight={600} color={'white'}>Find product that suits your taste</Text>
            </Box>
            <Box className='shop_products' display={'flex'} w={'1800px'} margin={'0'} gap={'2%'} position={'sticky'} top={'250px'} justifyContent={'center'}>
                <Box className='sideBar' w={'25%'} bg={''} padding={"30px 20px"} borderRight={'2px solid gray'} h={'700px'}  top={''} color={''}>
                    <Box display={'flex'} flexDir={'column'} gap={'30px'}>
                        <Box display={'flex'} flexDir={'column'} gap={'30px'}>
                            <Box display={'flex'} flexDir={'column'}paddingBottom={'30px'} borderBottom={'2px solid gray'} gap={'0px'} w={'100%'}>
                                <Text fontWeight={600} fontSize={'18px'}>Search Product</Text>
                                <Input type='search' placeholder='Search' value={Search}  color={'GrayText'} fontSize={'18px'} fontWeight={600} border={'2px solid gainsboro'} w={'80%'}/>
                            </Box>
                             <UnorderedList display={'flex'} flexDir={'column'} gap={'20px'}>
                             <ListItem>
                                <Text fontSize={'17px'} marginBottom={'-10px'} fontWeight={600}>Condition</Text>
                             </ListItem>
                              {
                                ["NEW", "OLD"].map((condition)=>{
                                    return(
                                        <ListItem>
                                        <Checkbox fontSize={'10px'} 
                                                name="size"
                                                // value={condition}
                                                // checked={filters.condition.includes(condition)}
                                                // onChange={handleFilterChange}
                                                fontWeight={600} color={'GrayText'} 
                                                colorScheme='green'
                                    >
                                        {condition}
                                        </Checkbox>
                                    </ListItem>
                                    )
                                })
                              }
                               
                             </UnorderedList>
                             <UnorderedList display={'flex'} flexDir={'column'} gap={'20px'}>
                             <ListItem>
                                <Text fontSize={'17px'} marginBottom={'-10px'} fontWeight={600}>Category</Text>
                             </ListItem>
                               {
                                Category.map((cate)=>{
                                    return(
                                        <ListItem key={cate.id}>
                                        <Checkbox fontSize={'10px'} fontWeight={600} color={'GrayText'} colorScheme='green'>
                                            {cate.name}
                                        </Checkbox>
                                    </ListItem>
                                    )
                                })
                               }
                              
                             </UnorderedList>
                             <UnorderedList display={'flex'} flexDir={'column'} gap={'20px'}>
                             <Text fontSize={'17px'} fontWeight={600}>Price Range</Text>
                                <ListItem>
                                    {/* <Input type='range'/> */}
                                    {/* <RangeSlider defaultValue={[120, 240]}   value={filters.priceRange}
          onChange={handleFilterChange}>
                                        <RangeSliderTrack>
                                            <RangeSliderFilledTrack bg={'green'}/>
                                        </RangeSliderTrack>
                                        <RangeSliderThumb boxSize={6} index={0}>
                                            <Box color='tomato' as={FaDollarSign} />
                                        </RangeSliderThumb>
                                        <RangeSliderThumb boxSize={6} index={1}>
                                            <Box color='tomato' as={FaDollarSign} />
                                        </RangeSliderThumb>
                                    </RangeSlider> */}
                                      <div className="filter-group">
                                        <label htmlFor="priceRange">Price Range:</label>
                                        <input
                                        type="range"
                                        id="priceRange"
                                        min={0}
                                     
                                        />
                                    </div>
                                </ListItem>
                             </UnorderedList>
                        </Box>
                    </Box>
                </Box>
                <Box className='products' display={'flex'} flexDir={'column'} gap={'40px'} w={'70%'} padding={'2% 3%'} bg={''}>
                    <Box className='shop_filter' display={'flex'} w={'100%'} alignItems={'center'} height={'100px'} bg={'yellow'} position={'sticky'} top={'300px'} justifyContent={'space-between'}>
                 
                    <Box>
                            <FormControl>
                            <InputGroup>
                                 <Input type="text" id='fruitInput' list='fruitList' w={'200px'} placeholder='Filter' bg={'white'} color={'black'} fontSize={'20px'} fontWeight={600} border={'3px solid black'} borderRight={'transparent'} _hover={{
                                    border: "3px solid black",
                                    borderRight: "transparent"
                                 }} _focus={{
                                    border: "3px solid black",
                                    borderRight: "transparent",
                                    outline: "transparent"
                                 }} outline={'transparent'} />
                                 <InputRightAddon bg={'white'} border={'3px solid black'} borderLeft={'transparent'}><FaAngleDown/></InputRightAddon>
                            </InputGroup>

                            <datalist id='fruitList'>
                                {
                                    Category.map((cate)=>{
                                        return(
                                            <option key={cate.id} value={cate.name}>{cate.name}</option>
                                        )
                                    })
                                }
                                
                                
                            </datalist>
                            </FormControl>
                            
                    </Box>
                    <Box>
                        <Flex gap={'12px'}>
                            <Box w={'40px'} h={'40px'} onClick={()=> setGrid(2)} borderRadius={'50%'} border={'3px solid black'} display={'flex'} justifyContent={'center'} alignItems={'center'}>|</Box>
                            <Box w={'40px'} h={'40px'} onClick={()=> setGrid(3)} borderRadius={'50%'} border={'3px solid black'} display={'flex'} justifyContent={'center'} alignItems={'center'}>|</Box>
                        </Flex>
                    </Box>
                    </Box>
                   
                    <Box w={'100%'} h={'100%'}>
                      {
                        Array.isArray(Products) &&  Products.length > 0 ? 
                                <Box w={'100%'} display={'grid'} gridTemplateColumns={`repeat(${grid}, minMax(200px, 1fr))`} gap={'50px'} justifyContent={'center'}>
                           {
                               Products.map(prods=>{
                                   return(
                                    //   <Box key={prods.id}>
                                    //     <OneProduct  prods={prods}/>
                                    //   </Box>
                                    <Box key={prods.id} w={'100%'} bg={'white'} transition={'0.5s linear'} boxShadow={"7px 10px 15px 0px #70727448"} _hover={{ boxShadow: "7px 10px 15px 0px #707274" }} borderRadius={'14px'} overflow={'hidden'} display={'flex'} flexDir={'column'} gap={'10px'}>
                <Box className='prod_img' borderBottom={'2px solid black'} height={'250px'} overflow={'hidden'} w={'100%'}>
                    <Img cursor={'pointer'} w={'100%'} transition={'0.6s linear'} _hover={{ transform: "scale(1.5)" }} h={'100%'} objectFit={'contain'} src={prods.imageUrl} />
                </Box>
                <Box className='prod_desc' display={'flex'} w={'100%'} flexDir={'column'} padding={'10px 20px 20px 20px'}>
                    <Text fontWeight={700} fontSize={'17px'}>{prods.name}</Text>
                    <Text fontSize={'16px'} fontWeight={600} color={'GrayText'} w={'80%'} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{prods.description}</Text>
                    <Text>
                        Current Bid:  ₦{prods.currentBid}
                    </Text>
                    <Box display={'flex'} w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                        <Tooltip label='group' colorScheme='black' hasArrow placement='top'>
                            <Box cursor={'pointer'} w={'50px'} h={'50px'} borderRadius={'7px'} bg={'white'} display={'flex'} justifyContent={'center'} alignItems={'center'} boxShadow={'2px 1px 9px 2px gray'}>
                                <FontAwesomeIcon icon={faLayerGroup} />
                            </Box>
                        </Tooltip>
                        <Link to={`/products/${prods.id}`} style={{
                            width: "30%",
                            height: "100%"
                        }}>
                            <Box w={'100%'} h={'100%'} borderRadius={'7px'} bg={'black'} display={'flex'} justifyContent={'center'} alignItems={'center'} color={'white'} fontSize={'17px'} fontWeight={600}>
                                Bid
                            </Box>
                        </Link>
                        <Tooltip label='get notification' colorScheme='black' hasArrow placement='top'>
                            <Box cursor={'pointer'} w={'50px'} h={'50px'} borderRadius={'7px'} bg={'white'} display={'flex'} justifyContent={'center'} alignItems={'center'} boxShadow={'2px 1px 9px 2px gray'}>
                                <FontAwesomeIcon icon={faBell} />
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
                                       
                                   )
                               })
                           }
                           
                          
                       </Box>
                       : 
                       <Box display={'flex'} w={'100%'} bg={''} height={'100%'} justifyContent={'center'} alignItems={'center'} color={'black'}>
                              <Box>
                                <Box display={'flex'} flexDir={'column'} gap={'40px'} alignItems={'center'}>
                                  <FontAwesomeIcon fontSize={'130px'} icon={faBagShopping}/>
                                </Box>
                                <Text fontWeight={800} fontSize={'70px'} color={'gray'}> 
                                  No product found 
                                  {Products.length}
                                </Text>
                              </Box>
                          </Box> 
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default AllProduct
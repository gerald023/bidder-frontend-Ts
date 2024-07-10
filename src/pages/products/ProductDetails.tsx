import { Box, Button, Img, Input, ListItem, Tab, TabIndicator, TabList, TabPanel, TabPanels, Table, TableCaption, TableContainer, Tabs, Tbody, Td, Text, Tfoot, Th, Thead, Tr, UnorderedList } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../styles/product.css'
// import CountdownTimer from '../timer/CountdownTimer ';
import loadingCar from '../../images/loadingCar.gif'
import { ProductInterface } from '../../interfaces/productInterface.interface';
import { BidInterface } from '../../interfaces/bidInterface.interface';
function ProductDetails() {

  const targetDate = new Date(2024, 6, 4, 18, 0, 0).getTime();
    axios.defaults.headers.common = {
        'Authorization': `Bearer ${Cookies.get("KEY")}`
      };

    const [Product, setProduct] = useState<ProductInterface>({});
    const [Bid, setBid] = useState<string>();
    const [AllBids, setAllBids] = useState<BidInterface[]>([]);
  const { id } = useParams();
  useEffect(()=>{
    const getOneProduct = async ()=>{
      
      try{
        const response = await axios.get(`http://localhost:5050/api/v1/user/product/${id}`)
        console.log(response.data)
        setProduct(response.data)
      }catch(error){
        console.log(error);
        console.log(id);
      }

    }
    
    getOneProduct()
    getAllBids()
    
  }, [])

  // console.log(Product.id + " " + Bid)
  const getAllBids = async ()=>{
    try{
        const response = await axios.get(`http://localhost:5050/api/v1/bids/list/${id}`)
        setAllBids(response.data)
        console.log(response.data);
      
      setAllBids(response.data)
      console.log(AllBids)
    
    }catch(err){
        console.log(err);
        // console.log(err.code);
    }
  } 
const PlaceBid = async ()=>{
    try{
        const response = await axios.post(`http://localhost:5050/api/v1/bids/place/${id}/${Cookies.get("userID")}`,
        {
            bidAmount: Bid
        }
        )
        console.log(response.data);
        if(response.data){
          window.location.reload();
        }

        // Cookies.set("productID", response.data.id)
        // setBid(response.data)
    
    }catch(err){
        console.log(err);
        // console.log(err.code);
    }
  } 
  const handleBidding = ()=>{
    console.log(id, Bid, Product.id);
  //   if (Bid) {
  //     PlaceBid()
  //     console.log(Bid);
  //   }
  }
 
  if (!Product) {
    return <div>
        Loading product details...
        <Img w={"500px"} h={"300px"} src={loadingCar}/> 
        <br />
        {id} 
    </div>
  }



   
 

  return (
    <>
       <Box className={"product_details"} display={'flex'} w={'100%'} justifyContent={'center'} padding={"0px 0 120px 0"} alignItems={'center'}>
            <Box className={"main_con"} display={'flex'} flexDir={'column'} w={'1700px'} bg={''} justifyContent={'space-between'}>
              <Text fontSize={'60px'} fontWeight={'800'}>
                 Product Details
              </Text>
                <Box className='prod_con' gridTemplateColumns={'repeat(auto-fit, minMax(30%, 45%))'} padding={'40px 0'} gap={'10%'} justifyContent={'space-between'}  display={'flex'} w={'100%'}> 
                    <Box className={"product_img"} height={'550px'}display={'flex'} w={'130%'} gap={'5%'} alignItems={'center'} justifyContent={'center'} >
                      <UnorderedList display={'flex'} flexDir={'column'} h={'100%'} justifyContent={'space-between'} gap={'20px'}>
                        <ListItem h={'200px'} overflow={'hidden'}  border={'2px solid black'} padding={'10px'} w={'100px'} bg={''}>  
                             <Img h={'100%'} w={'100%'} src={Product.imageUrl} aspectRatio={'2/3'} objectFit={'cover'}/>
                        </ListItem>
                          <ListItem h={'200px'} overflow={'hidden'}  border={'2px solid black'} padding={'10px'} w={'100px'}>
                             <Img h={'100%'} w={'100%'} src={Product.imageUrl2} aspectRatio={'2/3'} objectFit={'cover'}/>
                        </ListItem>
                          <ListItem h={'200px'} overflow={'hidden'}  border={'2px solid black'} padding={'10px'} w={'100px'}>
                             <Img h={'100%'} w={'100%'} src={Product.imageUrl3} aspectRatio={'2/3'} objectFit={'cover'}/>
                        </ListItem>
                      </UnorderedList>
                        <Box w={'70%'} h={'100%'} display={'flex'} borderRadius={'20px'} bg={'gainsboro'} justifyContent={'center'} alignItems={'center'}>
                            <Img src={Product.imageUrl} height={''} w={'130%'}  objectPosition={'top'}/>
                        </Box>
                    </Box>
                    <Box className='product_desc' w={'90%'} justifyContent={'space-between'} display={'flex'} flexDir={'column'} gap={'30px'}>
                      <Box display={'flex'} flexDir={'column'}  gap={'40px'}>
                      <Text fontSize={'40px'} fontWeight={700}>
                            {Product.name}
                        </Text>
                        <Text fontSize={'20px'} fontWeight={600} color={'GrayText'}> 
                            {Product.description}
                        </Text>
                        <Text fontSize={'25px'} fontWeight={600} color={'black'}>
                           Current Bid:  ₦{Product.currentBid} 
                        </Text>

                      </Box>
                      <Box>
                        {/* <CountTimer2 */}
                        {/* <CountdownTimer targetDate={targetDate}/> */}
                      </Box>
                        <Box w={'80%'} display={'flex'} h={'70px'}>
                            {/* {Product.currentBid + 25} */}
                         <form action="" style={{width: "100%", display: "flex", alignItems: "center"}} onSubmit={handleBidding}>
                            <Input type='number' placeholder='Enter your bid' required value={Bid} onChange={(e)=> setBid(e.target.value)} w={'80%'} h={'100%'} fontSize={"20px"} fontWeight={700} _focus={{
                                    border: "2px solid black"
                                }} borderRadius={"7px 0 0 7px"} border={'2px solid black'} />
                                <Button className=''  onClick={PlaceBid} cursor={'pointer'}  w={"20%"} transition={'0.6s linear'} fontSize={'23px'} fontWeight={600} h={'100%'} bg={'black'} color={'white'} borderRadius={'0 7px 7px 0'} border={"2px solid transparent"} zIndex={""} _hover={{bg: "white", color: "black", borderColor: "black"}} overflow={'hidden'}>
                                    Bid
                                </Button>
                         </form>

                        </Box>
                    </Box>
                </Box>
                <Box className='bidders'>

                </Box>
                <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                  <Tabs size={'lg'} w={'100%'} bg={''}>
                    <TabList display={'flex'} justifyContent={'center'} w={'100%'} gap={'60px'}>
                      <Tab fontSize={'20px'} fontWeight={700}>Details</Tab>
                      <Tab fontSize={'20px'} fontWeight={700}>Bid List</Tab>
                      <Tab fontSize={'20px'} fontWeight={700}>Reviews</Tab>
                    </TabList>

                    {/* <TabIndicator mt={'3px'} h={'3px'}  bg='blue.500' /> */}
                    <TabPanels>
                        <TabPanel>
                        <TableContainer>
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>Engine Type</Th>
        <Th>Speed</Th>
        <Th isNumeric>Fuel Capacity</Th>
        <Th isNumeric>Serial Number</Th>
        <Th isNumeric></Th>
        <Th isNumeric>Mileage</Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>{Product.engineType}</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer> 
                        </TabPanel>
                        <TabPanel>
                          <TableContainer>
                            <Table variant='simple'>
                              <TableCaption>List of all Bidders</TableCaption>
                              <Thead>
                                <Tr>
                                  <Th>First name</Th>
                                  <Th>Last name</Th>
                                  <Th>Bid Amount</Th>
                                  <Th>Winner</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                  {
                                AllBids && AllBids.map((bid)=>{
                                      <Tr key={bid.id}>
                                        <Td>{bid.bidderFirstName}</Td>
                                        <Td>{bid.bidderLastName}</Td>
                                        <Td>{bid.bidAmount}</Td>
                                        <Td>{bid.isWinningBid ? "Winner!" : ":("}</Td>
                                      </Tr>
                                    })
                                  }
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </TabPanel>
                        <TabPanel>
                          All Reviews
                        </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
            </Box>
        </Box> 
    </>
  )
}

export default ProductDetails
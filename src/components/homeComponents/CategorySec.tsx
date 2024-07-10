import { Box, Button, Img, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import rolex from '../../images/rolex.png';
import '../../styles/carousel.css'
import chair from '../../images/chair2.png'
import axios from 'axios';
import Cookies from 'js-cookie';

function CategorySec() {
    const [Category , setCategory] = useState([])

    axios.defaults.headers.common = {
        'Authorization': `Bearer ${Cookies.get("KEY")}`
      };
    // useEffect(()=>{
    //     setCategory(Categories)
        
    // }, Category)
 

    useEffect(()=>{
        const getAllCategory = async () =>{
            try{
                const response = await axios(`http://localhost:5050/api/category`)
                setCategory(response.data)
            }catch(error){
                console.log(error);
            }
        }
        getAllCategory()
    }, Category)
  return (
    <>
        <Box display={'flex'} flexDir={'column'} w={'100%'} padding={'6% 4%'} alignItems={'center'} gap={'40px'} bg={''}>
            <Box display={'flex'} flexDir={'column'} gap={'14px'} alignItems={'center'}>
                <Text fontSize={'50px'} fontWeight={700} textAlign={'center'}>Browse through our Prestigious Category</Text>
                <Text fontSize={'18px'} fontWeight={600} color={'gray'}>Pick a category you would like to explore</Text>
            </Box>
            <Box display={'grid'} w={'100%'} justifyContent={'center'} gridTemplateColumns={'repeat(auto-fit, minMax(140px, 200px))'} gap={'20px'}>
                {
                    Category.map(cate =>{
                        return(
                            <Box w={'100%'} h={''} display={'flex'} gap={'15px'} flexDir={'column'} alignItems={'center'}>
                                <Box w={'100%'} h={'200px'} display={'flex'} gap={'15px'} justifyContent={'center'} alignItems={'center'} bg={'gainsboro'} boxShadow={'3px 3px 5px 1px #000a'} className='cate_img' borderRadius={'15px'}>
                                <Img src={rolex} w={'70%'} h={'100%'} objectFit={'contain'}/>
                                </Box>
                                <Text fontSize={'16px'} fontWeight={700}>{cate.name}</Text>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
        <Box display={'flex'} w={'100%'} justifyContent={'center'} margin={'50px 0'} gap={'5%'}>
                <Box display={'flex'} bg={'gainsboro'} borderRadius={'12px'} className='custom' padding={'2%'} justifyContent={'space-between'} alignItems={'center'} h={'240px'} w={'600px'}>
                    <Box display={'flex'} flexDir={'column'} gap={'10px'}>
                        <Text fontSize={'17px'} color={'gray'} fontWeight={'600'}>Get up to 40% off</Text>
                        <Text fontSize={'23px'} color={'black'} fontWeight={'700'}>Custom Furniture for you</Text>
                        <Button colorScheme='blue' w={'fit-content'}>Visit Shop</Button>
                    </Box>
                    <Box w={'50%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Img w={''} h={'100%'} objectFit={'contain'} src={chair}/>
                    </Box>
                </Box>
                <Box display={'flex'} bg={'gainsboro'} borderRadius={'12px'} className='custom' padding={'2%'} justifyContent={'space-between'} alignItems={'center'} h={'240px'} w={'600px'}>
                    <Box display={'flex'} flexDir={'column'} gap={'10px'}>
                        <Text fontSize={'17px'} color={'gray'} fontWeight={'600'}>Get up to 40% off</Text>
                        <Text fontSize={'23px'} color={'black'} fontWeight={'700'}>Custom Furniture for you</Text>
                        <Button colorScheme='blue' w={'fit-content'}>Visit Shop</Button>
                    </Box>
                    <Box w={'50%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Img w={''} h={'100%'} objectFit={'contain'} src={chair}/>
                    </Box>
                </Box>
        </Box>
    </>
  )
}

export default CategorySec
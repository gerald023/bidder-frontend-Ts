import { Box,  Img, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import {  faAngleLeft, faAngleRight, faRightLeft, faShop, faStar, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { useState }  from 'react'
import '../../styles/tweet.css'
// import useEmblaCarousel from 'embla-carousel-react/components/useEmblaCarousel'
import { Partners, tweets } from '../../components/data/tweetData'
import Carousel from 'react-bootstrap/Carousel';
import Collection from './Collection';



function Testimonies() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex:number) => {
      setIndex(selectedIndex);
    };
  return (
    <>
         <Box className='ads' display={'grid'} padding={'120px 0'} alignItems={'flex-start'} gridTemplateColumns={'repeat(auto-fit, minMax(350px, 450px))'} gap={'50px'} margin={'0 auto'} justifyContent={'center'}>
            <Box display={'flex'} gap={'40px'}  padding={'14px 10px'} justifyContent={'center'} alignItems={'center'}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100%'} className='ads_icon'>
                    <FontAwesomeIcon fontSize={'40px'} color='black' icon={faShop}/>
                </Box>
                <Box className='ads_txt' display={'flex'} flexDir={'column'} gap={'5px'} >
                    <Text fontSize={'28px'} fontWeight={600}>Classic Collection</Text>
                    <Text fontSize={'21px'} color={'#707274'}>Any product for your space and taste</Text>
                </Box>
            </Box>
            <Box display={'flex'} gap={'40px'}  padding={'14px 10px'} justifyContent={'center'} alignItems={'center'}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100%'} className='ads_icon'>
                    <FontAwesomeIcon fontSize={'40px'} color='black' icon={faTruckFast}/>
                </Box>
                <Box className='ads_txt' display={'flex'} flexDir={'column'} gap={'5px'} >
                    <Text fontSize={'28px'} fontWeight={600}>Fast Shipping</Text>
                    <Text fontSize={'21px'} color={'#707274'}>Fast shipping on order</Text>
                </Box>
            </Box>
            <Box display={'flex'} gap={'40px'}  padding={'14px 10px'} justifyContent={'center'} alignItems={'center'}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100%'} className='ads_icon'>
                    <FontAwesomeIcon fontSize={'40px'} color='black' icon={faRightLeft}/>
                </Box>
                <Box className='ads_txt' display={'flex'} flexDir={'column'} gap={'5px'} >
                    <Text fontSize={'28px'} fontWeight={600}>100% Money Back</Text>
                    <Text fontSize={'21px'} color={'#707274'}>If the item didn't suit you</Text>
                </Box>
            </Box>
        </Box>
        <Collection/>
     {/* <Box w={'1200px'} display={'flex'} justifyContent={'center'} flexDir={'column'} alignItems={'center'} gap={'30px'} margin={'0 auto'}>
        <Text fontSize={'23px'} fontWeight={700}>From the people</Text>
     <Carousel className='caro' activeIndex={index} onSelect={handleSelect} prevIcon={<FontAwesomeIcon color='' icon={faAngleLeft}/>}
        nextIcon={<FontAwesomeIcon width={'fit-content'} height={'fit-content'} icon={faAngleRight}/>} keyboard= {true}
     fade>
     {
        tweets.map((tweet=>{
            return(
                <Carousel.Item className='caro_card'>
                <Box w={'100%'} h={'100%'} bg={''} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Carousel.Caption className='caption'>
                   <Box className='profilePic' display={'flex'} alignItems={'flex-end'} gap={'23px'}>
                    <Img borderRadius={'50%'} src={tweet.img}/>
                    <Text fontSize={'18px'} fontWeight={700}>{tweet.name}</Text>
                   </Box>
                   <Box>
                    <Text fontSize={'17px'} fontWeight={'600'}>{tweet.pText}</Text>
                    <Text>{tweet.text}</Text>
                   </Box>
                   <Box display={'flex'} gap={'5px'}>
                    {
                        [...Array(5)].map((star, index)=>{
                            return(
                                
                                    <FontAwesomeIcon   className={`${tweet.star >= index + 1 ? 'checked' : ''}`} icon={faStar}/>
                                    
                            )
                        })
                    }
                   </Box>
                 </Carousel.Caption>
                </Box>
               </Carousel.Item>
            )
        }))
     }
      </Carousel>
     </Box> */}

     <Box w={'100%'} margin={'60px 0'} display={'flex'} flexDir={'column'} gap={'40px'} justifyContent={'center'} alignItems={'center'}>
        <Text fontSize={'60px'} color={'black'} fontWeight={800}>Meet our exclusive partners</Text>
        <UnorderedList w={'1300px'} display={'grid'} justifyContent={'center'} gap={'30px'} gridTemplateColumns={'repeat(auto-fit, minMax(200px, 250px))'}>
           {
            Partners.map((partner)=>{
                return(
                    <ListItem w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} className='partner' position={'relative'}>
                        <Img src={partner} objectFit={'cover'} pos={'relative'} />
                    </ListItem>
                )
            })
           }
        </UnorderedList>
     </Box>
    </>
  )
}

export default Testimonies
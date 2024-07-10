import { Box, Img, Text, Tooltip } from '@chakra-ui/react'
import { faBell, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { ProductInterface } from '../../interfaces/productInterface.interface'

function OneProduct({ prods }: { prods: ProductInterface }) {
    return (
        <>
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
                        <Link to={`/product/${prods.id}`} style={{
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
        </>
    )
}

export default OneProduct
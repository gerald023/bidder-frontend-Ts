import { Box, Button, Flex, ListItem, OrderedList, Text } from '@chakra-ui/react'
import { faDotCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2';



function Notification() {
    
  return (
    <>
        <Box w={'100%'} display={'flex'} flexDir={'column'} gap={'45px'}>
            <Box className='title'>
                <Text fontSize={'23px'} fontWeight={'600'}>Notifications</Text>
            </Box>
            <Box w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <OrderedList w={'100%'} display={'flex'} flexDir={'column'} gap={'20px'}>
                    <ListItem w={'100%'}>
                        <Flex w={'100%'} justifyContent={'space-between'} padding={'12px'} bg={'white'} borderRadius={'7px'}>
                            <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime placeat aliquid earum.</Text>
                            <Button bg={'gainsboro'}>
                                <FontAwesomeIcon icon={faEllipsis}/>
                            </Button>
                        </Flex>
                    </ListItem>
                    <ListItem w={'100%'}>
                        <Flex w={'100%'} justifyContent={'space-between'} padding={'12px'} bg={'white'} borderRadius={'7px'}>
                            <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime placeat aliquid earum.</Text>
                            <Button bg={'gainsboro'}>
                                <FontAwesomeIcon icon={faEllipsis}/>
                            </Button>
                        </Flex>
                    </ListItem>
                    <ListItem w={'100%'}>
                        <Flex w={'100%'} justifyContent={'space-between'} padding={'12px'} bg={'white'} borderRadius={'7px'}>
                            <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime placeat aliquid earum.</Text>
                            <Button bg={'gainsboro'}>
                                <FontAwesomeIcon icon={faEllipsis}/>
                            </Button>
                        </Flex>
                    </ListItem>
                    <ListItem w={'100%'}>
                        <Flex w={'100%'} justifyContent={'space-between'} padding={'12px'} bg={'white'} borderRadius={'7px'}>
                            <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime placeat aliquid earum.</Text>
                            <Button bg={'gainsboro'} onClick={()=>{
                                 Swal.fire({
                                    title: "Do you want to save the changes?",
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: "Save",
                                    denyButtonText: `Don't save`
                                  }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {
                                      Swal.fire("Saved!", "", "success");
                                    } else if (result.isDenied) {
                                      Swal.fire("Changes are not saved", "", "info");
                                    }
                                  })
                            }}>
                                <FontAwesomeIcon icon={faEllipsis}/>
                            </Button>
                        </Flex>
                    </ListItem>
                </OrderedList>
            </Box>
        </Box>
    </>
  )
}

export default Notification
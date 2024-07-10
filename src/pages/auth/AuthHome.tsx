import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGavel } from '@fortawesome/free-solid-svg-icons'
import { Outlet } from 'react-router'
import { Box, Text } from '@chakra-ui/react'
import './auth.css'



function AuthHome() {
  return (

    <>
          <Box w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} bg={''} h={'100vh'} overflow={'hidden'}>
          <Box w={'1800px'} display={'flex'} overflow={'hidden'} h={'100%'}>
          <Box className='authSideBar'>
                <Box className='authNavContent'>
                  <Box display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'} gap={'7px'} color={'white'}>
                    {/* <Img src={logo} w={'70px'} h={'70px'}/> */}
                    <Text display={'flex'} justifyContent={'center'} alignItems={'center'} w={'60px'} h={'60px'} borderRadius={'50%'} bg={'#ddc07d'}>
                      <FontAwesomeIcon icon={faGavel} color='black' fontSize={'30px'}/>
                    </Text>
                    <Text className='authTitle'>BIDIFY</Text>
                  </Box>
                  <Box>
                    <Text fontSize={'16px'} fontWeight={600} color={'white'} textAlign={'center'} marginLeft={'20px'}>Luxury Product, at you leisure!</Text>
                  </Box>
                </Box>
            </Box>
        <Outlet/>
          </Box>
        </Box>
    </>
  )
}

export default AuthHome
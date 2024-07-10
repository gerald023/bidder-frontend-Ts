import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function ChooseAuth() {
    return (
      <>
          <Box w={'100%'} h={'100%'} display={'flex'} flexDir={'column'} gap={'30px'} justifyContent={'center'} alignItems={'center'}>
             <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={' '} fontSize={'19px'}>
                  <Text fontSize={'60px'} fontWeight={800} >Hi, welcome to Bidify 👋🏾</Text>
                      <Text fontWeight={'600'} color={'GrayText'}>Get started by...</Text>
             </Box>
              <Box display={'flex'} flexDir={'column'} gap={'20px'} alignItems={'center'} w={'30%'}>
                  <Link style={{width: "100%"}} to={'/auth/signup'}>
                      <Button w={'100%'} bg={'gainsboro'} _hover={{bg: "#c6c6c6"}} padding={'24px 0'} transition={'0.5s linear'} fontSize={'18px'} fontWeight={600}>Sign In</Button>
                  </Link>
                  <Link to={'/auth/login'} style={{width: "100%"}}>
                      <Button w={'100%'} bg={'#ddc07d'} _hover={{bg: "#cab074"}} padding={'24px 0'} transition={'0.5s linear'} fontSize={'18px'} fontWeight={600}>Login</Button>
                  </Link>
              </Box>
          </Box>
      </>
    )
  }
  
  export default ChooseAuth
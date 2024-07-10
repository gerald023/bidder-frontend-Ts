import { Box, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, ListItem, Text, Tooltip, UnorderedList } from '@chakra-ui/react'
import { FaFacebook, FaFacebookF, FaInstagram, FaTelegram, FaTelegramPlane } from 'react-icons/fa';
import { IoMdMail } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaXTwitter } from 'react-icons/fa6';


function Footer() {
    const links = {
        fontSize: "15.5px",
        fontWeight: "600"
      }
  return (
    <>
            <Box as='footer' w={'100%'} display={'flex'} flexDir={'column'} gap={'30px'} padding={'20px 5%'}>
        <Flex justifyContent={'space-between'}>
          <UnorderedList display={'flex'} gap={'14px'} flexDir={'column'} listStyleType={'none'}>
            <ListItem fontSize={'19px'} fontWeight={700}>
              Category
            </ListItem>
            <ListItem>
              <Link style={links} to={''}>
                Clothing
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Artifacts
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Tech
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Watches
              </Link>
            </ListItem>
          </UnorderedList>
          <UnorderedList display={'flex'} gap={'14px'} flexDir={'column'} listStyleType={'none'}>
            <ListItem fontSize={'19px'} fontWeight={700}>
              Category
            </ListItem>
            <ListItem>
              <Link style={links} to={''}>
                Clothing
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Artifacts
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Tech
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Watches
              </Link>
            </ListItem>
          </UnorderedList>
          <UnorderedList display={'flex'} gap={'14px'} flexDir={'column'} listStyleType={'none'}>
            <ListItem fontSize={'19px'} fontWeight={700}>
              Category
            </ListItem>
            <ListItem>
              <Link style={links} to={''}>
                Clothing
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Artifacts
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Tech
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Watches
              </Link>
            </ListItem>
          </UnorderedList>
          <UnorderedList display={'flex'} gap={'14px'} flexDir={'column'} listStyleType={'none'}>
            <ListItem fontSize={'19px'} fontWeight={700}>
              Category
            </ListItem>
            <ListItem>
              <Link style={links} to={''}>
                Clothing
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Artifacts
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Tech
              </Link>
            </ListItem>
            <ListItem>
            <Link style={links} to={''}>
                Watches
              </Link>
            </ListItem>
          </UnorderedList>
          <Box display={'flex'} flexDir={'column'} gap={'30px'} justifyContent={'space-between'}>
            <form action="">
              <FormControl>
              <FormLabel>Enter your email</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                  <IoMdMail />
                  </InputLeftElement>
                  <Input w={'300px'} variant={'flushed'} focusBorderColor='#238ae6' borderBottom={'1px solid gray'} type='email' placeholder='enter your email'/>
                </InputGroup>
              </FormControl>
            </form>
            <Box display={'flex'} flexDir={'column'} gap={'20px'}>
              <Text fontSize={'18px'} fontWeight={600}>Follow our socials</Text>
              <Flex gap={'14px'}>
                <Tooltip label='Facebook' placement='bottom' hasArrow={true}>
                <Box className='iconbox'>
                  <FaFacebookF className='icon'/>
                </Box>
                </Tooltip>
               <Tooltip label='Instagram' hasArrow={true}> 
               <Box className='iconbox'>
                  <FaInstagram className='icon'/>
                </Box>
               </Tooltip>
               <Tooltip label='Twitter' hasArrow={true}>
               <Box className='iconbox'>
                  <FaXTwitter className='icon'/>
                </Box>
               </Tooltip>
                <Tooltip label='Telegram' hasArrow={true}>
                <Box className='iconbox'>
                  <FaTelegramPlane className='icon'/>
                </Box>
                </Tooltip>
              </Flex>
            </Box>
          </Box>
        </Flex>
        <Box display={'flex'} borderTop={'1px solid gainsboro'} paddingTop={'12px'} justifyContent={'center'} alignItems={'center'}>
          <Text fontWeight={600} fontSize={'15px'} color={'gray'}>c 2024 terms and conditions apply</Text>
        </Box>
      </Box>
    </>
  )
}

export default Footer
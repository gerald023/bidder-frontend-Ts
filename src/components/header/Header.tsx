import { Alert, Avatar, Box, Button, Flex, FormControl, Img, Input, InputGroup, InputLeftElement, ListItem, Menu, MenuButton, MenuItem, MenuList, Text, UnorderedList } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faSignOut } from "@fortawesome/free-solid-svg-icons";
import '../../styles/Header.css';
import '../../styles/navBar.css';
import profile from '../../images/art.jpg';
import logo from '../../images/bid_logo.webp';


function Header() {
    const linkStyle ={
        height: "fit-content"
      }
      const logOut = ()=>{
        Cookies.remove("KEY");
        Cookies.remove("KEY");
        Cookies.remove("KEY");
        Cookies.remove("KEY");
        Cookies.remove("KEY");
          window.location.reload()
      }
      const dashboard = ()=>{
        window.location.href = "/admin"
      }
  return (
    <>
         <Box w={"100%"} as="nav" padding={'10px 5%'} bg={'white'} position={'sticky'} top={'0'} zIndex={'999'} boxShadow={'0px -5px 20px 2px black'} alignItems={'center'} display={"flex"} justifyContent={"space-between"}>
        <Box display={'flex'} alignItems={'center'} className="app_logo" fontSize={'23px'} fontWeight={600} gap={'20px'}>
          <Link to={''} style={{display:'flex', gap: '5px', alignItems:'center'}}>
          <Img src={logo} w={'70px'} bg={''} h={'70px'} />
          BIDIFY
          </Link>
        </Box>
        <Box>
          <UnorderedList listStyleType={'none'} display={"flex"} gap={"50px"}>
            <ListItem>
              <Menu>
                <MenuButton>
                  <Box fontSize={'18px'} as={'div'} display={'flex'} alignItems={'center'} gap={'7px'} fontWeight={600}>
                  <Text>Category</Text> <Text padding={'8px 0 0 0'}><FaAngleDown /></Text>
                  </Box>
                </MenuButton>
                <MenuList display={''}>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
            </ListItem>
            <ListItem fontSize={'18px'} fontWeight={600}>About us</ListItem>
            <ListItem fontSize={'18px'} fontWeight={600}>Contact us</ListItem>
            <Link to={'products'} style={linkStyle}>
                <ListItem fontSize={'18px'} fontWeight={600}>Shop</ListItem>
            </Link>
          </UnorderedList>
        </Box>
        <Box display={'flex'} gap={'50px'}>
           
         <Box display={'flex'} alignItems={'center'}>
          {
            Cookies.get("KEY") ? 
            <Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'30px'}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <Avatar borderRadius={'50%'} w={'40px'} h={'40px'} src={profile}/>
                </Box>
                <Box fontSize={'20px'} fontWeight={600}>
                  {Cookies.get("shopID")}
                </Box>
                <Box w={'40px'} h={'40px'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={'50%'} _hover={{bg: "gainsboro"}} transition={'0.5s linear'} bg={''}>
                  <FontAwesomeIcon icon={faCartPlus} color="black" fontSize={'20px'}/>
                </Box>
                <Box>
                 
                  <Menu>
                <MenuButton display={'flex'} w={'40px'} h={'40px'} justifyContent={'center'} transition={'0.5s linear'} className="logoutBtn" _hover={{bg: "gainsboro"}} borderRadius={'50%'} alignItems={'center'} gap={'7px'} fontWeight={600} fontSize={'18px'}>
                  <FontAwesomeIcon className="logoutIcon" icon={faSignOut}/>
                </MenuButton>
                <MenuList display={''}>
                  <MenuItem onClick={logOut}>Logout</MenuItem>
                  <MenuItem onClick={dashboard}>Dashboard</MenuItem>
                </MenuList>
              </Menu>
                </Box>
              </Box>
            </Box> : 

            <Box display={'flex'} gap={'20px'}>
            <Link to={'/auth'}>
                <Button colorScheme="black" bg={'black'}>SignUp</Button>
            </Link>
            <Link to={"/auth/login"}>
              <Button color={'white'} bg={'#fa5f5f'}>Login</Button>
            </Link>
            </Box>
          }
         </Box>
        </Box>
      </Box>
    </>
  )
}

export default Header
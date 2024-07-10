import { Box, Button, Flex, FormControl, InputGroup, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import ReUseInput from '../../components/elements/ReUseInput'
import { FaEye, FaEyeSlash, FaLock, FaMailBulk } from 'react-icons/fa'
import { FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userToken, setUserToken] = useState()

  const tooglePassword = () =>{

      setShowPassword(!showPassword)
  }


  const methods = useForm()

  const [success, setSuccess] = useState(false)
  const [childRole, setChildRole] = useState()
 

  // const setLoginCookie = (IDName, RoleName,jwtName,userName, userID, Role, jwt,user_name, days)=>{
  //   let expires = "";
  //   if (days) {
  //     let date = new Date();
  //     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  //     expires = "; expires=" + date.toUTCString();
  // }
  // document.cookie = IDName + "=" + (userID || "") + expires + "; path=/";
  // document.cookie = RoleName + "=" + (Role || "") + expires + "; path=/";
  // document.cookie = jwtName + "=" + (jwt || "") + expires + "; path=/";
  // document.cookie = userName + "=" + (user_name || "") + expires + "; path=/";
  
  // }



  const [UserRole, setUserRole] = useState();
  const [ownerID, setOwnerID] = useState();

  const LoginUser = async ()=>{
    // Cookies.remove("UserName")
    // Cookies.remove("shopID")
    // Cookies.remove("userID")
    // Cookies.remove("userRole")
    // Cookies.remove("productID")
    // Cookies.remove("Full_Shop")
    // Cookies.remove("productID")
    try{
      const response = await axios.post("http://localhost:5050/api/v1/auth/login",
      { 
        username: Email,
        password: Password
      }
      )
      window.location.href = '/'
      
      // console.log(response.data.user.role);
      console.log(response.data.user.username);
      Cookies.set("JwtToken", response.data.accessToken, {expires: 3});
      Cookies.set("KEY", response.data.accessToken, {expires: 3}); 
      Cookies.set("userID", response.data.user.id, {expires: 3});
      Cookies.set("userRole", response.data.user.role, {expires: 3});
      Cookies.set("UserName", response.data.user.username, {expires: 3});      
    //   console.log(response.headers.setAuthorization());
      console.log(Cookies.get("JwtToken")); 
      setUserRole(response.data.user.role);
      // setOwnerID(response.data.user.id)
      console.log( axios.defaults.headers); 
      console.log(response.data);
      console.log(userToken);
    }catch(err){
      console.log(err);
      console.log(err.response.status);
    }
    // setTimeout(() => {
    //   window.location.reload(true)
    // }, 5000);
  }
  // axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("JwtToken")}`;

  // axios.defaults.headers.common = {
  //   'Authorization': `Bearer ${Cookies.get("JwtToken")}`
  // };


  


  const onSubmit = methods.handleSubmit(data => {
    
    setSuccess(true);
      console.log(data);
      if (data) {
        
        LoginUser();
        if (success === true) {
          // window.location.href = "/";
          console.log(LoginUser(), success);
        }
        
      
        // if(UserRole === "ADMIN"){
        //   Swal.fire({
        //     title: "Successful login!",
        //     text: "Click on the button to go to dashboard",
        //     icon: "success",
        //     showCancelButton: false,
        //     showLoaderOnConfirm: true,
        //     confirmButtonText: "dashboard",
        //     confirmButtonColor: "#3085d6",
        //     allowOutsideClick: false
        //     }).then((result) => {
        //     if (result.isConfirmed) {
               
        //         window.location.href = "/admin/dashboard"
        //     }
        //     })
        // }
      
          methods.reset();
      }
      
      console.log(success);
      data.role = childRole
      methods.setFocus('')
      console.log(childRole)
  })



  let formStyle = {
      width: "400px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      // alignItems: "center",
      gap: "30px",
      backdropFilter: "blur(10px)",
      position: "relative"
      // color: "white"
  }
  

  return (
    <>
        <Box w={'100%'} h={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
       
            <Box w={'50%'} height={'100%'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
              <Box>
              <FormProvider {...methods}>
               <form autoComplete='off' style={formStyle} onSubmit={e => e.preventDefault()} noValidate>
              <Box>
                   <FormControl >
                        <Tooltip label={'enter email'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={Email} onChangeValue={(e)=> setEmail(e.target.value)} color={'black'}  type={'email'} id={'email'} showLeft={'flex'}  message={'email is required'}  showRight={'none'} pickIcon={<FaMailBulk/>} placeholder={'enter your email'} label={'email'} />
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                   </Box>
                   <Box>
                   <FormControl >
                        <Tooltip label={'enter password'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={Password} onChangeValue={(e)=> setPassword(e.target.value)} color={'black'} type={showPassword === true ? 'text' : 'password'}
                             message={'password is required'} minLengths={4} lengthMeg={'Password length must be more than 4'}
                        id={'password'} showLeft={'flex'} showRight={'flex'} pickIcon={<FaLock/>} showPassword={tooglePassword} pickIcon2={showPassword === true ? <FaEye/> : <FaEyeSlash/>} placeholder={'enter your password'} label={'Password'} />
                        
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                    
                   </Box>
                   <Box display={'flex'} flexDir={'column'} gap={'20px'}>
                   <Box w={'100%'} display={'flex'} justifyContent={'flex-end'}>
                      <Link style={{ fontSize: "15px", fontWeight: "600", color: "gray" }} to={''}>Forgot password?</Link>
                    </Box>
                    <Button  onClick={()=> onSubmit()} w={'100%'} fontWeight={600} fontSize={'17px'} color={'black'} borderRadius={'30px'} _hover={{bg: "#cab074"}} h={'50px'}  backgroundColor={'#ddc07d'} >Login</Button>
                  <Flex fontWeight={600} fontSize={'15px'} alignItems={'flex-start'} gap={'4px'}>
                  <Text display={'flex'} alignItems={"center"}>
                      Don't have an account?</Text>
                      <Link to={"/auth/signup"} style={{
                        color: 'blue',
                      }}>SignUp now</Link>
                  </Flex>
                   </Box>
                   </form>
                   </FormProvider>
              </Box>
             
            </Box>
          
        </Box>
    </>
  )
}

export default Login
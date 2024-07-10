import { Box, Button, FormControl, FormLabel, HStack, Img, Input, InputGroup, InputLeftAddon, InputRightAddon, LinkBox, Text, Tooltip, useRadioGroup } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowRightToBracket, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';
import {motion, AnimatePresence} from 'framer-motion'
import { faCheckCircle, faUser } from '@fortawesome/free-regular-svg-icons';
import { RadioCard } from './Role';
import { FormProvider, useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import ReUseInput from '../../components/elements/ReUseInput';
import { FaEye, FaEyeSlash, FaLock, FaMailBulk } from 'react-icons/fa';
// import { Last } from 'react-bootstrap/esm/PageItem';
import axios from 'axios';

const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };
  const dotsVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: -10,
      scale: 1.3,
      transition: { type: "spring", stiffness: 1000, damping: "10" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };


function SignUp() {
    const [Role, setChildData] = useState('');
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Username, setUsername] = useState('');

    
  let user_name = firstName.slice(0,1) + LastName.slice(0,1)
 
  const SignUp = async ()=>{
    try{
      const response = await axios.post(`http://localhost:5050/api/v1/auth/signup`,
      {
        firstName: firstName,
        lastName: LastName,
        username: Username,
        email: Email,
        password: Password,
        role: Role
        // assignProducts: Products
      }
      )
      console.log(response.data);
    }catch(err){
      console.log(err);
    }
    // setTimeout(() => {
    //   window.location.reload(true)
    // }, 5000);
  }
  const [showPassword, setShowPassword] = useState(false)

    const tooglePassword = () =>{

        setShowPassword(!showPassword)
        console.log(Username);
    }
    const methods = useForm()

    const [success, setSuccess] = useState(false)
    const [childRole, setChildRole] = useState()
   

  

    const onSubmit = methods.handleSubmit(data => {
      setSuccess(true);
        console.log(data);
        if (data) {
          SignUp()
          // console.log(SignUp());
          Swal.fire({
            title: "Successfully Registered!",
            text: "Click on the button to login",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "Login",
            confirmButtonColor: "#3085d6",
            // allowOutsideClick: false
            }).then((result) => { 
            if (result.isConfirmed) {
               
                window.location.href = "/auth/login"
            }
            })
            methods.reset();
        }
        
        console.log(success);
        data.role = childRole
        methods.setFocus('')
        console.log(childRole)
    })



    let formStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0px",
        // backdropFilter: "blur(10px)",
        position: "relative"
        // color: "white"
    }
        
 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('left');
    const [errorMsg, setErrorMeg] = useState('')

    const nextImg = () =>{
      // console.log(Role);
        setDirection("right");
        if (!Role) {
          setCurrentIndex(0);
          setErrorMeg("Please choose a role")
        }
        else{
          setErrorMeg(`Welcome ${Role}`)
          setCurrentIndex((prevIndex)=> prevIndex + 1 === 4? 0 : prevIndex + 1)
        }
    }
    const prevImg = () =>{
        setDirection("left");
        setCurrentIndex((prevIndex)=> prevIndex - 1 < 0 ? 4 - 1 : prevIndex - 1)
    } 
 
    const submittedForm = () =>{
       
            console.log(success);
    }

    /*for position */

    const options = ['SELLER', 'BUYER', 'ADMIN']

   
  
    
       
  
    const getData = (role:string)=>{
          setChildData(role)
          console.log(role);
          // console.log(Role);
          // sendRole()
    }
  
  
      const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
      //   onChange: console.log,
      })
    
      const group = getRootProps();   
  return (
    <>
         <Box w={'100%'} display={'flex'} flexDir={'column'}  alignItems={'center'} h={'100%'}  overflow={'hidden'} justifyContent={'center'}>
    
    <Box w={'100%'} bg={''} h={'100%'} display={'flex'} boxShadow={'2px 2px 2px 2px black'} overflow={'hidden'}>
       <FormProvider {...methods}>
       <form autoComplete='off' style={ {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0px",
        // backdropFilter: "blur(10px)",
        position: "relative"
        // color: "white"
    }} onSubmit={e => e.preventDefault()} noValidate>
        <Box w={'100%'} display={'flex'} alignItems={'center'} pos={'absolute'} top={'3%'} justifyContent={'center'} gap={'20px'}>
                <Box w={'70px'} position={'relative'}  h={'70px'} borderRadius={'50%'} display={'flex'} justifyContent={'center'} alignItems={'center'} className='loader' border={!Role ? '3px solid gray' : '3px solid green'}>
                    <FontAwesomeIcon fontSize={'150%'} color={!Role ? "gray" : "green" } icon={faUser}/>
                </Box>
                <Text w={'80px'} h={'2.5px'} bg={!Role ? "gray" : "green"}></Text>
                <Box w={'70px'} position={'relative'}  h={'70px'} borderRadius={'50%'} display={'flex'} justifyContent={'center'} alignItems={'center'} className='loader' border={success === true ? '3px solid green' : '3px solid gray'}>
                    <FontAwesomeIcon fontSize={'150%'} color={success === true ? "green" : 'gray'} icon={faArrowRightToBracket}/>
                </Box>
                <Text w={'80px'} h={'2.5px'} bg={success === true ? "green" : 'gray'}></Text>
                <Box w={'70px'} position={'relative'}  h={'70px'} borderRadius={'50%'} display={'flex'} justifyContent={'center'} alignItems={'center'} className='loader' border={success === true ? '3px solid green' : '3px solid gray'}>
                    <FontAwesomeIcon fontSize={'150%'} color={success === true ? "green" : 'gray'} icon={faCheckCircle}/>
                </Box>
            </Box>
           <Box w={'100%'} display={'flex'} overflow={'hidden'}>
           <AnimatePresence>
                <motion.div className='loginAnimate'  variants={slideVariants} initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
    animate="visible"
    exit="exit" key={currentIndex} >
           <Box w={'900px'} overflow={'hidden'} h={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} bg={''}>
           <Box w={'100%'} display={currentIndex === 0 ? "flex" : "none"} flexDir={'column'} alignItems={'center'} gap={'20px'} backdropBlur={''} justifyContent={'center'} bg={''} h={''}>
                <HStack {...group} display={'flex'} gap={'30px'}>
                {options.map((value) => {
                  const radio = getRadioProps({ value })
                  return (
                    <RadioCard sendData={getData}  key={value} {...radio}>
                      {value}
                    </RadioCard>
                  )
                })}
              </HStack>
                <Text fontSize={'20px'} fontWeight={600} color={!Role ? "#fa5e5e" : "#000"}>
                  {!Role ? errorMsg : Role === 'SELLER' ?`Welcome our exceptioner seller` : Role === "BUYER" ? `Our most esteemed customer, we are pleased to serve to the best of out abilities` : `Welcome ${Role}`}
                </Text>
            </Box>
            <Box w={'100%'} display={currentIndex === 1 ? "flex" : "none"} marginTop={'70px'} flexDir={'column'} alignItems={'center'} gap={'0px'} backdropBlur={''} justifyContent={'center'} bg={''} h={''}>
              <Box w={'50%'} display={'flex'} flexDir={'column'} alignItems={''} gap={'20px'}  backdropBlur={''} justifyContent={'center'} bg={''} h={''}>
         <Box> 
           <FormControl >
               <Tooltip label={'enter first name'} hasArrow placement='top'>
               <ReUseInput errorBackground={'#fff3e6'} iconColor={'#fa5e5e'} textColor={'#fa5e5e'}  inputValue={firstName} onChangeValue={(e)=> {setFirstName(e.target.value)}} color={'black'} type={'text'} showLeft={'none'} showRight={'none'} id={'firstname'} message={'first name is required'} minLengths={3} lengthMeg={'name length must be more than 3'} placeholder={'enter your first name'} label={'First name'} />
               </Tooltip>
            </FormControl>
           </Box>
           <Box>
           <FormControl >
                <Tooltip label={'enter last name'} hasArrow placement='top'>
                <ReUseInput errorBackground={'#fff3e6'} iconColor={'#fa5e5e'} textColor={'#fa5e5e'} inputValue={LastName} onChangeValue={(e)=> {setLastName(e.target.value)}} color={'black'} type={'text'} id={'LastName'} showLeft={'none'} 
                     message={'last name is required'} minLengths={3} lengthMeg={'name length must be more than 3'}
                showRight={'none'} placeholder={'enter your last name'} label={'Last name'} />
                </Tooltip>
            </FormControl>
           </Box>
           <Box>
           <FormControl >
                <Tooltip label={'enter username'} hasArrow placement='top'>
                <ReUseInput errorBackground={'#fff3e6'} iconColor={'#fa5e5e'} textColor={'#fa5e5e'} inputValue={Username} onChangeValue={(e)=> setUsername(e.target.value)} color={'black'} type={'text'} id={'Username'} showLeft={'none'} 
                     message={'username is required'} minLengths={3} lengthMeg={'name length must be more than 3'}
                showRight={'none'} placeholder={'enter your username'} label={'Username'} />
                </Tooltip>
            </FormControl>
           </Box>  
           <Box>
           <FormControl >
                <Tooltip label={'enter email'} hasArrow placement='top'>
                <InputGroup>
                <ReUseInput errorBackground={'#fff3e6'} iconColor={'#fa5e5e'} textColor={'#fa5e5e'} inputValue={Email} onChangeValue={(e)=> setEmail(e.target.value)} color={'black'}  type={'email'} id={'email'} showLeft={'flex'}  message={'email is required'}  showRight={'none'} pickIcon={<FaMailBulk/>} placeholder={'enter your email'} label={'email'} />
                </InputGroup>
                </Tooltip>
            </FormControl>
           </Box>
           <Box>
           <FormControl >
                <Tooltip label={'enter password'} hasArrow placement='top'>
                <InputGroup>
                <ReUseInput errorBackground={'#fff3e6'} iconColor={'#fa5e5e'} textColor={'#fa5e5e'} inputValue={Password} onChangeValue={(e)=> setPassword(e.target.value)} color={'black'} type={showPassword === true ? 'text' : 'password'}
                     message={'password is required'} minLengths={7} lengthMeg={'Password length must be more than 7'}
                id={'password'} showLeft={'flex'} showRight={'flex'} pickIcon={<FaLock/>} showPassword={tooglePassword} pickIcon2={showPassword === true ? <FaEye/> : <FaEyeSlash/>} placeholder={'enter your password'} label={'Password'} />
          
                
                </InputGroup>
                </Tooltip>
            </FormControl>
           </Box>
       
        
          
              </Box>
           <Box w={'100%'} display={'flex'} marginTop={'15px'} justifyContent={'center'}>
            <Button onClick={()=> onSubmit()} marginTop={'10px'}  w={'50%'} color={'black'} borderRadius={'30px'} h={'50px'}  backgroundColor={'#ddc07d'} _hover={{bg: "#cab074"}} >Sign up</Button>
           </Box>
           <Box w={'100%'} display={'flex'} justifyContent={'center'} marginTop={'15px'} alignItems={'flex-start'} gap={'7px'}>
           <Text fontSize={'18px'} fontWeight={'600'} color={'GrayText'}>Already have an account? </Text>
           <Link to={'/auth/login'}>
                <LinkBox fontSize={'18px'} fontWeight={'600'} color={'blue'}>Login</LinkBox>
           </Link>
           </Box>
        </Box>
        <Box w={'100%'} display={currentIndex === 2 ? "flex" : "none"} marginTop={'90px'} flexDir={'column'} alignItems={'center'} gap={'20px'} backdropBlur={''} justifyContent={'center'} bg={''} h={''}>
        </Box>
           </Box>
                </motion.div>
            </AnimatePresence>
         
           </Box>
            
        
        <Box w={'78%'} display={'flex'} pos={'absolute'} justifyContent={'space-between'}>
        <Box w={'50px'} onClick={prevImg} cursor={'pointer'} h={'50px'} borderRadius={'50%'} bg={'#000'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
    <FontAwesomeIcon fontSize={'22px'} color='#cab074' icon={faArrowLeft} />
</Box>
<Box w={'50px'} onClick={nextImg} cursor={'pointer'} h={'50px'} borderRadius={'50%'} bg={'#000'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
    <FontAwesomeIcon fontSize={'22px'} color='#cab074' icon={faArrowRight} />

</Box>
        </Box>
        </form>
       </FormProvider>
        
    </Box>
</Box>
    </> 
  )
}

export default SignUp
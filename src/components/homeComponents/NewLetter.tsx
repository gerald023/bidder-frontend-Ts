import { Box, Button, FormControl, Input, Text, Tooltip } from '@chakra-ui/react'
import ReUseInput from '../elements/ReUseInput';
import { FormProvider, useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import newletterImg from '../../images/BLACK-GRADIENTS.jpg'


function NewLetter() {
    const methods = useForm()

    const onSubmit = methods.handleSubmit(data => {
          console.log(data);
            // Swal.fire({
            //   title: "Successfully Registered!",
            //   text: "Click on ok to login",
            //   icon: "success",
            //   showCancelButton: false,
            //   confirmButtonText: "Login",
            //   confirmButtonColor: "#3085d6",
            //   }).then((result) => {
            //   if (result.isConfirmed) {
                 
            //       window.location.href = "/auth/login"
            //   }
            //   })
          
          methods.reset();
          methods.setFocus("")
      });
      const formStyle = {
        width: "100%",
        color: "white"
      }
  return (
    <>
         <Box w={'100%'} display={'flex'} justifyContent={'center'} flexDir={'column'} gap={'30px'} margin={'90px 0'} alignItems={'center'}>
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} textAlign={'center'}>
            <Text fontSize={'50px'} fontWeight={700}>Sign up for our Newsletter</Text>
            <Text fontSize={'20px'} fontWeight={600} color={'#707274'} textShadow={'1px 0px 0px black'}> Submit your Email to recieve daily update!</Text>
            </Box>
           <Box  w={'900px'} display={'flex'} justifyContent={'center'} borderRadius={'20px'} padding={'120px 0'} backgroundPosition={'top'} backgroundSize={'contain'} bg={'black'} bgImage={newletterImg}>
           <FormProvider {...methods}>
            <form action="" style={formStyle} autoComplete='off' onSubmit={e => e.preventDefault()} noValidate>
                <Box display={'flex'}   alignItems={'center'} justifyContent={'center'}>
                <Box display={'flex'} w={'60%'} alignItems={'flex-end'}>
                <FormControl >
                       <Tooltip display={'flex'} label={'enter email'} hasArrow placement='top'>
                       <ReUseInput type={'text'} textShadow={'2px 2px 2px black'} errorBackground={'black'} iconColor={'red'} color={'white'} showLeft={'flex'} showRight={'none'} pickIcon={<FontAwesomeIcon icon={faEnvelope}/>} id={'firstname'} message={'email address is required'} minLengths={3} lengthMeg={'email length must be more than 3'} placeholder={'enter your email'} label={'Email'} />
                       {/* <Input type='text'/> */}
                       </Tooltip>
                    </FormControl>
                    <Button onClick={onSubmit} bg={'transparent'} borderBottom={'2px solid white'} color={'white'} borderRadius={'0'} _hover={{bg: "transparent"}}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </Button>
                </Box>
                </Box>
            </form>
            </FormProvider>
           </Box>
        </Box>
    </>
  )
}

export default NewLetter
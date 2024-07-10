import { Box, Button, FormLabel, HStack, PinInput, PinInputField, Text } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react'

function VerifyOTP() {
    const [pin, setPin] = useState<string>('');
    const [error, setError] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const verifyPin = async (pinValue: string) : Promise<boolean> =>{
    try{
        const response = await axios.post(`http://localhost:5050/api/v1/auth/validate-otp/${pinValue}`)
        console.log(response)
        console.log(response.data)
        if (response.data === false) {
            setError("invalid OTP code")
        }
        return response.data;
    }catch(errormeg){
        console.log(errormeg)
    }
  }
    const onPinChange = (value: string)=>{
        setPin(value);
        // console.log(value)
        // console.log(pin)
       
        if (value.length === 6) {
            const isValid:boolean = verifyPin(value);
            setIsVerified(isValid);
            console.log(isValid);
            if (!isValid) {
            //   setError('Invalid PIN');
            }
          } else {
            setError('');
            setIsVerified(false);
          }
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (pin.length !== 6) {
          setError('Please enter all 6 digits.');
          return;
        }
    
        if (isVerified) {
          console.log('PIN Verified:', pin);
        } else {
          setError('Invalid PIN.');
        }
      };
  return (
    <>
      <Box w={'100%'} h={'100%'} display={'flex'} justifyContent={'flex-start'} paddingTop={'30px'} flexDir={'column'} gap={'20px'} alignItems={'center'}>
        <Box display={'flex'} flexDir={'column'} gap={'30px'}>
        <Text fontSize={'50px'} fontWeight={'700'}>Enter the OTP</Text>
        <Text color={'GrayText'} fontWeight={'600'} fontSize={'20px'}>Enter the OTP code sent to your email</Text>
        </Box>
        <form action="" style={{display: 'flex', flexDirection: 'column', gap: '20px', height: '40%', justifyContent: 'center'}}>
        <FormLabel fontWeight={'800'} fontSize={'17px'}>OTP</FormLabel>
            <HStack>
                <PinInput type='number' value={pin} onChange={onPinChange} otp mask size={'lg'}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>
            {error && <Text color="red.500" mt={2}>{error}</Text>}
      <Button onClick={handleSubmit} mt={4} colorScheme='blue' isDisabled={pin.length !== 6 || !isVerified}>
        Verify
      </Button>
        </form>
      </Box>
    </>
  )
}

export default VerifyOTP
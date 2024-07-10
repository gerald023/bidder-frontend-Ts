import { Box, Button, FormControl, FormLabel, Input, InputGroup, Tooltip } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import ReUseInput from "../../components/elements/ReUseInput";
import { FaMailBulk } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface ISignUpForm {
    email: string;   
  }
  

function ForgetPassword() {

    const [Email, setEmail] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [ErrorMes, setErrorMeg] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
        
      } = useForm<ISignUpForm>(); 

      const fireAlert = ()=>{
        let timerInterval: number | undefined;
        Swal.fire({
            position: "top-right",
        title: "OTP sent!",
        html: "Redirecting.",
        width: '200px',
        timer: 2000,
        heightAuto: '200px',
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer: any = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            // console.log("I was closed by the timer");
            // alert("alert has been closed")
            window.location.href = "verify-otp"
        }
        });
      }

      const getOTPCode = async () =>{
        setIsSubmitting(true);
        try{
            const response = await axios.post("http://localhost:5050/api/v1/auth/request-otp", 
                {
                    email: Email
                }
            )
            console.log(response);
            fireAlert()
        }catch(error: any){
            console.log(error)
            setErrorMeg(error.response.data)
        }finally {
            setIsSubmitting(false);
          }
      }

      const onSubmit: SubmitHandler<ISignUpForm> = (data: any) => {
        // console.log(data);
        if (data) {
            getOTPCode()
            reset()
        }
        // getOTPCode()
      };
        
  return (
    <>
        <Box w={'100%'} h={"100%"} bg={''} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <form action="" onSubmit={handleSubmit(onSubmit)} style={{
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
  }}>
            <Box >
                   <FormControl >
                   <FormLabel>Email</FormLabel>
                        <InputGroup>
                        <Input type="email" value={Email} w={'100%'} h={'50px'} {...register("email", { required: "Email is required" ,pattern:{value:/\S+@\S+\.\S+/, message:'Email format is invalid'}})}
 placeholder="enter your email" onChange={(e)=> {setEmail(e.target.value); setErrorMeg('')}}/>
                
                        </InputGroup>
                    </FormControl>
                    {errors.email && <span style={{color: "red"}}>{errors.email.message}</span>}
                    {ErrorMes && <span style={{color: "red"}}> {ErrorMes} </span>}
                   </Box> 
                   <Input type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting..." : "Submit"}  bg={'blue'} color={'white'} fontWeight={'700'} fontSize={'17px'} />
            </form>
        </Box>
    </>
  )
}

export default ForgetPassword
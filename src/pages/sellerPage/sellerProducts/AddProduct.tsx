import { Box, Button, Flex, FormControl, FormLabel, Img, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea, Tooltip, useDisclosure, useToast,  } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { FormProvider, useForm } from 'react-hook-form';
import ReUseInput from '../../../components/elements/ReUseInput';
import { FaCartPlus, FaClipboard, FaEye, FaEyeSlash, FaLock, FaMailBulk, FaTags } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SlSpeedometer } from "react-icons/sl";
import { PiGasCanBold } from "react-icons/pi";
import { PiEngineBold } from "react-icons/pi";
import { FaBarcode } from "react-icons/fa";
import { CategoryInterface } from '../../../interfaces/categoryInterface.interface';

function AddProduct() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    
    axios.defaults.headers.common = {
      'Authorization': `Bearer ${Cookies.get("JwtToken")}`
    };
    const [product_name, setName] = useState<any>('');
    const [Desc, setDesc] = useState<any>('');
    const [MinimumBid, setMinimumBid] = useState<any>();
    const [Cate, setCate] = useState<any>('');
    const [Mileage, setMileage] = useState<any>();
    const [Speed, setSpeed] = useState<any>();
    const [FuelCapacity, setFuelCapacity] = useState<any>();
    const [EngineType, setEngineType] = useState<any>('');
    const [SerialNumber, setSerialNumber] = useState<any>('');
    const [CarType, setCarType] = useState<any>('');

    const [SelectedImage1, setSelectedImage1] = useState<any>('');
    const [selectedName, setSelectedName] = useState<any>("");
    const [image, setImage] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<any>();
  
    const [SelectedImage2, setSelectedImage2] = useState<any>();
    const [ImagePreview2, setImagePreview2] = useState<any>(null);

    const [SelectedImage3, setSelectedImage3] = useState<any>();
    const [ImagePreview3, setImagePreview3] = useState<any>(null);

    const uploadImage2 = (event:any)=>{
      const file = event.target.files[0];
      setSelectedImage2(file);

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImagePreview2(imageUrl);
  } 
  if(file.size > 5093443) {
    alert("File is too big!");
    setSelectedImage2(null);
    setImagePreview2(null);
  }


    }
    const uploadImage3 = (event:any)=>{
      const file = event.target.files[0];
      setSelectedImage3(file);

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImagePreview3(imageUrl);
  } 
  if(file.size > 5093443) {
    alert("File is too big!");
    setSelectedImage3(null);
    setImagePreview3(null);
  }


    }


    const onImageChange = (event:any) => {
      const file = event.target.files[0];
      setSelectedImage1(file);
      
      if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
      }
      if(event.target.files[0].size > 5093443){
        alert("File is too big!");
        setImage(null)
        setSelectedImage1(null)
       
        setErrorMessage('file is bigger than 5mb')
     }
     else {
      setErrorMessage(` has been added`);
     }
    }
     const changeImage =(event:any)=>{
      setImage(null)
      setSelectedImage1(null)
      setSelectedName('')
     }

     const [Category, setCategory] = useState<CategoryInterface[]>([])
   
     useEffect(()=>{
      const getCategory = async ()=>{
        try{
            const response = await axios.get(`http://localhost:5050/api/v1/categories`
            )
            console.log(response.data);
            // Cookies.set("productID", response.data.id)
            setCategory(response.data)
        
        }catch(err){
            console.log(err);
            console.log(err);
        }
      }   
      getCategory();
     }, [])

    const addNewProduct = async ()=>{
      try{
          const response = await axios.post(`http://localhost:5050/api/v1/admin/product`,
          { 
            name: product_name,
            description: Desc,
            minimumBid: MinimumBid,
            condition: "NEW",
            categoryId: Cate,
            shopId: Cookies.get("shopID"),
            imageUrl: SelectedImage1,
            imageUrl2: SelectedImage2,
            imageUrl3: SelectedImage3,
            mileage: Mileage,
            speed: Speed,
            fuelCapacity: FuelCapacity,
            engineType: EngineType,
            serialNumber: SerialNumber,
            type: CarType
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          )
          console.log(response.data);
          window.location.reload()
          Cookies.set("productID", response.data.id)
      
      }catch(err){
          console.log(err);
          console.log(err);
      }
       
      
      // setTimeout(() => {
      //   window.location.reload(true)
      // }, 5000);
    }   
    const addBtn = () =>{
      window.location.reload();
    }

    const methods = useForm()

    const onSubmit = methods.handleSubmit(data => {
        console.log(data);
         if (data) {
          addNewProduct()
          Swal.fire({
            title: "Successfully Registered!",
            text: "Click on the button to login",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "Login",
            confirmButtonColor: "#3085d6",
            }).then((result) => {
            if (result.isConfirmed) {
               
                window.location.href = "/admin/products"
            }
            })
         }
            methods.reset();
        
        
       
        methods.setFocus('')
    })
        
      
    // const handleSubmit = (e)=>{
    //   if (name.trim().length === 0 && number.trim().length === 0) {
    //     e.preventDefault();
    //     // setProducts(null)
    //     Products.splice(-1, 1)
    //   }
    //     // AddProduct(name, number)
    // }
    const toast = useToast()
  return (
    <>
          <Button onClick={onOpen} colorScheme='blue'>Add Prdduct</Button>

<Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              size={'full'} 
              onClose={function (): void {
                  throw new Error('Function not implemented.');
              } }              >
  <ModalOverlay  onClick={()=>{
    toast({
      title: "click close button to cancel",
      status: "warning",
      duration: 4000,
      isClosable: true,
      position: "top-left"
    })
  }}/>
  <ModalContent>
    <ModalHeader display={'flex'} bg={''} pos={'relative'} justifyContent={'space-between'} w={'100%'} alignItems={'center'}>
      <Text  height={'100%'} bg={''} paddingTop={'12px'}>Add new product</Text>
    <Box h={'40px'} pos={'absolute'} right={'3%'} top={'7%'} borderRadius={'50%'} bg={''} transition={'0.5s linear'} cursor={'pointer'} _hover={{bg: "rgb(176, 176, 176)", border: "1px solid gray"}} display={'flex'} justifyContent={'center'} alignItems={'center'} width={'40px'}>
    <FontAwesomeIcon icon={faXmark} onClick={onClose} fontWeight={900} fontSize={'23px'}/>
    </Box>
    </ModalHeader>
    {/* <ModalCloseButton /> */}
    
    <ModalBody pb={6} padding={'30px 50px'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
    <Box display={'flex'} w={'90%'} justifyContent={'space-between'}>
         <FormProvider {...methods}>
               <form autoComplete='off' style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      backdropFilter: "blur(10px)",
      position: "relative",
      flexDirection: 'column',
      gap: "20px"
  }} onSubmit={e => e.preventDefault()} noValidate>
                  <Box w={'100%'} display={'grid'} gridTemplateColumns={'repeat(auto-fit, minMax(300px, 450px))'} gap={'5%'} justifyContent={'center'}>
                  <Box display={'flex'} width={'100%'} flexDir={'column'} gap={'20px'}>
                <Text fontSize={'30px'} fontWeight={600}>Car's Info</Text>
              <Box display={'flex'} gap={'20px'} w={"100%"}>
                   <FormControl >
                        <Tooltip label={'Product name'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={product_name} onChangeValue={(e)=> setName(e.target.value)} color={'black'}  type={'text'} id={'productName'} showLeft={'flex'}  message={'product name is required'} minLengths={3} lengthMeg={"Product name should more than 3 characters"}  showRight={'none'} pickIcon={<FaCartPlus/>} placeholder={'product name'} placeholderWieght={'400'} label={'product name'} />
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                    
                   </Box>
                   <Box>
                       <Select value={Cate} onChange={(e)=>{setCate(e.target.value)}} placeholder='Choose category'>
                     {
                      Category.map((cate)=>{
                        return(
                          <option value={cate.id}>{cate.name}</option>
                        )
                      })
                     }
                    </Select>
                   </Box>
                  <Box display={'flex'} gap={'17px'} justifyContent={'space-between'}>
                  <Box>
                   <FormControl >
                        <Tooltip label={'Product price'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={MinimumBid} onChangeValue={(e)=> setMinimumBid(e.target.value)} color={'black'}  type={'number'} id={'productPrice'} showLeft={'flex'}  message={'product Price is required'} minLengths={0} lengthMeg={"Product name should more than 3 characters"}  showRight={'none'} pickIcon={<FaTags/>} placeholder={'$60,000'} placeholderWieght={'400'} label={'Product price'} />
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                   </Box>
                   <Box>
                   <FormControl >
                        <Tooltip label={'Serial number'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={SerialNumber} onChangeValue={(e)=> setSerialNumber(e.target.value)} color={'black'}  type={'text'} id={'Serial'} showLeft={'flex'}  message={'serial number is required'} minLengths={4} lengthMeg={"serial number should more than 3 characters"}  showRight={'none'} pickIcon={<FaBarcode/>} placeholder={'1HGBH1JX'} placeholderWieght={'400'} label={'Serial number'} />
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                   </Box>
                  </Box>
                   <Box>
                    <FormControl>
                      <Tooltip label={"Description"} hasArrow placeContent={'top'}>
                       <InputGroup>
                       <ReUseInput inputValue={Desc} onChangeValue={(e)=> setDesc(e.target.value)} color={'black'}  type={'text'} id={'prodDesc'} showLeft={'flex'}  message={'product description is required'} minLengths={7} lengthMeg={"Product description should more than 7 characters"}  showRight={'none'} pickIcon={<FaClipboard/>} placeholder={'Describe your product'} placeholderWieght={'400'} label={'Product description'} />

                       </InputGroup>
                      </Tooltip>
                    </FormControl>
                   </Box>
                  
                   
              </Box>
              <Box display={'flex'} width={'100%'} bg={''} flexDir={'column'} gap={'20px'}>
                <Text fontSize={'30px'} fontWeight={600}>Car's Details</Text>
                <Box>
                   <FormControl >
                        <Tooltip label={'Mileage'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={Mileage} onChangeValue={(e)=> setMileage(e.target.value)} color={'black'}  type={'number'} id={'Mileage'} showLeft={'flex'}  message={'mileage is required'} minLengths={0} lengthMeg={" should more than 3 characters"}  showRight={'flex'}  pickIcon={<SlSpeedometer/>} pickIcon2={"miles"} placeholder={'Mileage'} placeholderWieght={'400'} label={'Mileage'} />
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                    
                </Box>
                <Box>
                       <Select value={CarType} onChange={(e)=>{setCarType(e.target.value)}} placeholder='Choose car drive type'>
                          <option value={"AUTOMATIC"}>Automatic</option>
                          <option value={"MANUAL"}>Manual</option>
                    </Select>
                   </Box>
            <Box display={'flex'} justifyContent={'space-between'} gap={'17px'} w={'100%'}>
              <Box>
                   <FormControl >
                        <Tooltip label={'Speed'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={Speed} onChangeValue={(e)=> setSpeed(e.target.value)} color={'black'}  type={'number'} id={'Speed'} showLeft={'flex'}  message={'Speed is required'} minLengths={0} lengthMeg={" should more than 3 characters"}  showRight={'flex'}  pickIcon={<SlSpeedometer/>} pickIcon2={"km/h"} placeholderWieght={'400'}  placeholder={"400"} label={'Speed'} />
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                    
                </Box>
                <Box>
                   <FormControl >
                        <Tooltip label={'Fuel Capacity'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={FuelCapacity} onChangeValue={(e)=> setFuelCapacity(e.target.value)} color={'black'}  type={'number'} id={'Fuel Capacity'} showLeft={'flex'}  message={'fuel is required'} minLengths={2} lengthMeg={" should be more than 10 gal"}  showRight={'flex'}  pickIcon={<PiGasCanBold/>} pickIcon2={"gal"} placeholderColor={'gray'} placeholderWieght={'400'} placeholder={"140"} label={'Fuel cap.'} />
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                    
                </Box>
            </Box>
            <Box>
                   <FormControl >
                        <Tooltip label={'Engine type'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={EngineType} onChangeValue={(e)=> setEngineType(e.target.value)} color={'black'}  type={'text'} id={'Engine'} showLeft={'flex'}  message={'this is required'} minLengths={4} lengthMeg={" should be more than 3 characters"}  showRight={'none'}  pickIcon={<PiEngineBold/>} pickIcon2={""} placeholderColor={'gray'} placeholderWieght={'400'} placeholder={"5.0L Ti-VCT V8 Engine"} label={'Engine type'} />
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                    
                </Box>
              </Box>
              
                  </Box>
                  <Box display={'flex'} bg={''} flexDir={'column'}  gap={'0px'} w={'100%'}>
                    <Text fontSize={'30px'} fontWeight={600}>Car's Images</Text>
                    <Box display={'grid'} w={'100%'} gap={'5%'} justifyContent={'center'} gridTemplateColumns={'repeat(auto-fit, minMax(200px, 300px))'}>
                    <Box bg={'white'} w={'100%'} display={'flex'} flexDir={'column'}  justifyContent={'center'} padding={'25px'} alignItems={'center'}>
                        <Box w={'100%'}  h={'fit-content'} border={'3px dashed rgb(210, 227, 244)'}  gap={'10px'} cursor={'pointer'} display={image ? 'none' : 'flex'} flexDir={'column'} justifyContent={'center'} padding={"10px 15px"} alignItems={'center'} bg={''}>
                          <Box w={'100%'} h={'100%'} bg={''} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} position={'relative'} margin={"0"} >
                            <FormLabel margin={0} cursor={'pointer'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}  >
                        <FontAwesomeIcon icon={faImage} fontSize={'25px'}/>
                        <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'5px'}>
                        <Text textAlign={'center'} fontSize={'15px'} fontWeight={700}>{selectedName || "Click box to upload"}</Text>
                        {/* <Text textAlign={'center'} color={'#bbcada'} fontSize={'15px'}>file must not exceed 5mb</Text> */}
                        </Box>
                        </FormLabel>
                        <Input type='file' id='upload' title=''position={'absolute'} accept='image/*' onChange={onImageChange} opacity={0} border={'none'} w={'100%'} h={'100%'} />
                          </Box>
                        
                        </Box>
                        <Box w={'100%'} h={'80%'} display={image === null ? 'none' : 'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Img w={'200%'} h={'180px'}   objectFit={'contain'} src={image}/>
                        </Box>
                        <Box w={'100%'} h={'20%'} padding={'12px 0 0 0 '} display={'flex'} flexDir={'column'} gap={'12px'}>
                        <Text fontSize={'16px'} fontWeight={600} color={'#504c4c'}>Car's view</Text>
                        <Button colorScheme='red' w={'fit-content'} display={image === null ? 'none' : 'flex'} onClick={changeImage}>Change</Button>
                        </Box>
                     
                    </Box>
                    <Box bg={'white'} w={'100%'} display={'flex'} flexDir={'column'}  justifyContent={'center'} padding={'25px'} alignItems={'center'}>
                        <Box w={'100%'}  h={'fit-content'} border={'3px dashed rgb(210, 227, 244)'}  gap={'10px'} cursor={'pointer'} display={ImagePreview2 ? 'none' : 'flex'} flexDir={'column'} justifyContent={'center'} padding={"10px 15px"} alignItems={'center'} bg={''}>
                          <Box w={'100%'} h={'100%'} bg={''} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} position={'relative'} margin={"0"} >
                            <FormLabel margin={0} cursor={'pointer'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}  >
                        <FontAwesomeIcon icon={faImage} fontSize={'25px'}/>
                        <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'5px'}>
                        <Text textAlign={'center'} fontSize={'15px'} fontWeight={700}>{selectedName || "Click box to upload"}</Text>
                        {/* <Text textAlign={'center'} color={'#bbcada'} fontSize={'15px'}>file must not exceed 5mb</Text> */}
                        </Box>
                        </FormLabel>
                        <Input type='file' id='upload' title=''position={'absolute'} accept='image/*' onChange={uploadImage2} opacity={0} border={'none'} w={'100%'} h={'100%'} />
                          </Box>
                        
                        </Box>
                        <Box w={'100%'} h={'80%'} display={ImagePreview2 === null ? 'none' : 'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Img w={'200%'} h={'180px'}   objectFit={'contain'} src={ImagePreview2}/>
                        </Box>
                        <Box w={'100%'} h={'20%'} padding={'12px 0 0 0 '} display={'flex'} flexDir={'column'} gap={'12px'}>
                        <Text fontSize={'16px'} fontWeight={600} color={'#504c4c'}>Car's interior</Text>
                        <Button colorScheme='red' w={'fit-content'} display={ImagePreview2 === null ? 'none' : 'flex'} onClick={changeImage}>Change</Button>
                        </Box>
                     
                    </Box>
                    <Box bg={'white'} w={'100%'} display={'flex'} flexDir={'column'}  justifyContent={'center'} padding={'25px'} alignItems={'center'}>
                        <Box w={'100%'}  h={'fit-content'} border={'3px dashed rgb(210, 227, 244)'}  gap={'10px'} cursor={'pointer'} display={ImagePreview3 ? 'none' : 'flex'} flexDir={'column'} justifyContent={'center'} padding={"10px 15px"} alignItems={'center'} bg={''}>
                          <Box w={'100%'} h={'100%'} bg={''} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} position={'relative'} margin={"0"} >
                            <FormLabel margin={0} cursor={'pointer'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}  >
                        <FontAwesomeIcon icon={faImage} fontSize={'25px'}/>
                        <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'5px'}>
                        <Text textAlign={'center'} fontSize={'15px'} fontWeight={700}>{selectedName || "Click box to upload"}</Text>
                        {/* <Text textAlign={'center'} color={'#bbcada'} fontSize={'15px'}>file must not exceed 5mb</Text> */}
                        </Box>
                        </FormLabel>
                        <Input type='file' id='upload' title=''position={'absolute'} accept='image/*' onChange={uploadImage3} opacity={0} border={'none'} w={'100%'} h={'100%'} />
                          </Box>
                        
                        </Box>
                        <Box w={'100%'} h={'80%'} display={ImagePreview3 === null ? 'none' : 'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Img w={'200%'} h={'180px'}   objectFit={'contain'} src={ImagePreview3}/>
                        </Box>
                        <Box w={'100%'} h={'20%'} padding={'12px 0 0 0 '} display={'flex'} flexDir={'column'} gap={'12px'}>
                        <Text fontSize={'16px'} fontWeight={600} color={'#504c4c'}>Car's engine</Text>
                        <Button colorScheme='red' w={'fit-content'} display={ImagePreview3 === null ? 'none' : 'flex'} onClick={changeImage}>Change</Button>
                        </Box>
                     
                    </Box>
                    </Box>
                    {/* <ReUseInput/> */}
              </Box>
                  <Box display={'flex'} w={'100%'} justifyContent={'center'} gap={'20px'}>
                    <Button  onClick={()=> onSubmit()} _hover={{bg: "#cab074"}} w={'30%'} color={'black'} borderRadius={'30px'} h={'50px'}  backgroundColor={'#ddc07d'} >Add product</Button>
                   </Box>
                   </form>
                   </FormProvider>
   
    </Box>
      <Box w={'100%'} display={'flex'} justifyContent={'flex-end'} marginTop={'50px'}>
        <Button onClick={onClose} colorScheme='red'>Cancel</Button>
      </Box>
    </ModalBody>

   
  </ModalContent>
</Modal>
    </>
  )
}

export default AddProduct
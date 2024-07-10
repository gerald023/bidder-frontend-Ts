import { Box, Button, FormControl, FormLabel, Img, Input, InputGroup, Text, Tooltip } from '@chakra-ui/react'
import  { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import ReUseInput from '../../../components/elements/ReUseInput'
import { FaMailBulk } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Cookies from 'js-cookie';


function CreateShop() {
    const methods = useForm()
    const [success, setSuccess] = useState<any>();
    const [shopName, setShopName] = useState<string>('');
    const [Desc, setDesc] = useState<string>('');
    const [OpenTime, setOpenTime] = useState<any>();
    // const [store, setStore] = useState<any>();
    
    const onSubmit = methods.handleSubmit(data => {
        setSuccess(true);
          console.log(data);
          if (data) {
            addShop(shopName, Desc, OpenTime)
            Swal.fire({
              title: "Successfully Created!",
              text: "Click to view shop",
              icon: "success",
              showCancelButton: false,
              confirmButtonText: "View",
              confirmButtonColor: "#3085d6",
              }).then((result) => {
              if (result.isConfirmed) {
                 
                  window.location.href = "/admin"
              }
              })
              methods.reset();
          }
          
          console.log(success);
          methods.setFocus('')
      })

      axios.defaults.headers.common = {
        'Authorization': `Bearer ${Cookies.get("JwtToken")}`
      };

    

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [selectedName, setSelectedName] = useState<any>("");
    const [image, setImage] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<any>();
    const [firstFile, setFirstFile] = useState<any>(null)
  
    const onImageChange = (event:any) => {
      let file1 = event.target.value;
      const file = event.target.files[0];
      setFirstFile(file1)
      setSelectedFile(file);
      
      setSelectedName(file.name);
      if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
      }
      if(event.target.files[0].size > 5093443){
        alert("File is too big!");
        setImage(null)
        setSelectedFile(null)
        // setSelectedName(null)
        setFirstFile(file1 = event.target.defaultValue);
        // event.target.value = event.target.defaultValue;
        setErrorMessage('file is bigger than 5mb')
     }
     else {
      setErrorMessage(` has been added`);
     }
    }
     const changeImage =(event:any)=>{
      setImage(null)
      setFirstFile(event.target.defaultValue);
      setSelectedFile(null)
      setSelectedName('')
     }

  
      const addShop = async (shop_name:string, shop_desc:string, shop_openTime:any)=>{
        try{
            const response = await axios.post(`http://localhost:5050/api/v1/shop/${Cookies.get("userID")}`,
            { 
              name: shop_name,
              description: shop_desc,
              openingHours: shop_openTime
            },
            // {
            //   headers: {
            //     'Content-Type': 'multipart/form-data'
            //   }
            // }
            )
            console.log(response.data);
            Cookies.set("ShopID", response.data.id, {expires: 3});
            Cookies.set("full_shop", response.data, {expires: 3});
            console.log(Cookies.get("ShopID"));
        }catch(err){
            console.log(err);
            console.log(err);
        }

      }

  return (
    <>
        <Box w={'100%'} display={'flex'} gap={'4%'}>
            
            <FormProvider {...methods}>
                <form autoComplete='off' style={{
        width: "100%",
        height: "100%",
        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
        gap: "50px",
        backdropFilter: "blur(10px)",
        position: "relative"
        // color: "white"
    }} onSubmit={e => e.preventDefault()} noValidate>
                <Box w={'50%'} display={'flex'} flexDir={'column'} justifyContent={''} gap={'20px'} alignItems={'center'} bg={'white'} borderRadius={'10px'} boxShadow={'5px 10px 10px gray'} padding={'30px 20px'}>
              <Box w={'100%'}>
                   <FormControl >
                        <Tooltip label={'enter shop name'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={shopName} onChangeValue={(e)=> setShopName(e.target.value)} color={'black'}  type={'text'} id={'shop_name'} showLeft={'flex'}  message={'name is required'}  showRight={'none'} pickIcon={<FaMailBulk/>} placeholder={'enter your shop name'} label={'Shop name'} />
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                   </Box>
                   <Box w={'100%'}>
                   <FormControl >
                        <Tooltip label={'Description'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={Desc} onChangeValue={(e)=> setDesc(e.target.value)} color={'black'}  type={'text'} id={'shop_desc'} showLeft={'flex'}  message={'Description is required'}  showRight={'none'} pickIcon={<FaMailBulk/>} placeholder={'enter shop description'} label={'Description'} />
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                   </Box>
                   <Box w={'100%'}>
                   <FormControl >
                        <Tooltip label={'enter shop Openinig hours'} hasArrow placement='top'>
                        <InputGroup>
                        <ReUseInput inputValue={OpenTime} onChangeValue={(e)=> setOpenTime(e.target.value)} color={'black'}  type={'text'} id={'shop_name'} showLeft={'flex'}  message={'time is required'}  showRight={'none'} pickIcon={<FaMailBulk/>} placeholder={'enter your opening hours'} label={'opening hours'} />
                        </InputGroup>
                        </Tooltip>
                    </FormControl>
                   </Box>
                   <Text fontSize={'40px'} fontWeight={700} onClick={()=> console.log(Cookies.get('userID'))}>userID</Text>
                    <Box w={'100%'} display={'flex'} justifyContent={'center'} marginTop={'30px'}>
                    <Button  onClick={()=> onSubmit()} _hover={{backgroundImage: 'linear-gradient(45deg, #00DBDE 0%, #FC00FF 100%)'
                        }} w={'50%'} color={'white'} borderRadius={'30px'} h={'50px'}  backgroundColor={'#00DBDE'} backgroundImage={'linear-gradient(45deg, #00DBDE 0%, #FC00FF 100%)'}>
                            Create shop
                        </Button>
                    </Box>
                </Box>
                   <Box bg={'white'} h={'600px'} display={'flex'} flexDir={'column'} justifyContent={'center'} padding={'25px'} alignItems={'center'}>
                        <Box w={'100%'}  h={'100%'} border={'3px dashed rgb(210, 227, 244)'} position={'relative'} cursor={'pointer'} display={image ? 'none' : 'flex'} flexDir={'column'} alignItems={'center'} bg={''}>
                        <FormLabel cursor={'pointer'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} position={'absolute'} w={'100%'} h={'100%'} gap={'23px'} padding={'15px 0 0 0'} >
                        <FontAwesomeIcon icon={faImage} fontSize={'30px'}/>
                        <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={'12px'}>
                        <Text fontSize={'25px'} fontWeight={600}>{selectedName || "Click box to upload"}</Text>
                        <Text color={'#bbcada'} fontSize={'15px'}>file must not exceed 5mb</Text>
                        </Box>
                        </FormLabel>
                        <Input type='file' id='upload' title='' accept='image/*' onChange={onImageChange} opacity={0} border={'none'} w={'100%'} h={'100%'} />
                        
                        </Box>
                        <Box w={'100%'} h={'80%'} display={image === null ? 'none' : 'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Img w={'100%'} h={'100%'}   objectFit={'contain'} src={image}/>
                        </Box>
                        <Box w={'100%'} h={'20%'} padding={'12px 0 0 0 '} display={image ? 'flex': 'none'} flexDir={'column'} gap={'12px'}>
                        <Text fontSize={'16px'} fontWeight={600} color={'#504c4c'}>{selectedName + errorMessage}</Text>
                        <Button colorScheme='red' w={'fit-content'} onClick={changeImage}>Change</Button>
                        </Box>
                    </Box>
                </form>
                </FormProvider>
            </Box>
    </>
  )     
}

export default CreateShop
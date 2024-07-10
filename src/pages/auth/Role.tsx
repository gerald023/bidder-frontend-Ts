import { Box, HStack, Text, Tooltip, useRadio, useRadioGroup } from '@chakra-ui/react'
import { faArrowRight, faHandHoldingDollar, faShop, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { SetStateAction, useEffect, useState } from 'react'
import '../../styles/auth.css'

export function RadioCard(props:any) {
    const { getInputProps, getRadioProps } = useRadio(props)
  
    const [Role, setRole] = useState(props.children);
    const [iconColor, setIconColor] = useState('')
    
    const getRole = ()=>{
        setRole(props.children)
        // console.log(Role);
        setIconColor('white');
        props.sendData(props.children)
    }

    const input = getInputProps()
    const checkbox = getRadioProps()
    // console.log(props.children);
    return (
      <>
          <Box display={''}>
          <Tooltip label={props.children}>
        <Box bg={''} as='label'>
        <input onClick={getRole} className='roleCheck' checked={Role === props.children} style={{opacity:"", background:'red'}} required {...input} />
        <Box className='slide' transition={'all 1s cubic-bezier(0.42, 0, 0.58, 1)'} flexDir={'column'} gap={'12px'} zIndex={1} pos={'relative'} w={'200px'} cursor={'pointer'} height={'200px'} overflow={'hidden'} borderRadius={'12px'} bg={''} display={'flex'} justifyContent={'center'} alignItems={'center'} border={'3px solid #cab074'}
          {...checkbox}
          boxShadow='md'
          _checked={{
            bg: '#ddc07d',
            color: 'white',
            borderColor: '#ddc07d',
          }}
          _focus={{
            boxShadow: '',
            color: "white"
          }}

          
        >
            <FontAwesomeIcon color={iconColor} fontSize={'70px'} width={'fit-content'} height={'fit-content'} icon={props.children === "SELLER"? faShop : props.children === "BUYER"? faHandHoldingDollar : props.children === "ADMIN" ? faUserTie : null} className='icon'/>
        </Box>
      </Box>
      </Tooltip>
      <Box marginTop={'20px'}>
          <Text fontSize={'30px'} color={'black'} textAlign={'center'} fontWeight={'700'} className='icon'>{props.children}</Text>
      </Box>
          </Box>
      </>
    )
  }

  function Role(props:any) {
    const options = ['SELLER', 'BUYER', 'ADMIN']

  const [Data, setChildData] = useState()

  
     

  const getData = (data:SetStateAction<undefined>)=>{
        setChildData(data)
        // console.log(data);
        sendRole()
  }
  const sendRole = ()=>{
    props.sendData(Data)
  }

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue: 'react',
    //   onChange: console.log,
    })
  
    const group = getRootProps()
  return (
    <>
     
        <HStack {...group} display={'flex'} gap={'30px'}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard sendData={getData} key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
   
    </>
  )
}

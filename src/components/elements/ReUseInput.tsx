import React, { ChangeEventHandler, MouseEventHandler, ReactElement } from 'react';
import cn from 'classnames'
import { useFormContext } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
// import { findInputError, isFormInvalid } from './utils'
import {MdError} from 'react-icons/md'
// import {findInputError, isFormInvalid} from './utils'
import {findInputError} from "../../utils/findInputError"
import { isFormInvalid } from '../../utils/isFormInvalid';
import { Box, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';
import '../../styles/auth.css'
import { FaMailBulk } from 'react-icons/fa';


const framer_error = {
    initial: {opacity: 0, y: 10},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0 , y: 10},
    transition: {duration: 0.2}
}
const InputError = ({message, errorBackground, color, iconColor}: {message:string, errorBackground:string, color:string, iconColor:string})=>{
    return(
        <motion.p className='errorMeg' {...framer_error} style={{
            backgroundColor: errorBackground,
            color: color
        }}   color={'red'}>
            <MdError color={iconColor}/>
            {message}
        </motion.p>
    )
}

function ReUseInput({label, type, id, placeholder, inputValue, placeholderWieght, onChangeValue, errorBackground, iconColor,  showLeft, showRight, pickIcon, pickIcon2, textShadow, showPassword, validation, color, placeholderColor, textColor,  message, minLengths, lengthMeg}: {label?:string|undefined, type?:string, id?:string, placeholder?:string, inputValue?:string, placeholderWieght?:string, onChangeValue?:ChangeEventHandler<HTMLInputElement>, errorBackground?:string | undefined, iconColor?:string, showLeft?:string, showRight?:string, pickIcon?:ReactElement<any, any>, pickIcon2?:ReactElement<any, any>|string, textShadow?:string, showPassword?: MouseEventHandler<HTMLDivElement>, validation?:string, color?: string, placeholderColor?:string, textColor?:string, message?:string, minLengths?:number, lengthMeg?:string}) {
    const {
        register,
        formState: { errors },
      } = useFormContext()
      const inputError = findInputError(errors, label)
  const isInvalid = isFormInvalid(inputError)
  return (
    <>
         <Box display={'flex'} flexDir={'column'} w={'100%'} gap={'2px'}>
            <Box display={'flex'} gap={''} flexDir={'column'} alignItems={'flex-start'} justifyContent={''}>
                <FormLabel fontSize={'17px'} textShadow={textShadow} color={color} fontWeight={700} htmlFor={id}>
                    {label}
                </FormLabel>
                <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError errorBackground={errorBackground}
                iconColor={iconColor}
                color={textColor}
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
        </AnimatePresence>
        <InputGroup w={'100%'}>
                        <InputLeftAddon textShadow={textShadow} bg={'transparent'} color={color}  border={'none'} display={showLeft} borderBottom={'2px solid ' + color} borderRadius={'0'}>
                            {pickIcon}
                        </InputLeftAddon>
                        
                <Input required id={id} type={type} placeholder={placeholder}
                    {...register(label, {
                        required: {
                          value: true,
                          message: message,
                        },
                        minLength: {
                            value: minLengths,
                            message: lengthMeg,
                          },
                      })}
                      value={inputValue} onChange={onChangeValue}
                       _hover={{borderBottom: "2px solid " + color}} textShadow={textShadow} title='' w={'100%'} border={'none'} outline={'transparent'} focusBorderColor='transparent' fontSize={'17px'} fontWeight={600} borderRadius={'0'}  _focus={{borderBottom: "2px solid " + color}} borderBottom={'2px solid ' + color} color={color} _placeholder={{color: placeholderColor, fontWeight: placeholderWieght}}
                />
                <InputRightAddon bg={'transparent'} textShadow={textShadow} onClick={showPassword} border={'none'} color={color} display={showRight} borderBottom={'2px solid ' + color} borderRadius={'0'}>
                            {pickIcon2} 
                        </InputRightAddon>
                </InputGroup>
            </Box>
        </Box>
    </>
  )
}

export default ReUseInput
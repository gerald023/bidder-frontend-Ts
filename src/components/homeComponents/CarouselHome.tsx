import { Box, Flex, Img, Text, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import {motion, AnimatePresence} from 'framer-motion'
import { heroSec } from '../data/heroSec';
import '../../styles/carousel.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
function CarouselHome({images:[]}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('left');

    const nextImg = () =>{
        setDirection("right");
        setCurrentIndex((prevIndex)=> prevIndex + 1 === heroSec.length? 0 : prevIndex + 1)
    }
    const prevImg = () =>{
        setDirection("left");
        setCurrentIndex((prevIndex)=> prevIndex - 1 < 0 ? heroSec.length - 1 : prevIndex - 1)
    }
    const handleDotClick = (index:number) => {
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
      };
      useEffect(()=>{
        const timers =   setInterval(()=>{
             setCurrentIndex((index) => (index + 1) % heroSec.length)
            }, 10000)
            return () => clearInterval(timers)
      },[])
  return (
    <>
         <Box className='carousel' display={'flex'} flexDir={'column'} position={'relative'} justifyContent={'center'} alignItems={'center'} h={'90vh'} w={'100%'}>
       <AnimatePresence>
      
          <Flex w={'100%'}  h={'100%'}>
            <motion.div  className='heroSec'  variants={slideVariants} initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit" key={currentIndex} >
              <Box w={'100%'} height={'100%'} bg={'rgba(0, 0, 0, 0.351)'} display={'flex'} pos={'absolute'} alignItems={'center'} >
              <Box pos={'absolute'} display={'flex'} w={'35%'} left={'10%'} flexDir={'column'} gap={'30px'}>
                <Text fontWeight={700} color={'white'} textShadow={'2px 2px 2px black'} fontSize={'65px'}>{heroSec[currentIndex].title}</Text>
                <Text fontSize={'20px'} color={'white'} textShadow={'2px 2px 2px black'} fontWeight={600}>{heroSec[currentIndex].subText}</Text>
                <Button w={'fit-content'} colorScheme='black' bg={'black'} padding={'35px 30px'} display={'flex'} gap={'12px'} alignItems={'center'} justifyContent={'center'}>Browse Category <FontAwesomeIcon icon={faSearch}/></Button>
                </Box>
              </Box>
                <Box w={'100%'} h={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Img src={heroSec[currentIndex].img} objectPosition={'bottom'} objectFit={'cover'}  w={'100%'} h={'100%'}/>
                </Box>
            </motion.div>
          </Flex>
       </AnimatePresence>

            {/* <Img w={'100%'} h={'100%'} key={currentIndex} src={images[currentIndex]}/> */}
            <Box className='slide_direction' display={'flex'} position={'absolute'} bottom={'24px'} gap={'120px'}>
            <Box className="left" w={'30px'} h={'30px'} bg={'black'} borderRadius={'50%'} display={'flex'} justifyContent={'center'} alignItems={'center'} color={'white'} onClick={prevImg}>
            <FaAngleLeft fontSize={'20px'}/>
            
        </Box>
        <Box className="right" w={'30px'} h={'30px'}  bg={'black'} borderRadius={'50%'} display={'flex'} justifyContent={'center'} alignItems={'center'} color={'white'} onClick={nextImg}>
            <FaAngleRight fontSize={'20px'}/>
        </Box>
            </Box>
            <Box className="indicator" display={'flex'} gap={'12px'} position={'absolute'} bottom={'30px'}>
        {heroSec.map((_, index) => (
          <motion.div
          className={`dot ${currentIndex === index ? "active" : ""}`}
          onClick={() => handleDotClick(index)}
          initial="initial"
          animate={currentIndex === index ? "animate" : ""}
          whileHover="hover"
          variants={dotsVariants}
          ></motion.div>
        ))}
      </Box>
        </Box>       
    </>
  )
}

export default CarouselHome
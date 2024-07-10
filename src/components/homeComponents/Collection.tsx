import { faAnkh, faCar, faPalette } from '@fortawesome/free-solid-svg-icons';
import art from '../../images/C_art.jpg';
import relic from '../../images/relics.jpg'
import car from '../../images/coolCar.jpg'
import '../../styles/collection.css'
import watch from '../../images/antic_watch.jpg'
import { MdWatch } from 'react-icons/md';
import { useState } from 'react';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Collection() {
  return (
    <>
        <Box w={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} margin={'90px 0'}>
            <Box w={'1400px'} h={'500px'}  display={'flex'} justifyContent={'center'}>
                <UnorderedList marginInline={'40px'} w={'100%'} h={'100%'} display={'flex'} gap={'10px'}>
                    <ListItem minW={'200px'}   className={'collection_item2 collection_item '} h={'100%'} borderRadius={'20px'}  pos={'relative'} bgImage={car} backgroundPosition={'center'} backgroundSize={'cover'} backgroundRepeat={''} transition={'flex-grow 0.9s ease-in-out'} bg={''} >
                        <Text className='collection_txt'>Spot the look</Text>
                        <Box className='collection_icon'>
                            <Box className='c_icon'>
                            <FontAwesomeIcon icon={faCar} color='white'/>
                            </Box>
                        </Box>
                    </ListItem>
                    <ListItem minW={'200px'}   className={ 'collection_item2 collection_item '} h={'100%'} borderRadius={'20px'}  pos={'relative'} 
                     bgImage={watch} backgroundPosition={'center'} backgroundSize={'cover'} backgroundRepeat={''} transition={'flex-grow 0.9s ease-in-out'} bg={''} >
                        <Text className='collection_txt'>Spot the look</Text>
                        <Box className='collection_icon'>
                            <Box className='c_icon'>
                            <MdWatch/>
                            </Box>
                        </Box>
                    </ListItem>
                    <ListItem minW={'200px'}   className={ 'collection_item2 collection_item '} h={'100%'} borderRadius={'20px'}  pos={'relative'} 
                     bgImage={art} backgroundPosition={'center'} backgroundSize={'cover'} backgroundRepeat={''}  transition={'flex-grow 0.9s ease-in-out'} bg={''} >
                        <Text className='collection_txt'>Beautiful Art</Text>
                        <Box className='collection_icon'>
                            <Box className='c_icon'>
                            <FontAwesomeIcon icon={faPalette} color='white'/>
                            </Box>
                        </Box>
                    </ListItem>
                    <ListItem minW={'200px'}   className={ 'collection_item2 collection_item '} h={'100%'} borderRadius={'20px'}  pos={'relative'} 
                     bgImage={relic} backgroundPosition={'center'} backgroundSize={'cover'} backgroundRepeat={''} transition={'flex-grow 0.9s ease-in-out'} bg={''} >
                        <Text className='collection_txt'>Ancient Relics</Text>
                        <Box className='collection_icon'>
                            <Box className='c_icon'>
                            <FontAwesomeIcon icon={faAnkh}/>
                            </Box>
                        </Box>
                    </ListItem>
                </UnorderedList>
            </Box>
        </Box>
    </>
  )
}

export default Collection
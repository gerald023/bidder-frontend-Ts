import { Box } from '@chakra-ui/react';
import { heroSec } from '../../components/data/heroSec';
import CarouselHome from '../../components/homeComponents/CarouselHome'
import CategorySec from '../../components/homeComponents/CategorySec';
import Testimonies from '../../components/homeComponents/Testimonies';
import NewLetter from '../../components/homeComponents/NewLetter';


function WHome() {
  return (
    <>
        <Box w={'100%'} h={''} bg={''} overflow={'hidden'}>
            <CarouselHome images={heroSec}/>
            <CategorySec/>
            <Testimonies/>
            <NewLetter/>
        </Box>
    </>
  )
}

export default WHome
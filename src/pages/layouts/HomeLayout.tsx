import { Outlet } from 'react-router'
import Header from '../../components/header/Header'
import Footer from '../../components/header/Footer'

function HomeLayout() {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default HomeLayout
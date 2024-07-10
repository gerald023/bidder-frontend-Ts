import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AuthHome from './pages/auth/AuthHome.tsx';
import HomeLayout from './pages/layouts/HomeLayout.tsx';
import WHome from './pages/home/WHome.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import ChooseAuth from './pages/auth/ChooseAuth.tsx';
import Login from './pages/auth/Login.tsx';
import AllProduct from './pages/products/AllProduct.tsx';
import ProductDetails from './pages/products/ProductDetails.tsx';
import SellerDashboard from './pages/sellerPage/SellerDashboard.tsx';
import SellerHome from './pages/sellerPage/SellerHome.tsx';
import SellersProduct from './pages/sellerPage/sellerProducts/SellersProduct.tsx';
import CreateShop from './pages/sellerPage/sellerProducts/CreateShop.tsx';
import Notification from './pages/sellerPage/sellerProducts/Notification.tsx';
import ForgetPassword from './pages/auth/ForgetPassword.tsx';
import VerifyOTP from './pages/auth/VerifyOTP.tsx';


const defautRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children: [
      {
        index: true,
        element: <WHome/>
      },
      {path:'products', element: <AllProduct/>},
      {path:'products/:id', element: <ProductDetails/>}
    ]
  },
  {
    path: "auth",
    element:<AuthHome/>,
    children:[
      {index:true, element: <ChooseAuth/>},
      {path:"signup", element: <SignUp/>},
      {path: "login", element: <Login/>,},
      {path: "get-otp", element: <ForgetPassword/>},
      {path: "verify-otp", element: <VerifyOTP/>}
    ]
  },
  {
    path: "dashboard",
    element: <SellerDashboard/>,
    children: [
      {index: true, element: <SellerHome/>},
      {path: "products", element: <SellersProduct/> },
      {path: "create-shop", element: <CreateShop/>},
      {path: "notifications", element: <Notification/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
    <RouterProvider router={defautRouter}/>
    </ChakraProvider>
  </React.StrictMode>,
)

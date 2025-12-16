import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import AddToCart from './pages/AddToCart'
import Orders from './pages/Orders'
import Order from './pages/Order'
import WishList from './pages/WishList'
import Navbar from './components/Navbar'

{/* Catogory Page */ }
import PhonePage from './pages/PhonePage'
import LaptopPage from './pages/LaptopPage'
import Tvpage from './pages/Tvpage'
import HeadPhonepage from './pages/HeadPhonepage'
import TshirtPage from './pages/TshirtPage'
import Sport from './pages/Sport'
import ShoePage from './pages/ShoePage'
import SmartWatchPage from './pages/SmartWatchPage'
import ShirtPage from './pages/ShirtPage'

import ProductCart from "./components/carts/ProductCart"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Payment from './pages/payment'
import SearchPage from './pages/searchPage.jsx'
import {NavigationMenuDemo} from "./components/Navigation.jsx"

import { Toaster } from "@/components/ui/sonner"

function App() {

  return (
    <>
      <BrowserRouter >
        <Toaster />
        <div className='relative'>
          <div className='top-0 sticky w-full z-10'>
            {/* <Navbar /> */}
            <NavigationMenuDemo/>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addtocart" element={<AddToCart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/order" element={<Order />} />
            <Route path="/wishlist" element={<WishList />} />

            {/* Auth */}

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            {/* Catogory Page */}
            <Route path="/phone" element={<PhonePage />} />
            <Route path="/laptop" element={<LaptopPage />} />
            <Route path="/tv" element={<Tvpage />} />
            <Route path="/headphone" element={<HeadPhonepage />} />
            <Route path="/tshirt" element={<TshirtPage />} />
            <Route path="/sport" element={<Sport />} />
            <Route path="/shoe" element={<ShoePage />} />
            <Route path="/smartwatch" element={<SmartWatchPage />} />
            <Route path="/shirt" element={<ShirtPage />} />

            <Route path="/search" element={<SearchPage/>} />

            <Route path=":catodory/product/:id" element={<ProductCart />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>

      </BrowserRouter>
    </>
  )
}

export default App

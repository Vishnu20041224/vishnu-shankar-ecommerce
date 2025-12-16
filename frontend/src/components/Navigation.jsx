
import * as React from "react"
import { Link } from "react-router-dom"
import { Menu, X, CircleUserRound, Search, Heart, ShoppingCart, ChevronDown, ChevronUp, ListFilter, ShoppingBasket, Home } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { filterProducts } from '../redux/slice/productSlice';
import { formatPrice } from '../redux/slice/commonfunctionSlice';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

// icone

import phoneIcone from "../assets/CategoryIcone/iphone16.png"
import laptopIcone from "../assets/CategoryIcone/laptop.png"
import sportIcone from "../assets/CategoryIcone/football.png"
import headphoneIcone from "../assets/CategoryIcone/headphone.png"
import shirtIcone from "../assets/CategoryIcone/shirt.png"
import shoeIcone from "../assets/CategoryIcone/shoe.png"
import tshirtIcone from "../assets/CategoryIcone/tshirt.png"
import tvIcone from "../assets/CategoryIcone/tv.png"
import watchIcone from "../assets/CategoryIcone/watch.png"

const components = [
  {
    title: "Phones",
    href: "/phone",
    image: phoneIcone,
    description: "Latest smartphones with powerful performance and stunning cameras."
  },
  {
    title: "Laptops",
    href: "/laptop",
    image: laptopIcone,
    description: "High-performance laptops for work, study, and entertainment."
  },
  {
    title: "TV",
    href: "/tv",
    image: tvIcone,
    description: "Smart TVs with crystal-clear display and immersive sound."
  },
  {
    title: "Headphone",
    href: "/headphone",
    image: headphoneIcone,
    description: "Wireless and wired headphones with deep bass and clarity."
  },
  {
    title: "T-Shirt",
    href: "/tshirt",
    image: tshirtIcone,
    description: "Comfortable and stylish t-shirts for everyday wear."
  },
  {
    title: "Sport",
    href: "/sport",
    image: sportIcone,
    description: "Sports gear and accessories to boost your performance."
  },
  {
    title: "Shoe",
    href: "/shoe",
    image: shoeIcone,
    description: "Durable and trendy shoes for casual and active lifestyles."
  },
  {
    title: "Smartwatch",
    href: "/smartwatch",
    image: watchIcone,
    description: "Track fitness, notifications, and health on your wrist."
  },
  {
    title: "Shirt",
    href: "/shirt",
    image: shirtIcone,
    description: "Formal and casual shirts with modern fit and comfort."
  },
]



export function NavigationMenuDemo() {
  const isMobile = useIsMobile()
  let [cookies, setCookie, removeCookie] = useCookies(["user", "token"])
  let [userName, setUserName] = useState(null);
  // mobile sidebar
  let [isSideBarOpen, setIsSideBarOpen] = useState(false);
  let [isCategoryOpen, setIsCategoryOpen] = useState(false);

  let { allproducts, filteredProducts } = useSelector((state) => state.product);
  let { addToCartProduct } = useSelector((state) => state.addToCart);


  let [searchQuery, setSearchQuery] = useState("");
  let [listOfSearchItem, setListOfSearchItem] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const searchProduct = async () => {
    if (!searchQuery) return; // prevent empty search
    let res = await dispatch(filterProducts({ search: searchQuery }));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/search");
      setSearchQuery("")
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(-1); // index of highlighted item

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (selectedIndex >= 0 && listOfSearchItem[selectedIndex]) {
        const item = listOfSearchItem[selectedIndex];
        setSearchQuery("");
        setListOfSearchItem([]);
        setSelectedIndex(-1);
        navigate(`${item.catergory}/product/${item._id}`);
      } else {
        searchProduct(); // search if no item selected
      }
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, listOfSearchItem.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
  };


  const listOfSearches = () => {
    let list = allproducts.filter((item) => item.ditails.toLowerCase().includes(searchQuery.toLowerCase()));
    setListOfSearchItem(list)

  }


  let logout = () => {
    removeCookie("user")
    removeCookie("token")
    navigate("/login")
    console.log("logout")
    setIsSideBarOpen(false)
  }

  useEffect(() => {
    if (cookies.user) {
      try {
        const parsed = cookies.user;
        setUserName(parsed.name);
      } catch (error) {
        console.error("Invalid JSON user cookie:", error);
      }
    }
  }, [cookies.user]);

  return (
    <NavigationMenu viewport={isMobile} className="w-full bg-gray-100 flex gap-1 items-center px-2 sm:px-0">
      <>
        <div className="md:hidden" onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          <Menu />
        </div>
        {isSideBarOpen && (
          <div className="absolute top-0 left-0 w-64 h-full min-h-screen bg-gray-400 shadow-lg z-50 py-4 border">
            <div className="flex justify-between items-center pb-2 px-3">
              <h2 className="text-lg font-semibold ">Menu</h2>
              <button onClick={() => setIsSideBarOpen(false)} className=" hover:text-gray-800">
                <X color="red" /></button>
            </div>
            <nav className=" bg-gray-400 flex flex-col gap-2  justify-between h-full">

              <div className="px-3 py-5 flex flex-col gap-4">

                <div className="flex gap-3" onClick={() => setIsSideBarOpen(false)}>
                  <Home />
                  <Link to={"/"}>Home</Link>
                </div>

                <div>

                  <div className="flex gap-3 " onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                    <ListFilter />
                    <div className="flex gap-2">
                      <h1>Category</h1>
                      {isCategoryOpen ? <ChevronDown /> : <ChevronUp />}
                    </div>
                  </div>
                  {/* components List */}
                  {isCategoryOpen && <div className="px-2 pt-3">
                    {components.map((component) => (
                      <div key={component.title} >
                        {isCategoryOpen && (
                          <div className="flex gap-3 mb-2 items-center" onClick={() => setIsSideBarOpen(false)}>
                            <img className="w-8 aspect-square object-contain" src={component.image} alt={component.title} />
                            <Link to={component.href}>{component.title}</Link>
                          </div>)}
                      </div>
                    ))}
                  </div>}
                </div>

                <div className="flex gap-3 " onClick={() => setIsSideBarOpen(false)}>
                  <ShoppingCart />
                  <Link to={"/addtocart"}>Add To Cart</Link>
                </div>

                <div className="flex gap-3 " onClick={() => setIsSideBarOpen(false)}>
                  <ShoppingBasket />
                  <Link to={"/orders"}>Orders</Link>
                </div>

                <div className="flex gap-3 " onClick={() => setIsSideBarOpen(false)}>
                  <Heart />
                  <Link to={"/wishlist"}>Wish Lsit</Link>
                </div>



              </div>


              <div className="flex gap-3 float-bottom mb-5 px-3 py-5 bottom border-t" >
                <div className="flex items-center gap-2 hover:bg-gray-800 hover:text-white p-2 ">
                  {/* LOGOUT */}
                  <AlertDialog >
                    <AlertDialogTrigger asChild>
                      <button
                        className="flex items-center gap-2"
                      >
                        <CircleUserRound />
                        Log Out
                      </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will be logged out from this device.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={logout}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>



            </nav>
          </div>
        )}
      </>
      <div className="flex-1">
        <NavigationMenuList className="max-w-7xl mx-auto ">

          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link className="capitalize" to={"/"}>Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger className="capitalize">category</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    image={component.image}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Search */}

          <div className='flex gap-3 justify-center relative mx-3 w-full min-w-28 sm:flex-1 sm:max-w-md'>
            <div className='flex my-2 items-center rounded-xl bg-white w-full min-w-28 sm:flex-1 sm:max-w-md black border border-gray-400'>
              <input
                onKeyUp={handleKeyDown}
                onChange={(e) => {
                  listOfSearches()
                  setSearchQuery(e.target.value)
                }}
                value={searchQuery}
                type="text"
                placeholder='Search...'
                className='outline-none w-24 f-full py-0 px-3 flex-1 text-black font-medium bg-white rounded-tl-xl rounded-bl-xl'
              />
              <button onClick={() => searchProduct()} className='bg-yellow-500 p-2 rounded-tr-xl rounded-br-xl'>
                <Search size={18} />
              </button>
            </div>
            {/* search list */}
            {searchQuery && listOfSearchItem.length > 0 && (
              <div className='absolute bg-white mt-1 top-10  max-h-60 overflow-y-auto w-full sm:max-w-md border border-gray-300 rounded-md shadow-lg z-10'>
                {listOfSearchItem.map((item, index) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      setSearchQuery("");
                      setListOfSearchItem([]);
                      setSelectedIndex(-1);
                      navigate(`${item.catergory}/product/${item._id}`);
                    }}
                    className={`px-4 py-2 cursor-pointer flex gap-1 items-center ${index === selectedIndex ? "bg-gray-200" : ""
                      }`}
                  >
                    <img className='w-8 aspect-square' src={item.mainImg} alt={item.name} />
                    <span className='line-clamp-1'>{item.ditails}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger className="capitalize">{cookies.user ? userName : "My"} Account</NavigationMenuTrigger>
            <NavigationMenuContent>

              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/wishlist" className="flex  items-center gap-2 hover:text-red-700  hover:bg-red-200">
                      <Heart />
                      Wish Lsit
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link to="/orders" className="flex items-center gap-2 hover:text-yellow-500  hover:bg-yellow-200">
                      <ShoppingBasket />
                      Orders
                    </Link>
                  </NavigationMenuLink>


                  <NavigationMenuLink asChild>
                    <div className="flex items-center gap-2 hover:bg-gray-800 hover:text-white p-2 ">
                      <CircleUserRound />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button >
                            Log Out
                          </button >
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure want to Log out?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You’ll be logged out from this device.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={logout}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                     

                    </div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}

          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger className="capitalize">
              {cookies.user ? userName : "My"} Account
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-2 p-2">

                {/* Wishlist */}
                <li>
                  <Link
                    to="/wishlist"
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-red-200 hover:text-red-700"
                  >
                    <Heart />
                    Wishlist
                  </Link>
                </li>

                {/* Orders */}
                <li>
                  <Link
                    to="/orders"
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-yellow-200 hover:text-yellow-600"
                  >
                    <ShoppingBasket />
                    Orders
                  </Link>
                </li>

                {/* Logout */}
                {/* login and signup */}
                <li>
                  {cookies.token ? <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-gray-800 hover:text-white"
                      >
                        <CircleUserRound />
                        Log Out
                      </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will be logged out from this device.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={logout}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog> :
                    <Link to={"/login"}
                      className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-gray-800 hover:text-white"
                    >
                      <CircleUserRound />
                      <h1 >Login / Sign Up</h1>
                    </Link>
                  }
                </li>

              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>


          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to={"/addtocart"} className="flex gap-1 items-end">Cart <span className="text-[12px] text-black rounded-full ">{formatPrice(addToCartProduct?.reduce((tot, pro) => tot + (pro.price * pro.qty), 0))}</span></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </div>
    </NavigationMenu>


  )
}

function ListItem({ title, children, href, image, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href} className="flex items-center gap-3">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-6 h-6 md:w-10 md:h-10 object-contain"
            />
          )}
          <div>
            <div className="text-sm font-medium leading-none">
              {title}
            </div>
            {children && (
              <p className="text-muted-foreground text-sm line-clamp-2">
                {children}
              </p>
            )}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

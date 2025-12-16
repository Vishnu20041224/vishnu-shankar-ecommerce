import { Search, Heart, ShoppingCart, ShoppingBasket } from 'lucide-react';
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts } from '../redux/slice/productSlice';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

// onClick={() => removeCookie("user")}


const Navbar = () => {

  let [cookies, setCookie, removeCookie] = useCookies(["user"])
  let [userName, setUserName] = useState(null);
  let [searchQuery, setSearchQuery] = useState("");
  let [listOfSearchItem, setListOfSearchItem] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let { allproducts, filteredProducts } = useSelector((state) => state.product);

  let logout = () => {
    removeCookie("user")
    navigate("/login")
  }



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
    <>
      <div className='bg-gray-100 text-black border-b border-gray-300 '>
        <div className='max-w-7xl py-3 mx-auto flex gap-2 justify-between items-center px-2'>

          {/* logo */}
          <Link to={"/"}>
            <div><h1>Logo</h1></div>
          </Link>

          {/* user Name */}
          <div>
            <div className='md:flex hidden'>
              {cookies.user ?

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h1>{userName}</h1>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Log Out</p>
                        </TooltipContent>
                      </Tooltip>
                    </Button>
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


                :




                <Tooltip>
                  <TooltipTrigger asChild>
                    <h1>Login</h1>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Login or Sign Up</p>
                  </TooltipContent>
                </Tooltip>}
            </div>
          </div>



          {/* search */}
          <div className='flex gap-3 justify-center relative mx-3 w-full min-w-28 sm:flex-1 sm:max-w-md'>

            <div className='flex items-center rounded-xl bg-white w-full min-w-28 sm:flex-1 sm:max-w-md black border border-gray-400'>
              <input
                onKeyUp={handleKeyDown}
                onChange={(e) => {
                  listOfSearches()
                  setSearchQuery(e.target.value)
                }}
                value={searchQuery}
                type="text"
                placeholder='Search...'
                className='outline-none w-24 py-2 px-3 flex-1 text-black font-medium bg-white rounded-tl-xl rounded-bl-xl'
              />
              <button onClick={() => searchProduct()} className='bg-yellow-500 p-2 rounded-tr-xl rounded-br-xl'>
                <Search />
              </button>
            </div>
            {/* search list */}
            {searchQuery && listOfSearchItem.length > 0 && (
              <div className='absolute bg-white mt-1 top-10 ms-10 sm:ms-0 max-h-60 overflow-y-auto w-[180%] sm:max-w-md border border-gray-300 rounded-md shadow-lg z-10'>
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

          {/* Buttons */}
          <div className='items-center lg:gap-7 md:gap-3 font-semibold sm:flex hidden'>
            <Link to={"/wishlist"} >
              <Button variant="outline" className='flex gap-2 hover:text-red-700  hover:bg-red-200 py-2 px-3'>
                Wish List
                <Heart />
              </Button>
            </Link>
            {/* <Button variant="outline"></Button> */}
            <Link to={"/addtocart"}>
              <Button variant="outline" className='flex gap-2 hover:text-blue-600  hover:bg-blue-200 py-2 px-3'>
                Add To Cart
                <ShoppingCart />
              </Button>
            </Link>

            <Link to={"/orders"}>
              <Button variant="outline" className='flex gap-2 hover:text-yellow-500  hover:bg-yellow-200 py-2 px-3'>
                Orders
                <ShoppingBasket />
              </Button>
            </Link>
          </div>

          {/* small screen */}
          <div className='flex items-center gap-2 font-semibold sm:hidden '>
            <Link to={"/wishlist"} >
              <div className='flex gap-2 '>
                <Heart />
              </div>
            </Link>

            <Link to={"/addtocart"}>
              <div className='flex gap-2'>
                <ShoppingCart />
              </div>
            </Link>

            <Link to={"/orders"}>
              <div className='flex gap-2'>
                <ShoppingBasket />
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* min Nav */}
      <div className='bg-gray-100 border-b text-md md:flex hidden justify-around items-center gap-2 text-black font-medium py-1'>
        <NavLink to={"/phone"}>
          Phone
        </NavLink>

        <NavLink to={"/laptop"}>
          Laptop
        </NavLink>

        <NavLink to={"/shirt"}>
          Shirt
        </NavLink>

        <NavLink to={"/tshirt"}>
          T-Shirt
        </NavLink>

        <NavLink to={"/headphone"}>
          Head Phones
        </NavLink>

        <NavLink to={"/smartwatch"}>
          Smart Watch
        </NavLink>

        <NavLink to={"/shoe"}>
          Shoe
        </NavLink>

        <NavLink to={"/tv"}>
          Tv
        </NavLink>

        <NavLink to={"/sport"}>
          Sport
        </NavLink>

      </div>
    </>


  )
}

export default Navbar
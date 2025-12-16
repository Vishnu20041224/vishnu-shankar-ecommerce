import React, { useState, useEffect, useRef } from "react"
import { ArrowBigRightDash, ArrowBigLeftDash } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from "react-cookie"
import SmallCart from "../components/carts/smallCart.jsx"
import { getProduct } from "../redux/slice/productSlice"
import { getAllOrders } from "../redux/slice/orderSlice"
import { getAddToCart } from "../redux/slice/addToCartSlice"
import { useMemo } from "react"
import heropage1 from "../assets/HeroImgs/1.jpg"
import heropage2 from "../assets/HeroImgs/2.jpg"
import heropage3 from "../assets/HeroImgs/3.jpg"
import heropage4 from "../assets/HeroImgs/4.jpg"
import Autoplay from "embla-carousel-autoplay"
import Footer from "../components/FooterCart.jsx"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from "react-router-dom"

const Home = () => {
  const { allproducts, phoneProducts, laptopProducts, shirtProducts, tshirtProducts, shoeProducts, headPhoneProducts, smartWatchProducts, sportProducts, tvProducts } = useSelector((state) => state.product)
  const [cookies] = useCookies(["token"])
  const dispatch = useDispatch()

  // const heropages = [heropage1, heropage2, heropage3, heropage4]
  const heropages = [
    {
      image: heropage1,
      link: "/shoe"
    },
    {
      image: heropage2,
      link: "/phone"
    },
    {
      image: heropage3,
      link: "/tshirt"
    },
    {
      image: heropage4,
      link: "/sport"
    },
  ]



  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState(null)

  function randomProduct(arr, length) {
    let randomIndexes = new Set();
    while (randomIndexes.size < length) {
      let randomNumber = Math.floor(Math.random() * arr.length);
      randomIndexes.add(randomNumber);
    }

    let randomPhones = [...randomIndexes].map(i => arr[i]);
    return randomPhones
  }

  const featuredPhones = useMemo(() => {
    if (!phoneProducts || phoneProducts.length === 0) return []
    return randomProduct(phoneProducts, 4)
  }, [phoneProducts])

  const premiumShirt = useMemo(() => {
    if (!shirtProducts || shirtProducts.length === 0) return []
    return randomProduct(shirtProducts, 4)
  }, [shirtProducts])

  const premiumLaptop = useMemo(() => {
    if (!laptopProducts || laptopProducts.length === 0) return []
    return randomProduct(laptopProducts, 4)
  }, [laptopProducts])

  const ClassicWatch = useMemo(() => {
    if (!smartWatchProducts || smartWatchProducts.length === 0) return []
    return randomProduct(smartWatchProducts, 4)
  }, [smartWatchProducts])

  const latestSoundTech = useMemo(() => {
    if (!headPhoneProducts || headPhoneProducts.length === 0) return []
    return randomProduct(headPhoneProducts, 4)
  }, [headPhoneProducts])

  const tvDeals = useMemo(() => {
    if (!tvProducts || tvProducts.length === 0) return []
    return randomProduct(tvProducts, 4)
  }, [tvProducts])

  const stepinStyle = useMemo(() => {
    if (!shoeProducts || shoeProducts.length === 0) return []
    return randomProduct(shoeProducts, 4)
  }, [shoeProducts])

  const trendingtshirt = useMemo(() => {
    if (!tshirtProducts || tshirtProducts.length === 0) return []
    return randomProduct(tshirtProducts, 4)
  }, [tshirtProducts])

  // 

  const ultraTechCollection = useMemo(() => {
    if (!phoneProducts || phoneProducts.length === 0) return []
    return randomProduct(phoneProducts, 4)
  }, [phoneProducts])

  const primeCollection = useMemo(() => {
    if (!shirtProducts || shirtProducts.length === 0) return []
    return randomProduct(shirtProducts, 4)
  }, [shirtProducts])

  const proPerformanceLaptops = useMemo(() => {
    if (!laptopProducts || laptopProducts.length === 0) return []
    return randomProduct(laptopProducts, 4)
  }, [laptopProducts])

  const timelessClassics = useMemo(() => {
    if (!smartWatchProducts || smartWatchProducts.length === 0) return []
    return randomProduct(smartWatchProducts, 4)
  }, [smartWatchProducts])



  // scroll

  const phoneScrollRef = useRef(null)

  const phonescrollRight = () => {
    if (!phoneScrollRef.current) return
    const scrollAmount = phoneScrollRef.current.clientWidth * 0.3
    phoneScrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  const phonescrollLeft = () => {
    if (!phoneScrollRef.current) return
    const scrollAmount = phoneScrollRef.current.clientWidth * 0.3
    phoneScrollRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    })
  }

    const shoeScrollRef = useRef(null)

  const shoescrollRight = () => {
    if (!shoeScrollRef.current) return
    const scrollAmount = shoeScrollRef.current.clientWidth * 0.3
    shoeScrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  const shoescrollLeft = () => {
    if (!shoeScrollRef.current) return
    const scrollAmount = shoeScrollRef.current.clientWidth * 0.3
    shoeScrollRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    })
  }



  // ✅ Autoplay ONE time only
  const autoplayRef = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  )

  useEffect(() => {
    if (!api) return

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap())
    }

    updateCurrent()            // initial
    api.on("select", updateCurrent)
    api.on("reInit", updateCurrent)

    return () => {
      api.off("select", updateCurrent)
      api.off("reInit", updateCurrent)
    }
  }, [api])

  useEffect(() => {
    dispatch(getProduct({}))
    dispatch(getAllOrders(cookies.token))
    dispatch(getAddToCart(cookies.token))

    // console.log(randomProducts)
  }, [dispatch, cookies.token])

  return (
    <div className="w-full h-fit md:h-[90vh] bg-gray-100 releative">
      <Carousel
        className="w-full h-full relative"
        opts={{ loop: true }}
        plugins={[autoplayRef.current]}
        setApi={setApi}   // ⭐ MUST
      >
        <CarouselContent className="h-full">
          {heropages.map((hero, index) => (
            <CarouselItem key={index} className="h-full">
              <Link to={hero.link} className="w-full h-full block">
                <img
                  src={hero.image}
                  alt={`hero-${index}`}
                  className="w-full h-full object-cover"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 text-sm hidden md:flex" />
        <CarouselNext className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />

        {/* Dots */}
        <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heropages.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-0.5 md:h-2 rounded-full transition-all duration-300 ${current === index
                ? "bg-gray-500 w-6"
                : "bg-white/50 w-2"
                }`}
            />
          ))}
        </div>
      </Carousel>
      <div className="grid gap-1 md:gap-3 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:absolute top-[70%] bg-transparent">

        <div className="bg-white p-1 md:p-2 lg:p-3 rounded-md">
          <Link to={`/phone`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">Featured Products </Link>
          <div className="grid grid-cols-2 gap-2">
            {featuredPhones.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-1 md:p-2 lg:p-3 rounded-md">
          <Link to={`/shirt`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">premium Shirt</Link>
          <div className="grid grid-cols-2 gap-2">
            {premiumShirt.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-1 md:p-2 lg:p-3 rounded-md">
          <Link to={`/laptop`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">premium Laptop </Link>
          <div className="grid grid-cols-2 gap-2">
            {premiumLaptop.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-1 md:p-2 lg:p-3 rounded-md">
          <Link to={`/smartwatch`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">Classic Watch </Link>
          <div className="grid grid-cols-2 gap-2">
            {ClassicWatch.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-1 md:p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-1 md:mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2 ">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-1 md:gap-3 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:mt-50 bg-transparent">

        <div className="bg-white p-1 md:p-2 lg:py-3 rounded-md border">
          <Link to={`/headphone`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">latest Sound Tech</Link>
          <div className="grid grid-cols-2 gap-2">
            {latestSoundTech.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-1 md:p-2 lg:p-3 rounded-md border">
          <Link to={`/tv`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">tv Deals</Link>
          <div className="grid grid-cols-2 gap-2">
            {tvDeals.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-1 md:p-2 lg:p-3 rounded-md border">
          <Link to={`/shoe`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">stepin Style</Link>
          <div className="grid grid-cols-2 gap-2">
            {stepinStyle.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-1 md:p-2 lg:p-3 rounded-md border">
          <Link to={`/shirt`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">trending shirt </Link>
          <div className="grid grid-cols-2 gap-2">
            {trendingtshirt.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-1 md:py-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-1 md:mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2 ">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="md:my-5 lg:my-7 relative">
        <h1 className="text-base md:text-lg lg:text-2xl mb-3 py-2 ps-2 font-semibold ">Hot Delas on phone</h1>
        <div ref={phoneScrollRef} className="flex gap-1 md:gap-2 lg:gap-3  w-full overflow-x-auto scroll-bar-hide">
          {[...phoneProducts].reverse().map((product) => (
            <div key={product._id} className="w-fit p-2 bg-white rounded-md border">
              <SmallCart product={product} />
            </div>
          ))}
        </div>
        <h1 onClick={phonescrollLeft} className=" p-1 absolute top-1/2 left-1 bg-white cursor-pointer rounded-full"><ArrowBigLeftDash /></h1>
        <h1 onClick={phonescrollRight} className=" p-1 absolute top-1/2 right-1 bg-white cursor-pointer rounded-full"><ArrowBigRightDash /></h1>
      </div>

      <div className="grid gap-1 md:gap-3 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-transparent">

        <div className="bg-white p-1 md:p-2 lg:p-3 rounded-md">
          <Link to={`/phone`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">ultraTech Collection </Link>
          <div className="grid grid-cols-2 gap-2">
            {ultraTechCollection.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-1 md:p-2 lg:p-3 rounded-md">
          <Link to={`/shirt`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">prime Collection</Link>
          <div className="grid grid-cols-2 gap-2">
            {primeCollection.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-1 md:p-2 lg:p-3 rounded-md">
          <Link to={`/laptop`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">pro Performance Laptops</Link>
          <div className="grid grid-cols-2 gap-2">
            {proPerformanceLaptops.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-1 md:p-2 lg:p-3 rounded-md">
          <Link to={`/smartwatch`} className="text-sm md:text-base lg:text-2xl font-semibold mb-2 line-clamp-1 capitalize">timeless Classics</Link> 
          <div className="grid grid-cols-2 gap-2">
            {timelessClassics.map((product) => (
              <Link to={`/${product.catergory}/product/${product._id}`} key={product._id} className="border p-1 md:p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                <img src={product.mainImg} alt={product.name} className="w-20 aspect-square object-contain mb-1 md:mb-2 mx-auto" />
                <h3 className="text-[8px] md:text-xs font-medium line-clamp-2 ">{product.ditails}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="md:my-5 lg:my-7 relative">
        <h1 className="text-base md:text-lg lg:text-2xl mb-3 py-2 ps-2 font-semibold ">Prime Footwear</h1>
        <div ref={shoeScrollRef} className="flex gap-1 md:gap-2 lg:gap-3  w-full overflow-x-auto scroll-bar-hide">
          {[...shoeProducts].reverse().map((product) => (
            <div key={product._id} className="w-fit p-2 bg-white rounded-md border">
              <SmallCart product={product} />
            </div>
          ))}
        </div>
        <h1 onClick={shoescrollLeft} className=" p-1 absolute top-1/2 left-1 bg-white cursor-pointer rounded-full"><ArrowBigLeftDash /></h1>
        <h1 onClick={shoescrollRight} className=" p-1 absolute top-1/2 right-1 bg-white cursor-pointer rounded-full"><ArrowBigRightDash /></h1>
      </div>

      <Footer/>
    </div>
  )
}

export default Home

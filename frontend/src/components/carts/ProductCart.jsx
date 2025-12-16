import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { Heart, Star, StarHalf, Loader2, Circle, Package, ShoppingCart, ArrowBigRightDash, ArrowBigLeftDash } from 'lucide-react';
import { getProduct, getOneProduct } from "../../redux/slice/productSlice";
import { likeProduct, getLikeProduct } from "../../redux/slice/wishListSlice"
import { getDeliveryDateFormatted, formatPrice } from "../../redux/slice/commonfunctionSlice"
import { orderNowHeadelClickSlice, getOrderNowProduct } from "../../redux/slice/orderSlice"
import { warningToast } from "../../redux/slice/commonfunctionSlice"
import RatingStars from "../ui/ratingStarts"
import Footer from "../FooterCart"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { addToCartHeadelClickSlice } from "../../redux/slice/addToCartSlice"
// import { loading } from "../../redux/slice/productSlice"
import { useCookies } from "react-cookie";
import SmallCart from "./smallCart";
import VerticalCart from "./VerticalCart";


const ProductCart = () => {

  let dispatch = useDispatch()
  let navigate = useNavigate()
  let [cookie] = useCookies(["token"])
  let [iswishListProduct, setIsWishListProduct] = useState(false)



  let { wishListProduct } = useSelector((state) => state.wishList)
  let { allproducts, singleProduct, loading } = useSelector((state) => state.product)
  let { orderNowProduct } = useSelector((state) => state.order)

  let params = useParams()
  let [paramsId, setParamsId] = useState(params.id)
  let [product, setProduct] = useState()


  // Image Select 
  const [activeIndex, setActiveIndex] = useState(0);
  const [embla, setEmbla] = useState(null);

  useEffect(() => {
    if (!embla) return;

    const onSelect = () => {
      setActiveIndex(embla.selectedScrollSnap());
    };

    embla.on("select", onSelect);
    onSelect();

    return () => embla.off("select", onSelect);
  }, [embla]);

  useEffect(() => {
    // whenever product changes, reset activeIndex to 0
    setActiveIndex(0);
  }, [product]);


  let [defalutProductColor, setDefalutProductColor] = useState()
  let [defalutImages, setDefalutImages] = useState([])
  let [defalutPrice, setDefalutPrice] = useState(null)
  let [defalutMrp, setDefalutMrp] = useState(null)
  let [defalutDitails, setDefalutDitails] = useState(null)
  let [defalutStorage, setDefalutStorage] = useState()
  let [defalutRam, setDefalutRam] = useState()
  let [defalutSize, setDefalutSize] = useState()
  let [defalutShoeSize, setDefalutShoeSize] = useState()
  let [defalutScreenSizes, setDefalutScreenSizes] = useState()
  let [defalutRefreshRate, setDefalutRefreshRate] = useState()
  let [defalutResolution, setDefalutResolution] = useState()

  // product.resolution

  // select
  useEffect(() => {
    if (allproducts.length <= 0) {
      dispatch(getProduct({}))
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.id, dispatch, allproducts])


  const getSingeProduct = async () => {
    let res = await dispatch(getOneProduct(params.id))
    console.log(res)
    setProduct(singleProduct)
    setParamsId(params.id)

  }

  useEffect(() => {
    setParamsId(params.id)
    setProduct(allproducts.find((pro) => pro._id === params.id))
    console.log(product)
    if (allproducts.find((pro) => pro._id === params.id)) {
      console.log("Product Found", product)
    }
    console.log("Hello")
    console.log(paramsId)


    console.log(singleProduct)
    // getSingeProduct()
    // dispatch(getOneProduct(params.id))

  }, [params.id])

  // changing function

  function selectColor(colorName) {
    console.log(colorName)
    setDefalutProductColor(colorName)

    let images = product?.collectionsImgs?.[colorName]
    setDefalutImages(images)
    console.log(images)

  }

  function selectStorage(storagePrice, storage) {
    console.log(storagePrice)

    let price = storagePrice.price
    setDefalutPrice(price)

    let mrp = storagePrice.mrp
    setDefalutMrp(mrp)

    let ditails = storagePrice.ditails
    setDefalutDitails(ditails)

    setDefalutStorage(storage)
    console.log(storagePrice)
    console.log(storagePrice?.ram || 0)
    setDefalutRam(storagePrice?.ram || 0)
  }

  function selectRam(storage, ramObj) {

    setDefalutPrice(ramObj.price)
    setDefalutMrp(ramObj.mrp)
    setDefalutDitails(ramObj.ditails)
    setDefalutStorage(Number(storage))
    setDefalutRam(ramObj.ram || 0)

  }

  function selectSize(size) {
    setDefalutSize(size)

    console.log(size)
  }

  function selectShoeSize(shoeSize) {
    setDefalutShoeSize(shoeSize)
  }

  function selectScreenSize(size, ditails) {
    console.log(size)
    console.log(ditails)

    setDefalutScreenSizes(Number(size))
    setDefalutPrice(ditails.price)
    setDefalutMrp(ditails.mrp)
    setDefalutDitails(ditails.ditails)
    setDefalutRefreshRate(ditails.refreshRate)
    setDefalutResolution(ditails.resolution)
    setDefalutImages(ditails.imgs)

  }


  // Defalut Ste
  useEffect(() => {
    console.log(product)
    window.scrollTo(0, 0);
    if (product) {

      setIsWishListProduct(wishListProduct?.some((pro) => pro.productId === product?._id))

      let color = product.mainColor
      setDefalutProductColor(color)

      let images = product.collectionsImgs ? product?.collectionsImgs?.[color] : product.imgs
      setDefalutImages(images)

      let price = product.price
      setDefalutPrice(price)

      let mrp = product.mrp
      setDefalutMrp(mrp)

      let ditails = product.ditails
      setDefalutDitails(ditails)

      console.log(product.storagesPrice)


      if (product.memoryStorageCapacity) {
        let storage = product.memoryStorageCapacity
        setDefalutStorage(storage)
      }

      // const ramValue = product?.storagesPrice?.[product.memoryStorageCapacity]?.ram || 0;

      setDefalutRam(product.ramMemorySize);

      console.log(product?.storagesPrice?.[product.memoryStorageCapacity]?.ram || 0)


      setDefalutSize(product?.size?.[0])
      console.log(product?.size?.[0])

      if (product.shoeSize.length > 1) {
        setDefalutShoeSize(product.shoeSize[0])
      }

      if (product.screenSizes) {
        setDefalutScreenSizes(product.screenSizes)
      }

      if (product.refreshRate) {
        setDefalutRefreshRate(product.refreshRate)
      }

      if (product.resolution) {
        setDefalutResolution(product.resolution)
      }

    }
  }, [product])



  // product scroll
  // scroll

  const scrollRefOne = useRef(null)

  const scrollRightOne = () => {
    if (!scrollRefOne.current) return
    const scrollAmount = scrollRefOne.current.clientWidth * 0.3
    scrollRefOne.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  const scrollLeftOne = () => {
    if (!scrollRefOne.current) return
    const scrollAmount = scrollRefOne.current.clientWidth * 0.3
    scrollRefOne.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    })
  }

  const scrollRefTwo = useRef(null)

  const scrollRightTwo = () => {
    if (!scrollRefTwo.current) return
    const scrollAmount = scrollRefTwo.current.clientWidth * 0.3
    scrollRefTwo.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  const scrollLeftTwo = () => {
    if (!scrollRefTwo.current) return
    const scrollAmount = scrollRefTwo.current.clientWidth * 0.3
    scrollRefTwo.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    })
  }

    const scrollRefSmallCart = useRef(null)

  const scrollRightSmallCart = () => {
    if (!scrollRefSmallCart.current) return
    const scrollAmount = scrollRefSmallCart.current.clientWidth * 0.3
    scrollRefSmallCart.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  const scrollLeftSmallCart = () => {
    if (!scrollRefSmallCart.current) return
    const scrollAmount = scrollRefSmallCart.current.clientWidth * 0.3
    scrollRefSmallCart.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    })
  }


  function deliveryCart(catergory) {
    return (
      // catergory === "phone" || "laptop" || "tv" ?
      <div className="delivery grid grid-cols-2 pb-1 sm:grid-cols-5 gap-4">
        <div className="delivery-item flex flex-col items-center gap-2">
          <img className="w-10" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png" alt="" />
          <p className="text-center text-xs">10 days Return & Exchange</p>
        </div>

        <div className="delivery-item flex flex-col items-center gap-2">
          <img className="w-10" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png" alt="" />
          <p className="text-center text-xs">Free Delivery</p>
        </div>

        {catergory !== "tv" ?
          <div className="delivery-item flex flex-col items-center gap-2">
            <img className="w-10" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB562506657_.png" alt="" />
            <p className="text-center text-xs">Pay on Delivery</p>
          </div> :
          <div className="delivery-item flex flex-col items-center gap-2">
            <img className="w-10" src="https://m.media-amazon.com/images/G/31/VAS/TrustWidget/Service._CB607276514_.png" alt="" />
            <p className="text-center text-xs">Brand Installation</p>
          </div>

        }

        <div className="delivery-item hidden md:flex flex-col items-center gap-2">
          <img className="w-10" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png" alt="" />
          <p className="text-center text-xs">Secure transaction</p>
        </div>

        {(catergory === "phone" || catergory === "laptop" || catergory === "tv") ? (
          <div className="delivery-item flex flex-col items-center gap-2">
            <img className="w-10" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png" alt="" />
            <p className="text-center text-xs">1 Year Warranty</p>
          </div>
        ) : (
          <div className="delivery-item flex flex-col items-center gap-2">
            <img className="w-10" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-top-brand._CB562506657_.png" alt="" />
            <p className="text-center text-xs">Top Brand</p>
          </div>
        )}
      </div>

    );

  }



  // ADD TO CART FUNCTION

  let addToCartClick = (product) => {
    if (!cookie.token) {
      return warningToast("Add To Cart Failed", "Please login or Sign Up", navigate)
    }
    console.log(product)
    let { mrp, mainColor, memoryStorageCapacity, price, ...rest } = product
    let data = {
      ...rest,
      mrp: defalutMrp,
      price: defalutPrice,
      selectColor: defalutProductColor,
      mainColor: defalutProductColor,
      selectStorage: defalutStorage,
      memoryStorageCapacity: defalutStorage,
      selectRam: defalutRam,
      selectSize: defalutSize || defalutScreenSizes || defalutShoeSize,
    }
    console.log(data)
    console.log(defalutShoeSize)

    addToCartHeadelClickSlice(data, dispatch, cookie.token)
  }

  const headleClickLikeProduct = async (product) => {
    if (!cookie.token) {
      return warningToast("Like Product Failed", "Please login or Sign Up", navigate)
    }
    let { _id, ...rest } = product
    let data = {
      ...rest,
      productId: _id,
      selectColor: product.mainColor,
      selectStorage: product.memoryStorageCapacity,
      selectRam: product.ramMemorySize,
      selectSize: product?.size?.[0] || product.screenSizes || product.shoeSize[0],
    }
    console.log(data)

    let res = await dispatch(likeProduct({ data, token: cookie.token }))
    dispatch(getLikeProduct(cookie.token))
    console.log(res)
  }

  const orderNowHeadelClick = async (product) => {
    if (!cookie.token) {
      return warningToast("Order Failed", "Please login or Sign Up", navigate)
    }
    let data = {
      ...product,
      productId: product._id,
      mrp: defalutMrp,
      price: defalutPrice,
      selectColor: defalutProductColor,
      mainColor: defalutProductColor.toLowerCase(),
      selectStorage: defalutStorage,
      memoryStorageCapacity: defalutStorage,
      selectRam: defalutRam,
      selectSize: defalutSize || defalutScreenSizes || defalutShoeSize,
      deliveryDate: getDeliveryDateFormatted(Math.floor(product.rating)),
      qty: 1
    }

    dispatch(getOrderNowProduct([data]))
    if (orderNowProduct) navigate("/payment")
    // orderNowHeadelClickSlice(data, dispatch, cookie.token)
  }



  useEffect(() => {
    setIsWishListProduct(wishListProduct?.some((pro) => pro.productId === product?._id))
  }, [wishListProduct])


  if (!product) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className='animate-spin h-8 w-8 text-gray-600' />
      </div>
    );
  }
  return (
    <>

      <div className="md:flex gap-2 lg:gap-5  justify-between max-w-6xl mx-auto py-2 lg:py-4 lg:px-5 relative">

        {/* left Side  */}
        {/* Image Section */}

        <div className="flex-1/2 mx-auto flex gap-3 items-start px-2 md:px-0 md:sticky md:top-20 md:h-fit">

          {/* selecting image */}
          <div className="md:flex hidden flex-col gap-5 pt-3 cursor-pointer ">
            {defalutImages.map((img, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                className={`w-9 md:w-12 border p-0.5 md:rounded-md cursor-pointer ${i === activeIndex ? "border-black " : "border-gray-300"
                  }`}
              >
                <img src={img} alt={img} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>

          {/* Single Imags */}
          <div className="flex justify-center items-center">
            <Carousel
              setApi={setEmbla}
              className="w-[95%] md:w-[75%]  h-[50%] md:h-full cursor-pointer"
              opts={{ startIndex: activeIndex, loop: true, align: "start", }}>
              <CarouselContent>
                {defalutImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center">
                          {/* clickable image updates activeIndex */}
                          <img
                            src={img}
                            onClick={() => embla.scrollTo(index)}
                            alt={`product-${index}`}
                            className="cursor-pointer object-contain aspect-square w-full"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* DOTS: use activeIndex to determine styling */}
              <div className="flex gap-2 justify-center items-center mt-2 ">
                {defalutImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`show image ${i + 1}`}
                    className="p-1"
                  >
                    <Circle
                      size={10}
                      className={i === activeIndex ? "text-black fill-black cursor-pointer" : "cursor-pointer text-black"}
                    />
                  </button>
                ))}
              </div>

            </Carousel>
          </div>

        </div>

        {/* Right Side */}
        {/* ditails Section */}

        <div className="flex-1/2 relative pt-3.5 md:pt-0 p-2 md:p-0">
          <h1 className="text-sm lg:text-xl font-normal pb-3 pe-2 md:pe-4">{defalutDitails}</h1>
          <h1 className="pb-3">{RatingStars(product?.rating)}</h1>

          <div className="pb-3">
            <div className="flex items-end gap-3 pb-1">
              <h1 className="text-3xl font-semibold">{formatPrice(defalutPrice)}</h1>
              <h1 className="text-xl text-red-700">({Math.round(((defalutMrp - defalutPrice) / product?.mrp) * 100)}% Off)</h1>
            </div>
            <h1 className="line-through font-normal">M.R.P{formatPrice(defalutMrp)}</h1>
          </div>

          <div className="pb-3">{deliveryCart(product.catergory)}</div>

          {/* select Color */}
          {product.collectionsImgs && <div className="pb-3">
            <h1 className="pb-1">Colour : <span className="font-semibold">{defalutProductColor}</span></h1>
            <div className="flex gap-4 ">
              {Object.entries(product.collectionsImgs).map(([color, image]) => (
                {
                  color,
                  image
                }
              )).map((setColor) => (
                <div onClick={() => selectColor(setColor.color)} className={`${defalutProductColor === setColor.color ? "border-green-500 border-2" : "border"} flex flex-col items-center border cursor-pointer hover:border-black rounded-md`}>
                  <div className="p-1 w-12 md:w-14 lg:w-18">
                    <img className="w-full aspect-square object-contain" src={setColor.image} alt={setColor.color} />
                  </div>
                  <h1 className="text-sm font-medium">{setColor.color}</h1>
                </div>
              ))

              }
            </div>
          </div>}

          {/* {product.collectionsImgs && (
            <div className="pb-3">
              <h1 className="pb-1">
                Colour : <span className="font-semibold">{defalutProductColor}</span>
              </h1>
              <div className="flex gap-4 ">
                {Object.entries(product.collectionsImgs).map(([color, images]) => (
                  <div
                    key={color}
                    onClick={() => selectColor(color)}
                    className={`${defalutProductColor === color ? "border-green-500 border-2" : "border"
                      } flex flex-col items-center border cursor-pointer hover:border-black rounded-md`}
                  >
                    <div className="p-1 w-12 md:w-14 lg:w-18">
                      <img className="w-full aspect-square object-contain" src={images[0]} alt={color} />
                    </div>
                    <h1 className="text-sm font-medium">{color}</h1>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* select Ram & storage */}

          {product.storagesPrice && <div className="pb-3">
            <h1 className="pb-1">Storages : <span className="font-semibold">{defalutStorage}</span></h1>
            <div className="flex gap-4 ">
              {Object.entries(product.storagesPrice).map(([storage, price]) => (
                {
                  storage,
                  price
                }
              )).map((setStorage, index) => (
                <div key={index} onClick={() => selectStorage(setStorage.price, setStorage.storage)} className={`${defalutStorage == setStorage.storage ? "border-green-700 border-2" : "border"} flex flex-col items-center border cursor-pointer hover:border-black hover:bg-green-200 rounded-md`}>
                  <button className={`${defalutStorage == setStorage.storage && "bg-green-300 text-green-800"} p-1.5 rounded-sm text-sm md:text-md md:font-medium md:px-3 md:py-3 md:rounded-md`}>{setStorage.storage} GB</button>
                </div>
              ))

              }
            </div>
          </div>}

          {product.catergory === "phone" && product.brand !== "Apple" && (
            <div className="pb-3">
              <h1 className="pb-1">
                Ram : <span className="font-semibold">{defalutRam} GB</span>
              </h1>
              <div className="flex gap-4">

                {Object.entries(product.storagesPrice).map(([storage, price]) => (
                  {
                    storage,
                    price,
                    ram: price.ram
                  }
                )).map((setRam, index) => (setRam.ram &&
                  <div key={index} className={`${defalutRam == setRam.ram ? "border-green-700 border-2" : "border"} flex flex-col items-center border cursor-pointer hover:border-black hover:bg-green-200 rounded-md`}>
                    <button onClick={() => selectRam(setRam.storage, setRam.price)} className={`${defalutRam == setRam.ram && "bg-green-300 text-green-800"} p-1.5 rounded-sm text-sm md:text-md md:font-medium md:px-3 md:py-3 md:rounded-md `}>{setRam.ram} GB</button>
                  </div>
                ))
                }
              </div>

            </div>
          )}

          {/* TV Screen */}

          {product.screenSizesPrice && <div className="pb-3">
            <h1 className="pb-1">Screen Size : <span>{defalutScreenSizes}</span></h1>
            {
              Object.entries(product.screenSizesPrice).map(([size, ditails]) => (
                <button key={size} onClick={() => selectScreenSize(size, ditails)} className={`${defalutScreenSizes == size && "bg-green-300 text-green-800 border-green-600"} md:p-1.5 p-1 border rounded-sm text-sm md:text-md md:font-medium md:px-3 md:py-3 md:rounded-md mx-2 hover:bg-green-200`}>{size} inches</button>
              ))
            }
          </div>}

          {/* dress  Size */}

          {product.size.length > 1 && <div className="pb-3">
            <h1 className="pb-1">Size : </h1>
            <div className=" flex gap-2">
              {product.size.map((size) => (
                <button onClick={() => selectSize(size)} className={`${defalutSize == size && "bg-green-300 text-green-800 border border-green-500"} border-2 rounded-sm hover:bg-green-200 font-normal w-8`}>{size} </button>
              ))}
            </div>
          </div>}


          {/* Shoe Size */}

          {product.shoeSize.length > 1 && <div className="pb-3">
            <h1 className="pb-1">Shoe Size : <span className="font-semibold">{defalutShoeSize}</span> </h1>
            <div className=" flex gap-2">
              {product.shoeSize.map((size) => (
                <button onClick={() => selectShoeSize(size)} className={`${defalutShoeSize == size && "bg-green-300 text-green-800 border-2 border-green-500"} w-10 border rounded-sm hover:bg-green-200 font-normal`}>{size}</button>
              ))}
            </div>
          </div>}


          <div className="flex md:gap-10 md:px-10 gap-3 px-3">
            <button onClick={() => addToCartClick(product)} className="flex-1/2 bg-blue-400 font-semibold md:text-lg text-base border border-blue-700 hover:bg-blue-200 hover:text-blue-700 cursor-pointer md:py-2.5 md:px-3.5 py-3 px-3  rounded-md text-white transition-transform flex gap-2 items-center justify-center">Add To Cart <ShoppingCart /></button>
            <button onClick={() => orderNowHeadelClick(product)} className="flex-1/2 bg-yellow-400 font-semibold md:text-lg text-base border border-yellow-700 hover:bg-yellow-200 hover:text-yellow-700 cursor-pointer md:py-2.5 md:px-3.5 py-3 px-3  rounded-md text-white flex gap-2 items-center justify-center">Buy Now <Package /></button>
          </div>
          {/* 
          <div className="flex-col md:flex-row md:gap-10 md:px-10 justify-evenly">
            <button className="bg-blue-400 font-semibold md:text-lg text-xs hover:bg-blue-200 hover:text-blue-700 cursor-pointer md:py-2.5 md:px-3.5 py-1.5 px-2.5  rounded-md text-white transition-transform">Add To Cart</button>
            <button className="bg-yellow-400 font-semibold md:text-lg text-xs hover:bg-yellow-200 hover:text-yellow-700 cursor-pointer md:py-2.5 md:px-3.5 py-1.5 px-2.5  rounded-md text-white">Buy Now</button>
          </div> */}
          {/* Product details */}

          <div className="py-2 md:py-4 text-sm md:text-base">
            <h1 className="text-base md:text-xl lg:text-2xl font-semibold pb-1">Product details</h1>

            {product.Pattern && <div className="grid grid-cols-2 pb-1 md:pb-2">
              <h1 className="font-semibold">Pattern</h1>
              <h1>{product.Pattern}</h1>
            </div>}

            {product.materialComposition && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Fit Type</h1>
              <h1>{product.materialComposition}</h1>
            </div>}

            {product.sleevetype
              && <div className="grid grid-cols-2 pb-1">
                <h1 className="font-semibold">Sleeve Type</h1>
                <h1>{product.sleevetype}</h1>
              </div>}

            {product.manufacturer && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Manufacturer</h1>
              <h1>{product.manufacturer}</h1>
            </div>}

            {/* Phone */}

            {product.brand && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Brand</h1>
              <h1>{product.brand}</h1>
            </div>}

            {product.name && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Model</h1>
              <h1>{product.name}</h1>
            </div>}

            {/* Smart Watch */}

            {product.specialFeature && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Special Feature</h1>
              <h1>{product.specialFeature}</h1>
            </div>}

            {product.resolution && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Resolution</h1>
              <h1>{defalutResolution}</h1>
            </div>}

            {product.screenSize && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Screen Size</h1>
              <h1>{product.screenSize}</h1>
            </div>}

            {product.memoryStorageCapacity && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Memory Storage Capacity</h1>
              <h1>{defalutStorage} GB</h1>
            </div>}

            {product.ramMemorySize && defalutRam !== 0 && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Ram</h1>
              <h1>{defalutRam} GB</h1>
            </div>}

            {defalutProductColor && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Color</h1>
              <h1>{defalutProductColor}</h1>
            </div>}

            {product.operatingSystem && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Operating System</h1>
              <h1>{product.operatingSystem}</h1>
            </div>}

            {/* Headphone */}

            {product.earPlacement && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Ear Placement</h1>
              <h1>{product.earPlacement}</h1>
            </div>}

            {product.formFactor && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Form Factor</h1>
              <h1>{product.formFactor}</h1>
            </div>}

            {product.style && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Style</h1>
              <h1>{product.style}</h1>
            </div>}

            {/* Shoe */}

            {product.closureType && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Closure Type</h1>
              <h1>{product.closureType}</h1>
            </div>}

            {product.gender && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Gender</h1>
              <h1>{product.gender}</h1>
            </div>}

            {product.materialType && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Material Type</h1>
              <h1>{product.materialType}</h1>
            </div>}

            {product.sole && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Sole</h1>
              <h1>{product.sole}</h1>
            </div>}

            {/* Tv */}

            {product.displayTechnology && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Display Technology</h1>
              <h1>{product.displayTechnology}</h1>
            </div>}

            {product.connectivityTechnology && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Connectivity Technology</h1>
              <h1>{product.connectivityTechnology}</h1>
            </div>}

            {product.includedComponents && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Included Components</h1>
              <h1>{product.includedComponents}</h1>
            </div>}

            {product.refreshRate && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Refresh Rate</h1>
              <h1>{defalutRefreshRate}</h1>
            </div>}

            {/* sport */}

            {product.material && <div className="grid grid-cols-2 pb-1">
              <h1 className="font-semibold">Material</h1>
              <h1>{product.material}</h1>
            </div>}



          </div>

          {/* about section */}

          {product.about.length > 1 && <div>
            <h1 className="py-2 md:py-4 font-semibold text-md md:text-2xl">About</h1>
            <ul className="pl-5">
              {product.about.map((about) => (
                <li className="pb-1 md:pb-2 list-disc text-xs md:text-base">
                  {about}
                </li>
              ))}
            </ul>
          </div>}


        </div>

        <div onClick={() => headleClickLikeProduct(product)} className="top-5 right-2 md:right-0 absolute bg-white cursor-pointer">
          {iswishListProduct ? <Heart className="fill-red-700 " />
            : <Heart className="" />}
        </div>
      </div >

      {/* relate product */}

      <div className=" w-full">
        <div className="max-w-7xl mx-auto py-4 lg:px-5 relative my-2 md:my-3 lg:my-5">

          <div ref={scrollRefSmallCart} className="flex gap-1 md:gap-2 lg:gap-3  w-full overflow-x-auto scroll-bar-hide">
            {product && allproducts.filter((pro) => pro.catergory === product.catergory).map((pro) => (
              <div className="w-fit p-2 bg-white rounded-md border">
                <SmallCart key={pro._id} product={pro} />
              </div>
            ))}
            <h1 onClick={scrollLeftSmallCart} className=" p-1 absolute top-1/2 left-0 bg-white cursor-pointer rounded-full"><ArrowBigLeftDash /></h1>
            <h1 onClick={scrollRightSmallCart} className=" p-1 absolute top-1/2 right-0 bg-white cursor-pointer rounded-full"><ArrowBigRightDash /></h1>

          </div>
        </div>

        <div className="max-w-7xl mx-auto py-4 lg:px-5 relative my-2 md:my-3 lg:my-5">
          <div ref={scrollRefOne} className="flex gap-2 md:gap-3 lg:gap-4 w-full overflow-x-auto scroll-bar-hide">
            {product && allproducts.filter((pro) => pro.brand === product.brand).map((pro) => (
              <div className=" p-2 bg-white rounded-md min-w-[180px] md:min-w-[230px] lg:min-w-[280px] min-h-[350px] md:h-[400px] lg:h-[450px] aspect-square ">
                <VerticalCart key={pro._id} product={pro} />
              </div>
            ))}
            <h1 onClick={scrollLeftOne} className=" p-1 absolute top-1/2 left-0 bg-white cursor-pointer rounded-full"><ArrowBigLeftDash /></h1>
            <h1 onClick={scrollRightOne} className=" p-1 absolute top-1/2 right-0 bg-white cursor-pointer rounded-full"><ArrowBigRightDash /></h1>

          </div>
        </div>

        <div className="max-w-7xl mx-auto py-4 lg:px-5 relative my-2 md:my-3 lg:my-5">
          <div ref={scrollRefTwo} className="flex gap-1 md:gap-2 lg:gap-3  w-full overflow-x-auto scroll-bar-hide">
            {product && allproducts.filter((pro) => pro.brand === product.brand).reverse().map((pro) => (
              <div className="w-fit p-2 bg-white rounded-md border">
                <SmallCart key={pro._id} product={pro} />
              </div>
            ))}
            <h1 onClick={scrollLeftTwo} className=" p-1 absolute top-1/2 left-0 bg-white cursor-pointer rounded-full"><ArrowBigLeftDash /></h1>
            <h1 onClick={scrollRightTwo} className=" p-1 absolute top-1/2 right-0 bg-white cursor-pointer rounded-full"><ArrowBigRightDash /></h1>

          </div>
        </div>
      </div>
      <Footer/>
    </>

  )
}

export default ProductCart
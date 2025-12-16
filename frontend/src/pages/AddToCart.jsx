import { Plus, Minus, Trash2, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from "react-router-dom"
import HorizontalCartLoader from "../components/carts/HorizontalCartLoader.jsx"

import { formatPrice, getDeliveryDateFormatted } from "../redux/slice/commonfunctionSlice"
import Footer from "../components/FooterCart.jsx"

import { deleteAddToCart, getAddToCart, increaseAddToCart, decreaseAddToCart, deleteAllAddToCart } from "../redux/slice/addToCartSlice"
import { orderAllProduct, getOrderNowProduct } from "../redux/slice/orderSlice"
const AddToCart = () => {

  let [cookies] = useCookies(["token"])
  let [products, setProducts] = useState([])

  const navigate = useNavigate()

  // let products = [
  //   {
  //     "productNo": 112345678902,
  //     "name": "iPhone 16e",
  //     "mainColor": "White",
  //     "brand": "Apple",
  //     "ditails": "iPhone 16e : Built for Apple Intelligence, A18 Chip, Supersized Battery Life, 48MP Fusion. Camera, 15.40 cm (6.1″) Super Retina XDR ",
  //     "catergory": "phone",
  //     "rating": 4.5,
  //     "operatingSystem": "IOS",
  //     "memoryStorageCapacity": 256,
  //     "storages": [
  //       128,
  //       256,
  //       512
  //     ],
  //     "storagesPrice": {
  //       "128": {
  //         "price": 51999,
  //         "mrp": 59900,
  //         "discount": 14,
  //         "ditails": "iPhone 16e 128GB: Built for Apple Intelligence, A18 Chip, Supersized Battery Life, 48MP Fusion. Camera, 15.40 cm (6.1″) Super Retina XDR "
  //       },
  //       "256": {
  //         "price": 61999,
  //         "mrp": 69900,
  //         "discount": 11,
  //         "ditails": "iPhone 16e 256GB: Built for Apple Intelligence, A18 Chip, Supersized Battery Life, 48MP Fusion. Camera, 15.40 cm (6.1″) Super Retina XDR "
  //       },
  //       "512": {
  //         "price": 78999,
  //         "mrp": 89900,
  //         "discount": 12,
  //         "ditails": "iPhone 16e 512GB: Built for Apple Intelligence, A18 Chip, Supersized Battery Life, 48MP Fusion. Camera, 15.40 cm (6.1″) Super Retina XDR Display; White"
  //       }
  //     },
  //     "ramMemorySize": 6,
  //     "screenSize": "6.1 Inches",
  //     "resolution": "4K",
  //     "about": [
  //       "BUILT FOR APPLE INTELLIGENCE — Personal, private, powerful. Write, express yourself and get things done effortlessly.",
  //       "A18 CHIP. FAST INTO THE FUTURE — A18 chip empowers Apple Intelligence, gaming and iOS updates for years to come.",
  //       "SUPERSIZED BATTERY LIFE — Text, browse and binge movies and shows with up to 26 hours of video playback — the best battery life in a 6.1″ iPhone.",
  //       "12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR recording",
  //       "CAMERAS — The 2-in-1 camera system has a 48MP Fusion camera for super-high-resolution photos and a 2x optical-quality Telephoto. Take incredible selfies with the 12MP front camera.",
  //       "DURABLE DESIGN. BRILLIANT DISPLAY — Stunning 15.40 cm (6.1″) Super Retina XDR display. Ceramic Shield front, tougher than any smartphone glass.",
  //       "DURABLE DESIGN. BRILLIANT DISPLAY — Stunning 15.40 cm (6.1″) Super Retina XDR display. Ceramic Shield front, tougher than any smartphone glass.",
  //       "ACTION BUTTON — Get quick, customisable access to your favourite apps and features, or use visual intelligence to learn about your surroundings."
  //     ],
  //     "price": 61999,
  //     "mrp": 69900,
  //     "discount": 11,
  //     "mainImg": "https://m.media-amazon.com/images/I/61SKi94cImL._SX679_.jpg",
  //     "imgs": [
  //       "https://m.media-amazon.com/images/I/61SKi94cImL._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/719aDoOnWKL._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/61B39+LlboL._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/61nY5YEi8uL._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/81ofTWx5rPL._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/61YsHfbkorL._SX679_.jpg"
  //     ],
  //     "collectionsImgs": {
  //       "White": [
  //         "https://m.media-amazon.com/images/I/61SKi94cImL._SX679_.jpg",
  //         "https://m.media-amazon.com/images/I/719aDoOnWKL._SX679_.jpg",
  //         "https://m.media-amazon.com/images/I/61B39+LlboL._SX679_.jpg",
  //         "https://m.media-amazon.com/images/I/61nY5YEi8uL._SX679_.jpg",
  //         "https://m.media-amazon.com/images/I/81ofTWx5rPL._SX679_.jpg",
  //         "https://m.media-amazon.com/images/I/61YsHfbkorL._SX679_.jpg"
  //       ],
  //       "Black": [
  //         "https://m.media-amazon.com/images/I/61FMZ9rSZUL._SX679_.jpg",
  //         "https://m.media-amazon.com/images/I/71oGxcr-c9L._SX679_.jpg",
  //         "https://m.media-amazon.com/images/I/71+WS9ij7SL._SX679_.jpg",
  //         "https://m.media-amazon.com/images/I/61nY5YEi8uL._SX679_.jpg",
  //         "https://m.media-amazon.com/images/I/81ofTWx5rPL._SX679_.jpg",
  //         "https://m.media-amazon.com/images/I/61uWn7-nj3L._SX679_.jpg"
  //       ]
  //     },
  //     "qty": 2,
  //     "selectStorage": 256,
  //     "selectColor": "Black"
  //   },
  //   {
  //     "productNo": 11234567890314,
  //     "catergory": "Shoe",
  //     "gender": "Women",
  //     "name": "Nike Shoe",
  //     "brand": "Nike",
  //     "ditails": "Nike Womens W Run Defy Running",
  //     "rating": 4.2,
  //     "price": 3599,
  //     "mrp": 3999,
  //     "discount": 10,
  //     "materialType": "Mesh",
  //     "closureType": "Lace-Up",
  //     "heelType": "Flat",
  //     "waterResistanceLevel": "Not Water Resistant",
  //     "style": "Running Shoes",
  //     "soleMaterial": "Rubber",
  //     "shoeSize": [
  //       3,
  //       4,
  //       5,
  //       6,
  //       7,
  //       7.5,
  //       8,
  //       8.5,
  //       9,
  //       9.5
  //     ],
  //     "about": [],
  //     "mainImg": "https://m.media-amazon.com/images/I/61qhKqCqNkL._SY695_.jpg",
  //     "mainColor": "White-Pink",

  //     "collectionsImgs": {
  //       "White-Pink": [
  //         "https://m.media-amazon.com/images/I/61qhKqCqNkL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71cKSfhr7GL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/616j-0p4+IL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71OZW6fx6SL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/6147SCmZPyL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/61nZmwSjApL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71iychPhKZL._SY695_.jpg"
  //       ],
  //       "Black": [
  //         "https://m.media-amazon.com/images/I/618jbidhyjL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71iNTzn1pZL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71ncwCN0iHL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/618JGi28tzL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/714RnMgZhdL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/61cb7-0MJTL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71iNTzn1pZL._SY695_.jpg"
  //       ]
  //     },
  //     "qty": 1,
  //     "selectSize": 8
  //   },
  //   {
  //     "productNo": 11234567890314,
  //     "catergory": "Shoe",
  //     "gender": "Women",
  //     "name": "Nike Shoe",
  //     "brand": "Nike",
  //     "ditails": "Nike Womens W Run Defy Running",
  //     "rating": 4.2,
  //     "price": 3599,
  //     "mrp": 3999,
  //     "discount": 10,
  //     "materialType": "Mesh",
  //     "closureType": "Lace-Up",
  //     "heelType": "Flat",
  //     "waterResistanceLevel": "Not Water Resistant",
  //     "style": "Running Shoes",
  //     "soleMaterial": "Rubber",
  //     "shoeSize": [
  //       3,
  //       4,
  //       5,
  //       6,
  //       7,
  //       7.5,
  //       8,
  //       8.5,
  //       9,
  //       9.5
  //     ],
  //     "about": [],
  //     "mainImg": "https://m.media-amazon.com/images/I/61qhKqCqNkL._SY695_.jpg",
  //     "mainColor": "White-Pink",

  //     "collectionsImgs": {
  //       "White-Pink": [
  //         "https://m.media-amazon.com/images/I/61qhKqCqNkL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71cKSfhr7GL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/616j-0p4+IL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71OZW6fx6SL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/6147SCmZPyL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/61nZmwSjApL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71iychPhKZL._SY695_.jpg"
  //       ],
  //       "Black": [
  //         "https://m.media-amazon.com/images/I/618jbidhyjL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71iNTzn1pZL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71ncwCN0iHL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/618JGi28tzL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/714RnMgZhdL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/61cb7-0MJTL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71iNTzn1pZL._SY695_.jpg"
  //       ]
  //     },
  //     "qty": 1,
  //     "selectSize": 8
  //   }, {
  //     "productNo": 11234567890314,
  //     "catergory": "Shoe",
  //     "gender": "Women",
  //     "name": "Nike Shoe",
  //     "brand": "Nike",
  //     "ditails": "Nike Womens W Run Defy Running",
  //     "rating": 4.2,
  //     "price": 3599,
  //     "mrp": 3999,
  //     "discount": 10,
  //     "materialType": "Mesh",
  //     "closureType": "Lace-Up",
  //     "heelType": "Flat",
  //     "waterResistanceLevel": "Not Water Resistant",
  //     "style": "Running Shoes",
  //     "soleMaterial": "Rubber",
  //     "shoeSize": [
  //       3,
  //       4,
  //       5,
  //       6,
  //       7,
  //       7.5,
  //       8,
  //       8.5,
  //       9,
  //       9.5
  //     ],
  //     "about": [],
  //     "mainImg": "https://m.media-amazon.com/images/I/61qhKqCqNkL._SY695_.jpg",
  //     "mainColor": "White-Pink",

  //     "collectionsImgs": {
  //       "White-Pink": [
  //         "https://m.media-amazon.com/images/I/61qhKqCqNkL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71cKSfhr7GL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/616j-0p4+IL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71OZW6fx6SL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/6147SCmZPyL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/61nZmwSjApL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71iychPhKZL._SY695_.jpg"
  //       ],
  //       "Black": [
  //         "https://m.media-amazon.com/images/I/618jbidhyjL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71iNTzn1pZL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71ncwCN0iHL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/618JGi28tzL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/714RnMgZhdL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/61cb7-0MJTL._SY695_.jpg",
  //         "https://m.media-amazon.com/images/I/71iNTzn1pZL._SY695_.jpg"
  //       ]
  //     },
  //     "qty": 1,
  //     "selectSize": 8
  //   }
  // ]

  let { error, loading, addToCartProduct } = useSelector((state) => state.addToCart)
  let { orderNowProduct } = useSelector((state) => state.order)
  let dispatch = useDispatch()

  let [totalAmt, setTotalAmt] = useState()
  let [totalQty, setTotalQty] = useState()
  let [totalPrice, setTotalPrice] = useState()

  let getAddToCartProduct = async () => {
    try {
      const res = await dispatch(getAddToCart(cookies.token)).unwrap()
      setProducts(res || [])
      console.log(addToCartProduct)
      console.log("DATA:", res)
    } catch (err) {
      console.log("ERROR:", err)
    }
  }

  let deleteAddToCartProduct = (id) => {
    let res = dispatch(deleteAddToCart({ id, token: cookies.token }))
  }

  let increaseAddToCartProduct = (id) => {
    // increaseAddToCart
    dispatch(increaseAddToCart({ id, token: cookies.token }))
  }

  let decreaseAddToCartProduct = (id) => {
    // increaseAddToCart
    dispatch(decreaseAddToCart({ id, token: cookies.token }))
  }

  useEffect(() => {

    if (addToCartProduct.length > 0 && cookies.token) {

      let totalQty = addToCartProduct?.reduce((tot, pro) => tot + pro.qty, 0)
      let totalPrice = addToCartProduct?.reduce((tot, pro) => tot + pro.price, 0)
      let totalAmt = addToCartProduct?.reduce((tot, pro) => tot + (pro.price * pro.qty), 0)

      console.log(totalAmt)
      setTotalAmt(totalAmt)
      setTotalQty(totalQty)
      setTotalPrice(totalPrice)
    }
  }, [addToCartProduct])

  useEffect(() => {
    // getAddToCartProduct()
    dispatch(getAddToCart(cookies.token))
    console.log(addToCartProduct)
  }, [dispatch, cookies.token])

  useEffect(() => {
    setProducts(addToCartProduct)

  }, [addToCartProduct])

  if (!cookies.token) {
    return (
      <>
        <div className="h-[91vh] w-full flex items-center justify-center">
          <h2 className="text-2xl font-bold">
            Please login to view your Wish List
          </h2>
        </div>
        <Footer />
      </>
    )
  }

  // ❌ API error
  if (error) {
    return (
      <>
        <div className="h-[91vh] w-full flex items-center justify-center">
          <h2 className="text-2xl font-bold text-red-600">
            {error}
          </h2>
        </div>
        <Footer />
      </>
    )
  }

  // ⏳ Loading
  if (loading) {
    return (
      <HorizontalCartLoader />
    )
  }

  // 🧺 Empty wishlist
  if (addToCartProduct.length === 0) {
    return (
      <div className="h-[91vh] w-full flex items-center justify-center">
        <h2 className="text-2xl font-bold">
          Your Wish List is empty
        </h2>
      </div>
    )
  }

  // if (products.length <= 0) {
  //   return (<div>
  //     <h1>Add Your Cart</h1>
  //   </div>)
  // }
  // addToCartProduct
  const orderAll = async () => {
    console.log(addToCartProduct)

    let data = addToCartProduct.map((pro) => ({
      ...pro,
      deliveryDate: getDeliveryDateFormatted(Math.floor(pro.rating))
    }))

    // let res = await dispatch(orderAllProduct({ data, token: cookies.token }))
    // console.log(res)

    dispatch(getOrderNowProduct(data))
    if (orderNowProduct) navigate("/payment")

    let deletePro = await dispatch(deleteAllAddToCart(cookies.token))
    console.log(deletePro)
  }



  return (
    <>


      {/* {loading && <div className='animate-spin flex justify-center items-center h-screen'>
        <Loader2 className='h-8' />
      </div>} */}

      {< div className='h-[91vh]  bg-green relative' >
        <div className='max-w-5xl mx-auto bg-white border-2 my-5 rounded-2xl overflow-y-scroll h-5/6'>

          <div className="grid grid-cols-10 justify-between items-center gap-2 py-2 font-semibold bg-gray-200 md:text-base text-sm">
            <div className='col-span-7 md:col-span-5 mx-auto'>Product</div>
            <div className='col-span-0 hidden md:flex md:col-span-1 mx-auto'>Price</div>
            <div className='col-span-0 hidden md:flex mx-auto md:col-span-3'>Qty</div>
            <div className='col-span-3 md:col-span-1 mx-auto'>Amount</div>
          </div>

          {addToCartProduct?.map((product, i) => (
            <div key={i} className='grid grid-cols-10 justify-between items-center gap-2 border-b relative'>

              <Link to={`product/${product.productId}`} className='md:p-3 p-1 flex md:gap-3 gap-1 items-center col-span-7 md:col-span-5'>

                <div className='w-20 md:w-40'>
                  <img className='w-full h-full object-contain aspect-square' src={product?.collectionsImgs ? product?.collectionsImgs[product?.selectColor][0] : product.mainImg} alt="" />
                </div>
                <div className='text-xs md:text-base'>
                  <h1 className='hidden md:flex line-clamp-1'>{product.ditails.length > 35 ? product.ditails.substring(0, 35) + "..." : product.ditails}</h1>
                  <h1 className='md:hidden line-clamp-2'>{product.ditails.length > 20 ? product.ditails.substring(0, 20) + "..." : product.ditails}</h1>
                  <h1><span className='font-semibold'>Color</span> :{product?.selectColor || product?.mainColor || "Black"}</h1>
                  {(product?.selectSize || product.selectShoeSize || product?.selectStorage || product?.memoryStorageCapacity) && <h1><span className='font-semibold'>Size</span> :{product?.selectSize || product.selectShoeSize || product?.selectStorage + " GB" || product?.memoryStorageCapacity + " GB" || ""}</h1>}
                </div>

              </Link>

              <div className='col-span-0 hidden md:flex md:col-span-1 md:mx-auto'>
                <h1>{formatPrice(product.price)}</h1>
              </div>

              <div className=' md:flex gap-10 col-span-0 md:col-span-3 hidden font-semibold md:mx-auto text-sm md:text-base'>
                <div className='flex gap-2 items-center border'>
                  <h1 className='bg-gray-200 cursor-pointer'>
                    <Minus size={20} className='hidden md:flex' onClick={() => decreaseAddToCartProduct(product._id)} />
                  </h1>

                  <h1 className='font-semibold'>
                    {product.qty}
                  </h1>

                  <h1 className='bg-gray-200 cursor-pointer'>
                    <Plus size={20} className='hidden md:flex' onClick={() => increaseAddToCartProduct(product._id)} />
                  </h1>
                </div>

              </div>



              <div className='col-span-3 md:col-span-1 font-semibold mx-auto text-sm md:text-base'>
                <div className='flex md:hidden gap-2 items-center border md:rounded-md mb-1'>
                  <Minus size={15} className='md:hidden flex' onClick={() => decreaseAddToCartProduct(product._id)} />
                  <h1 className='sm'>{product.qty}</h1>
                  <Plus size={15} className='md:hidden flex' onClick={() => increaseAddToCartProduct(product._id)} />
                </div>
                <div>
                  <h1>{formatPrice(product.price * product.qty)}</h1>
                </div>
              </div>


              <Trash2 onClick={() => deleteAddToCartProduct(product._id)} size={20} className='hidden md:flex text-red-600 md:bottom-5 md:right-5 bottom-1 right-1 absolute cursor-pointer' />
              <Trash2 onClick={() => deleteAddToCartProduct(product._id)} size={15} className='md:hidden flex text-red-600 md:bottom-5 md:right-5 bottom-1 right-1 absolute cursor-pointer' />
            </div>
          ))}
        </div>


        <div className='w-full bg-gray-400 absolute bottom-0 left-0 md:font-bold md:text-lg md:py-0'>
          <div className="max-w-5xl mx-auto grid grid-cols-10 justify-between items-center gap-2 py-2 font-semibold">
            <div className='col-span-5 md:col-span-5 mx-auto'>Total : </div>
            <div className='col-span-0 hidden md:flex md:col-span-1 mx-auto'>{ }</div>
            <div className='col-span-2 md:col-span-2 mx-auto'>{formatPrice(totalAmt)}</div>
            <div className='col-span-3 md:col-span-2 mx-auto'>
              <button onClick={orderAll} className='py-1.5 px-2 md:py-2 md:px-3 bg-yellow-400 font-semibold md:text-base text-md border-2 border-yellow-500 hover:bg-yellow-200 hover:text-yellow-700 cursor-pointer rounded-md text-white'>Order All</button>
            </div>
          </div>
        </div>


      </div >}
      <Footer />
    </>
  )
}
export default AddToCart
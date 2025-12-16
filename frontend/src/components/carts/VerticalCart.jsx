import { Heart, Star, StarHalf, Package, ShoppingCart } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { addToCartHeadelClickSlice } from "../../redux/slice/addToCartSlice"
import { getLikeProduct, likeProduct } from "../../redux/slice/wishListSlice"
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { getDeliveryDateFormatted, formatPrice } from "../../redux/slice/commonfunctionSlice"
import RatingStars from "../ui/ratingStarts"
import { useEffect } from 'react';
import { getOrderNowProduct } from "../../redux/slice/orderSlice"
import { warningToast } from "../../redux/slice/commonfunctionSlice"
const VerticalCart = ({ product }) => {

  const dispatch = useDispatch()
  let [cookie] = useCookies(["token"])
  const params = useParams()
  let { wishListProduct } = useSelector((state) => state.wishList)
  let { orderNowProduct } = useSelector((state) => state.order)

  const navigate = useNavigate()

  // ADD TO CART FUNCTION 

  let addToCartHeadelClick = (product) => {
    if (!cookie.token) {
      return warningToast("Add To Cart Failed", "Please login or Sign Up",navigate)
    }
    let data = {
      ...product,
      selectColor: product.mainColor,
      selectStorage: product.memoryStorageCapacity,
      selectRam: product.ramMemorySize,
      selectSize: product?.size?.[0] || product.screenSizes || product.shoeSize[0],
      selectShoeSize: product.shoeSize[0],

    }
    console.log(data)
    addToCartHeadelClickSlice(data, dispatch, cookie.token)
  }

  const headleClickLikeProduct = async (product) => {
    if(!cookie.token){
      return warningToast("Like Product Failed", "Please login or Sign Up",navigate)
    } 
    let { _id, productId, ...rest } = product
    let data = {
      ...rest,
      productId: productId || _id,
      selectColor: product.mainColor,
      selectStorage: product.memoryStorageCapacity,
      selectRam: product.ramMemorySize,
      selectSize: product?.size?.[0] || product.screenSizes || product.shoeSize[0],
    }
    console.log(data)

    let res = await dispatch(likeProduct({ data, token: cookie.token }))
    console.log(res)
    let get = await dispatch(getLikeProduct(cookie.token))
    console.log(get)
  }

  const orderNowHeadelClick = async (product) => {
    if(!cookie.token){
      return warningToast("Order Failed", "Please login or Sign Up",navigate)
    }
    console.log(product)
    let data = {
      ...product,
      productId: product.productId || product._id,
      selectColor: product.mainColor,
      selectStorage: product.memoryStorageCapacity,
      selectRam: product.ramMemorySize,
      selectSize: product?.size?.[0] || product.screenSizes || product.shoeSize[0],
      selectShoeSize: product.shoeSize[0],
      deliveryDate: getDeliveryDateFormatted(Math.floor(product.rating)),
      qty: 1,
    }
    console.log(data)
    // orderNowHeadelClickSlice(data, dispatch, cookie.token)

    dispatch(getOrderNowProduct([data]))
    if (orderNowProduct) navigate("/payment")
  }

  let iswishListProduct = wishListProduct.some((pro) => pro.productId === product.productId || pro.productId === product._id)

  useEffect(() => {
    iswishListProduct = wishListProduct.some((pro) => pro.productId === product.productId || pro.productId === product._id)
    console.log(iswishListProduct)

  }, [iswishListProduct])
  return (
    <>
      <div className='h-auto min-w-32 relative py-2 my-2 border rounded-lg'>
        <Link to={`product/${product.productId || product._id}`} className='flex flex-col justify-between md:gap-3 gap-1'>
          <div className='p-1 sm:p-2 lg:p-3 w-full sm:w-[90%] md:w-[80%]  mx-auto flex justify-center items-center h-[150px] overflow-y-hidden'>
            <img className='h-full w-full object-contain' src={product.mainImg} alt={product.name} />
          </div>
        </Link>

        <div className='p-1 sm:p-2 lg:p-3'>
          <Link to={`product/${product.productId || product._id}`} className='flex flex-col justify-between md:gap-3 gap-1'>
            <h1 className='text-sm lg:text-[18px] font-medium line-clamp-1'>{product.ditails}</h1>

            {/* rating */}

            <div>{RatingStars(product.rating)}</div>

            {/* rate */}
            <div className='flex flex-wrap gap-2 items-end'>
              <h1 className='text-lg md:text-xl font-medium'>{formatPrice(product.price)}</h1>
              <h1 className='text-gray-600 md:text-sm text-xs'>M.R.P<span className='line-through px-1'>{formatPrice(product.mrp)}</span></h1>
              <h1 className='text-red-600 md:text-sm text-xs'>{Math.round(((product.mrp - product.price) / product.mrp) * 100)} % Off</h1>
            </div>

            {/* FREE delivery  */}

            <div>
              <h1 className='text-sm md:text-[16px] pb-2'>FREE delivery {getDeliveryDateFormatted(Math.floor(product.rating))}</h1>
            </div>
          </Link>

          {/* addtocart */}

          <div className='flex justify-between gap-1 items-center'>
            <button onClick={() => addToCartHeadelClick(product)} className="bg-blue-400 font-semibold md:text-sm text-[10px] hover:bg-blue-200 hover:text-blue-700 cursor-pointer md:py-2 md:px-3 py-1 px-2  rounded-md text-white flex justify-center items-center gap-1">Add To Cart <ShoppingCart size={15} /></button>
            <button onClick={() => orderNowHeadelClick(product)} className="bg-amber-400 font-semibold md:text-sm text-[10px] hover:bg-yellow-200 hover:text-yellow-700 cursor-pointer md:py-2 md:px-3 py-1 px-2  rounded-md text-white flex justify-center items-center gap-1">Order Now <Package size={15} /> </button>
          </div>
        </div>

        {iswishListProduct ?
          <Heart onClick={() => headleClickLikeProduct(product)} className='md:top-4 md:right-4 top-1 right-1 absolute bg-white fill-red-700 cursor-pointer' />
          : <Heart onClick={() => headleClickLikeProduct(product)} className='md:top-4 md:right-4 top-1 right-1 absolute bg-white cursor-pointer' />
        }

      </div >
    </>
  )
}

export default VerticalCart
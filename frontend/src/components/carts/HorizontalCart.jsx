import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Search, Heart, ShoppingCart, ShoppingBasket, Star, StarHalf, StarOff, PackageOpen, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { createAddToCart, addToCartHeadelClickSlice } from "../../redux/slice/addToCartSlice"
import { getLikeProduct, likeProduct } from "../../redux/slice/wishListSlice"


import { useCookies } from "react-cookie"
import { getDeliveryDateFormatted, formatPrice } from "../../redux/slice/commonfunctionSlice"
import { orderNowHeadelClickSlice, orderProduct, getOrderNowProduct } from "../../redux/slice/orderSlice"
import RatingStars from "../ui/ratingStarts"
import { warningToast } from "../../redux/slice/commonfunctionSlice"

const HorizontalCart = ({ product }) => {

    let { addToCartProduct, loading } = useSelector((state) => state.addToCart)
    let addtoCartError = useSelector((state) => state.addToCart.error)
    let { wishListProduct } = useSelector((state) => state.wishList)
    let wishListError = useSelector((state) => state.wishList.error)
    let { orderNowProduct } = useSelector((state) => state.order)
    let orderNowError = useSelector((state) => state.order.error)

    let [iswishListProduct, setIsWishListProduct] = useState(false)


    let [cookie, setCookie] = useCookies(["token"])
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // function getDeliveryDateFormatted(deliveryDay) {
    //     const date = new Date();
    //     let delivery = deliveryDay || 4
    //     date.setDate(date.getDate() + delivery);

    //     const options = {
    //         weekday: "short",   // Mon, Tue, Wed...
    //         day: "2-digit",     // 01, 02, 03...
    //         month: "short"      // Jan, Feb, Mar...
    //     };

    //     return date.toLocaleDateString("en-US", options);
    // }

    // function RatingStars(rating) {
    //     // Convert rating to number safely
    //     const num = Number(rating);

    //     // If invalid → give 0 rating
    //     const safeRating = Math.min(Math.max(isNaN(num) ? 0 : num, 0), 5);

    //     const full = Math.floor(safeRating);
    //     const half = safeRating - full >= 0.5 ? 1 : 0;
    //     const empty = Math.max(5 - full - half, 0); // ensure NON-negative

    //     return (
    //         <div className="flex items-center gap-1 w-38">
    //             {/* FULL stars */}
    //             {[...Array(full)].map((_, i) => (
    //                 <Star size={15} key={`full-${i}`} className="text-green-700 fill-green-700" />
    //             ))}

    //             {/* HALF star */}
    //             {half === 1 && (
    //                 <StarHalf size={15} className="text-green-700 fill-green-700" />
    //             )}

    //             {/* EMPTY stars */}
    //             {[...Array(empty)].map((_, i) => (
    //                 <Star size={15} key={`empty-${i}`} className="text-green-700" />
    //             ))}

    //             {/* Rating number */}
    //             <span className="text-green-700 ml-2 text-sm font-bold">
    //                 {safeRating.toFixed(1)}
    //             </span>
    //         </div>
    //     );
    // }

    // function formatPrice(price) {
    //     const num = Number(price);

    //     // If price is invalid, return ₹0.00
    //     const safePrice = isNaN(num) ? 0 : num;

    //     return safePrice.toLocaleString("en-IN", {
    //         style: "currency",
    //         currency: "INR",
    //         minimumFractionDigits: 0,   // 👉 No decimals
    //         maximumFractionDigits: 2    // 👉 Keep decimals if available
    //     });
    // }

    const addToCartHeadelClick = (product) => {
        if (!cookie.token) {
            warningToast("Add To Cart Failed", "Please login or Sign Up", navigate)
            return
        }
        let data = {
            ...product,
            selectColor: product?.mainColor,
            selectStorage: product?.memoryStorageCapacity,
            selectRam: product?.ramMemorySize,
            selectSize: product?.size?.[0] || product?.screenSizes || product?.shoeSize[0],
            selectShoeSize: product?.shoeSize[0],

        }
        console.log(data)
        addToCartHeadelClickSlice(data, dispatch, cookie.token)
        console.log(addtoCartError)
    }

    const headleClickLikeProduct = async (product) => {
        if (!cookie.token) {
            warningToast("Like Product Failed", "Please login or Sign Up", navigate)
            return
        }
        let { _id, ...rest } = product
        let data = {
            ...rest,
            productId: _id,
            selectColor: product?.mainColor,
            selectStorage: product?.memoryStorageCapacity,
            selectRam: product?.ramMemorySize,
            selectSize: product?.size?.[0] || product?.screenSizes || product?.shoeSize[0],
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
        let delivery = getDeliveryDateFormatted(Math.floor(product?.rating))
        console.log(product)
        let data = {
            ...product,
            productId: product?._id,
            selectColor: product?.mainColor,
            selectStorage: product?.memoryStorageCapacity,
            selectRam: product?.ramMemorySize,
            selectSize: product?.size?.[0] || product?.screenSizes || product?.shoeSize[0],
            selectShoeSize: product?.shoeSize[0],
            qty: 1,
            deliveryDate: delivery
        }
        // console.log(delivery)
        // orderNowHeadelClickSlice(data, dispatch, cookie.token)

        dispatch(getOrderNowProduct([data]))
        if (orderNowProduct) navigate("/payment")


        // if (orderNowProduct) navigate("payment")
        // else console.log("no orderNowProduct")


        // const res = await dispatch(orderProduct({ data, token: cookie.token }));

        // if (res.meta.requestStatus === "fulfilled") {
        //     // Navigate to payment only after backend confirms order
        //     navigate("/payment");
        // } else {
        //     // Show warning toast if order fails
        //     warningToast("Order Failed", res.payload?.message || "Try again", navigate);
        // }

    }



    useEffect(() => {
        setIsWishListProduct(wishListProduct?.some((pro) => pro.productId === product?._id))
    }, [wishListProduct]);

    return (
        <>
            <div className='grid grid-cols-8 gap-2 md:my-3 my-1 border-4 border-gray-100 max-w-[1100px] mx-auto rounded-2xl items-center md:p-3 py-2 px-1 relative'>
                <div className='col-span-2 md:col-span-2 w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden'>
                    <img
                        className='w-full h-full object-contain'
                        src={product?.mainImg}
                        alt={product?.name}
                    />
                </div>
                <div className='col-span-6 md:col-span-6 '>
                    {/* ditails */}
                    <Link to={`product/${product?._id}`} className='flex flex-col justify-between md:gap-3 gap-1'>
                        <h1 className='text-sm lg:text-xl font-semibold line-clamp-2'>{product?.ditails}</h1>

                        {/* rating */}

                        <div>{RatingStars(product?.rating)}</div>

                        {/* rate */}
                        <div className='flex gap-2 items-end'>
                            <h1 className='text-lg md:text-2xl font-semibold'>{formatPrice(product?.price)}</h1>
                            <h1 className='text-gray-600 md:text-sm text-xs'>M.R.P<span className='line-through px-1'>{formatPrice(product?.mrp)}</span></h1>
                            <h1 className='text-red-600 md:text-sm text-xs'>{Math.round(((product?.mrp - product?.price) / product?.mrp) * 100)} % Off</h1>
                        </div>

                        {/* FREE delivery  */}

                        <div>
                            <h1 className='text-sm md:text-lg'>FREE delivery {getDeliveryDateFormatted(Math.floor(product?.rating))}</h1>
                        </div>
                    </Link>

                    {/* addtocart */}

                    <div className='flex gap-3 mt-3'>
                        <button onClick={() => addToCartHeadelClick(product)} className="bg-blue-400 font-semibold md:text-sm text-xs border-blue-700 hover:bg-blue-200 hover:text-blue-800 cursor-pointer md:py-2.5 md:px-3.5 py-1.5 px-2.5  rounded-md text-white transition-transform flex gap-2 items-center">Add To Cart <ShoppingCart size={18} /></button>
                        <button onClick={() => orderNowHeadelClick(product)} className="bg-amber-400 font-semibold md:text-sm text-xs hover:bg-yellow-200 hover:text-yellow-800 cursor-pointer md:py-2.5 md:px-3.5 py-1.5 px-2.5  rounded-md text-white flex gap-2 items-center">Order Now <Package size={18} /></button>

                    </div>
                </div>

                {iswishListProduct ?
                    <Heart onClick={() => headleClickLikeProduct(product)} className='md:top-4 md:right-4 top-1 right-1 absolute bg-white fill-red-700 cursor-pointer' />
                    : <Heart onClick={() => headleClickLikeProduct(product)} className='md:top-4 md:right-4 top-1 right-1 absolute bg-white cursor-pointer' />
                }
            </div>

        </>
    )
}

export default HorizontalCart
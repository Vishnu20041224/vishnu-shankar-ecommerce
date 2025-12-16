import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../ui/ratingStarts"
import { getDeliveryDateFormatted, formatPrice } from "../../redux/slice/commonfunctionSlice"


const smallCart = ({ product }) => {
    return (
        <>
            <Link to={`/${product.catergory}/product/${product._id}`}>
                <div className=' w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 flex justify-center items-center mb-2'>
                    <img className='w-full object-contain aspect-square' src={product.mainImg} alt={product.name} />
                </div>
                <h1 className='text-sm md:text-base lg:text-lg font-semibold'>{product.brand}</h1>
                <h1 className='text-xs md:text-sm lg:text-base line-clamp-1'>{product.ditails}</h1>
                <div>{RatingStars(product.rating)}</div>
                <h1 className='text-sm md:text-xl font-medium'>{formatPrice(product.price)}</h1>
                <div className='flex gap-2 items-end'>
                    <h1 className='text-gray-600 md:text-sm text-[9px]'>M.R.P<span className='line-through px-1'>{formatPrice(product.mrp)}</span></h1>
                    <h1 className='text-red-600 md:text-sm text-[9px]'>{Math.round(((product.mrp - product.price) / product.mrp) * 100)} % Off</h1>
                </div>

                {/* FREE delivery  */}

                <div>
                    <h1 className='text-[10px] md:text-[16px] pb-2 line-clamp-1'>FREE delivery {getDeliveryDateFormatted(Math.floor(product.rating))}</h1>
                </div>
            </Link>
        </>
    )
}

export default smallCart
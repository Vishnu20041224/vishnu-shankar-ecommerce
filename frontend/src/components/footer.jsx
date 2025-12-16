import bestPrice from "../assets/FooterIcone/best-price.png"
import cashBack from "../assets/FooterIcone/refund2.png"
import van from "../assets/FooterIcone/free-shipping.png"
import { MapPin, Headset, Mail } from 'lucide-react';

const footer = () => {
    return (
        <>
            <div className='bg-gray-600 text-white'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 border-b-2  border-white'>
                        <div className='flex gap-2 md:gap-3 lg:gap-4 p-2 md:p-4 lg:p-6  items-center '>
                            <div className="w-16">
                                <img className="w-full object-contain aspect-square text-white" src={bestPrice} alt="bestPrice" />
                            </div>
                            <div>
                                <h1 className="font-semibold uppercase">Best Prices & Deals</h1>
                                <h1 className="">Don’t miss our daily amazing deals and prices</h1>
                            </div>
                        </div>
                        <div className='flex gap-2 md:gap-3 lg:gap-4 p-2 md:p-4 lg:p-6  items-center'>
                            <div className="w-16">
                                <img className="w-full object-contain aspect-square text-white" src={cashBack} alt="bestPrice" />
                            </div>
                            <div>
                                <h1 className="font-semibold uppercase">Refundable</h1>
                                <h1 className="">If your items have damage we agree to refund it</h1>
                            </div>
                        </div>

                        <div className='flex gap-2 md:gap-3 lg:gap-4 p-2 md:p-4 lg:p-6  items-center'>
                            <div className="w-16">
                                <img className="w-full object-contain aspect-square text-white" src={van} alt="bestPrice" />
                            </div>
                            <div>
                                <h1 className="font-semibold uppercase">Free delivery</h1>
                                <h1 className="">Do purchase over 500 and get free delivery anywhere</h1>
                            </div>
                        </div>
                    </div>

                    <div className='text-center p-4 md:p-6 lg:p-8 gap-2 md:gap-3 lg:gap-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>

                        <div className="py-3 col-span-2 md:col-span-1">
                            <h1 className="text-2xl font-semibold mb-2 md:mb-4">E Commerce</h1>
                            <h1 className="grid grid-cols-2 gap-4 items-center mb-2 md:mb-4">
                                <span className="flex gap-2 text-white font-semibold"><MapPin /> Address</span>
                                <span className="text-gray-400">Chrompet Channai</span>
                            </h1>
                            <h1 className="grid grid-cols-2 gap-4 items-center mb-2 md:mb-4">
                                <span className="flex gap-2 text-white font-semibold">
                                    <Headset />
                                    Call us
                                </span>
                                <span className="text-gray-400">+91 9176017127</span>
                            </h1>
                            <h1 className="grid grid-cols-2 gap-4 items-center mb-2 md:mb-4">
                                <span className="flex gap-2 text-white font-semibold">
                                    <Mail />
                                    Email
                                </span>
                                <span className="text-gray-400">rhvishnushankar@gmail.com</span>
                            </h1>

                        </div>

                        <div className="py-3 col-span-1">
                            <h1 className="text-2xl font-semibold md:mb-4">Features</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">Add To Cart</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">Add To Cart</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">Add To Cart</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">Add To Cart</h1>
                        </div>

                         <div className="py-3 col-span-1">
                            <h1 className="text-2xl font-semibold md:mb-4">Category</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">Home Page</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">Phone Products</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">Shirt Products</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">tv Products</h1>
                        </div>

                        <div className="py-3 col-span-1">
                            <h1 className="text-2xl font-semibold md:mb-4">Help Center</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">Conact</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">Payments</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">Refund</h1>
                            <h1 className="text-base text-gray-400 mb-2 md:mb-4">Shipping</h1>
                        </div>



                    </div>

                </div>
            </div>
        </>
    )
}

export default footer
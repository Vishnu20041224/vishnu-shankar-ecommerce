import { House, CircleUserRound, PackageOpen, Ship, Truck, PackageCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { formatPrice } from "../redux/slice/commonfunctionSlice"

const Order = () => {

    const [progress, setProgress] = useState(0);

    let { order } = useSelector((state) => state.order)

    function getDeliveryProgress(createdAt, deliveryDateString) {

        const created = new Date(createdAt);

        // Convert "Sun, Dec 14" → real Date (same year as createdAt)
        const parts = deliveryDateString.split(" ");
        const month = parts[1]; // "Dec"
        const day = parts[2];   // "14"

        const delivery = new Date(`${created.getFullYear()} ${month} ${day}`);

        // const now = new Date("2025-12-13");
        const now = new Date();

        const total = delivery - created;
        const passed = now - created;

        let percent = (passed / total) * 100;

        if (percent < 0) percent = 0;
        if (percent > 100) percent = 100;
        // console.log(created)
        // console.log(delivery)
        // console.log(now)
        // console.log(total)
        // console.log(passed)
        return Number(percent.toFixed(2));
    }

    function orderDate(dateString) {
        const date = new Date(dateString);

        const options = {
            weekday: "short",
            day: "2-digit",
            month: "short",
            // year: "2-digit",
        };
        return date.toLocaleDateString("en-US", options).replace(",", "");

    }

    function ortherDate(createdAt, addDate) {

        const created = new Date(createdAt);
        const delivery = new Date(created.getTime() + addDate * 24 * 60 * 60 * 1000);

        // day names
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // month names
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const dayName = days[delivery.getDay()];
        const date = delivery.getDate();
        const month = months[delivery.getMonth()];
        const year = String(delivery.getFullYear()).slice(2); // '25
        return `${dayName}, ${date} ${month}`;

    }
    // ortherDate(createdAt, addDate)
    console.log(ortherDate(order.createdAt, 2))
    console.log(getDeliveryProgress(order.createdAt, order.deliveryDate))

    useEffect(() => {
        // animate after mount
        const percent = getDeliveryProgress(order.createdAt, order.deliveryDate);
        const timeout = setTimeout(() => setProgress(percent), 200); // small delay
        return () => clearTimeout(timeout);
    }, [order]);
    return (
        <>
            <div className='w-full bg-gray-100'>
                <div className="py-3 px-2 md:px-3 lg:px-5 md:py-7 grid grid-cols-12 md:gap-5 max-w-5xl mx-auto">
                    <div className='col-span-12 md:col-span-8 bg-white px-3 py-2 mb-3'>
                        <Link to={`/${(order.catergory).toLowerCase()}/product/${order.productId}`} className='border-b flex justify-between gap-2 items-center'>
                            <div className=' py-1 pb-3 px-3'>
                                <h1 className='mb-0.5 line-clamp-1'>{order?.ditails}</h1>
                                <h1 className='pb-1'>Seller : <span>{order?.brand}</span></h1>
                                <h1 className='font-bold'><span>{formatPrice((order?.price * order?.qty) + 5)} </span></h1>
                            </div>
                            <div>
                                <div className='w-26'>
                                    <img className='f-ull w-full object-contain aspect-square' src={order.collectionsImgs && order?.selectColor ? order?.collectionsImgs[order?.selectColor][0] : order?.mainImg} alt="" />
                                </div>
                            </div>
                        </Link>
                        <div className='flex gap-2 px-3 py-5 md:p-5'>
                            <div className='h-[250px] md:h-[280px] w-1 bg-gray-300 rounded-5xl'>
                                <div
                                    className={`w-full bg-green-600 rounded-5xl transition-transform duration-2000 origin-top`}
                                    style={{
                                        transform: `scaleY(${progress / 100})`,
                                        height: '100%'
                                    }}
                                ></div>
                            </div>
                            <div className='flex flex-col justify-between'>
                                <h1 className={`${getDeliveryProgress(order.createdAt, order.deliveryDate) > -1 && "text-green-600 font-semibold"} flex gap-2 items-center`}><PackageOpen size={20} /> Order Confirmed {orderDate(order.createdAt)}</h1>
                                <h1 className={`${getDeliveryProgress(order.createdAt, order.deliveryDate) > 33.3 && "text-green-600 font-semibold"} flex gap-2 items-center`}><Ship size={20} /> Shipping {ortherDate(order.createdAt, 2)}</h1>
                                <h1 className={`${getDeliveryProgress(order.createdAt, order.deliveryDate) > 66.6 && "text-green-600 font-semibold"} flex gap-2 items-center`}><Truck size={20} /> Out for delivery {ortherDate(order.createdAt, 3)}</h1>
                                <h1 className={`${getDeliveryProgress(order.createdAt, order.deliveryDate) >= 100 && "text-green-600 font-semibold"} flex gap-2 items-center`}><PackageCheck size={20} /> Delivered {order.deliveryDate}</h1>
                            </div>
                        </div>
                    </div>

                    {/* Delivery details */}
                    <div className='col-span-12 md:col-span-4'>
                        <div className='bg-white mb-3 p-3'>
                            <h1 className='mb-3 font-semibold text-lg'>Delivery details</h1>
                            <div className='bg-gray-100 p-4 rounded-xl text-sm'>
                                <h1 className='flex gap-2 mb-3 py-2'>
                                    <span className='flex gap-2 pe-2 items-center'><House size={20} /> Home</span>
                                    <span className='line-clamp-1 text-gray-500'>{order.address || "Nagappa Nager Chrompet"}</span>
                                </h1>
                                <h1 className='flex gap-2 py-2 text-sm'>
                                    <span className='flex gap-2 pe-2 items-center '><CircleUserRound size={20} /> <span className='line-clamp-1'>{order.userName || "Vishnu"}</span></span>
                                    <span className='line-clamp-1 text-gray-500'>{order.phoneNo || "9176017127"},{order?.alternatePhoneNo}</span>
                                </h1>
                            </div>
                        </div>

                        <div className='bg-white p-3'>
                            <h1 className='mb-3 font-semibold text-lg'>Price details</h1>
                            <div className='bg-gray-100 border p-3 text-gray-900 text-base rounded-xl'>
                                <div className='flex justify-between pb-1'>
                                    <h1>Listing price</h1>
                                    <h1 className='font-medium line-through'>{formatPrice(order?.mrp * order?.qty)}</h1>
                                </div>

                                <div className='flex justify-between pb-1'>
                                    <h1>Special price</h1>
                                    <h1 className='font-medium'>{formatPrice(order?.price * order?.qty)}</h1>
                                </div>

                                <div className='flex justify-between pb-1'>
                                    <h1>Quantity</h1>
                                    <h1 className='font-medium'>{order.qty}</h1>
                                </div>

                                <div className='flex justify-between pb-1'>
                                    <h1>Total fees</h1>
                                    <h1 className='font-medium'>₹ 5</h1>
                                </div>

                                <div className='flex justify-between pb-3'>
                                    <h1>Total discount</h1>
                                    <h1 className='font-medium'>₹ {formatPrice((order.mrp * order.qty) - (order.price * order.qty))}</h1>
                                </div>
                                <p className='text-[11px] text-black pb-2'>Discounts are applied on selling price + fees</p>

                                <div class="w-full my-2 border-b border-dashed border-gray-600"></div>

                                <div className='flex justify-between font-bold pb-2'>
                                    <h1>Total amount</h1>
                                    <h1>{formatPrice((order?.price * order?.qty) + 5)}</h1>
                                </div>

                                <div className='flex justify-between p-2 border rounded-md'>
                                    <h1>Payment method</h1>
                                    <h1>{order.paymentMethod}</h1>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Order
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import { Plus, Minus, Package, PackageOpen, CreditCard, MapPinCheckInside, Check, House } from 'lucide-react';
import upiIcone from "../assets/icone/upi.svg"
import emiIcone from "../assets/icone/emi.png"
import cashIcone from "../assets/icone/cash.png"
// import upiIcone from "../assets/icone/upi-payment.png"
import cardIcone from "../assets/icone/card.png"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import { CalendarIcon } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { formatPrice, getDeliveryDateFormatted } from "../redux/slice/commonfunctionSlice"
import { getOrderNowProduct, orderNowHeadelClickSlice, orderAllProduct } from "../redux/slice/orderSlice"
import { newUserAddress, getAddress } from "../redux/slice/userAddressSlice"
import { useSelector, useDispatch } from "react-redux"
const payment = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let { orderNowProduct } = useSelector((state) => state.order)
    let { alluserAddress, error } = useSelector((state) => state.userAddress)

    let [cookies] = useCookies(["token"])
    console.log(alluserAddress)


    let [selectedAddress, setSelectedAddress] = useState(0)
    let [isAddressComplete, setIsAddressComplete] = useState(false)
    let [isnewUserAddress, setIsNewAddress] = useState(false)
    let [orderSummary, setOrderSummary] = useState(false)
    let [isPayment, setIsPayment] = useState(false)

    let [selectPayment, setSeletePayment] = useState("cod")

    let [formData, setFormDate] = useState({
        name: "",
        phoneNo: "",
        pincode: "",
        city: "",
        address: "",
        alternatePhoneNo: ""
    })

    let [state, setState] = useState("")

    const indianStates = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ];

    const openBoxDeliveryList = [
        "The Open Box Delivery is a service offered by the delivery partner of Flipkart Internet Private Limited wherein the product packaging (primary as well as secondary) is physically opened in front of the customer at the time of delivery. This facility enables the customers to verify/inspect the product before accepting for delivery. In the case of product missing, wrong product received, damage, or an accessory missing, the customer can reject the product at the doorstep, and a refund will be initiated.",
        "This option for OBD is available on select products, at select locations and to select customers only.",
        "At the Checkout order Summary page the customer will know whether for any of their chosen product items, OBD is available or not.",
        "The OBD is available both for Cash on Delivery (COD)and Prepaid orders. If the customer opts for COD, then card of delivery and digital payments like UPI, etc will not be available at the doorstep and Contactless payment flow will also not be available for OBD orders in the current version of the program.",
        "After Placing Order, the customer will receive the OTP when the product is out for delivery. Customers will receive OTP in SMS as well as they can see this in their order details page.",
        "At the time of delivery, the customer or the recipient of the product needs to share the last four-digit number of delivery phone number or primary account phone number with the Delivery executive to initiate the OBD process. If the customer opted for COD, then they need to do the payment first and then OBD process will be initiated by the delivery executive",
        "The Customer will then inspect the ordered product in presence of the delivery executive, if the received order is the same as what they ordered for and if the product is in good condition and not damaged.",
        "Post the verification, customers shall be required to share the OTP with the delivery executive to acknowledge the confirmation that he/she has inspected the product before getting it delivered.",
        "In the event if the ordered product is not intact, damaged or it is the wrong product. The product must be handed over to the delivery executive which shall be returned, and the refund will be initiated immediately. In case of Cash on delivery, cash will be refunded immediately by the delivery executive. In the case of prepaid, the money will be credited within two business days.",
        "In the event the product is damaged, the customer should decline the shipment._"
    ]

    const onChangeValue = (e) => {
        let { value, name } = e.target
        console.log(name, value)
        setFormDate((pres) => ({
            ...pres,
            [name]: value
        }))
    }

    const deliveryHere = (address) => {
        // dispatch(newAddress(address, cookies.token))
        console.log(address)
        let { name,createdAt,updatedAt,_id, ...restFormData } = address
        console.log(orderNowProduct)
        console.log(restFormData)

        let orders = orderNowProduct.map((order) => (
            {
                ...order,
                ...restFormData,
                userName: name
            }
        ))
        console.log(orders)
        dispatch(
            getOrderNowProduct(orders)
        );
        setIsAddressComplete(true)
        setOrderSummary(true)
    }


    const formSubmit = async (e) => {
        e.preventDefault()

        console.log(formData)
        console.log(state)
        let data = { ...formData, state }
        // dispatch(newUserAddress({ ...data, state }, cookies.token))
        let res = await dispatch(newUserAddress({
            address: data,
            token: cookies.token
        }))

        console.log(res.meta.requestStatus === "fulfilled")
        console.log(res)

        if (res.meta.requestStatus === "fulfilled") {
            setIsNewAddress(false)
            setFormDate({
                name: "",
                phoneNo: "",
                pincode: "",
                city: "",
                address: "",
                alternatePhoneNo: ""
            })
            setSelectedAddress(0)
            let { name, ...restFormData } = formData
            let orders = orderNowProduct.map((order) => (
                {
                    ...order,
                    ...restFormData,
                    userName: name
                }
            ))
            dispatch(
                getOrderNowProduct(orders)
            );
            setIsAddressComplete(true)
            setOrderSummary(true)
        }
    }

    const orderSummaryCompleteClick = () => {
        setOrderSummary(false)
        setIsPayment(true)
    }

    const orderDecreaseQty = (productId) => {
        const orders = orderNowProduct.map((ord) => {
            if (ord.productId === productId && ord.qty > 1) {
                return { ...ord, qty: ord.qty - 1 };
            }
            return ord;
        }); console.log(orders)
        dispatch(
            getOrderNowProduct(orders)
        );
    }

    const orderIncreaseQty = (productId) => {
        const orders = orderNowProduct.map((ord) => {
            if (ord.productId === productId && ord.qty < 5) {
                return { ...ord, qty: ord.qty + 1 };
            }
            return ord;
        });
        console.log(orders);
        dispatch(
            getOrderNowProduct(orders)
        );
    };


    const codOrder = async () => {


        //    let res =await orderNowHeadelClickSlice(orderNowProduct,dispatch,cookies.token)
        let res = await dispatch(orderAllProduct({
            data: orderNowProduct,
            token: cookies.token
        }))
        console.log(res)
        console.log(res.meta.requestStatus)

        if (res.meta.requestStatus === "fulfilled") {
            toast.success("Order Placed Successfully", {
                description: `Your order will arrive on ${getDeliveryDateFormatted(Math.round(orderNowProduct?.rating))}`,
                action: {
                    label: "Undo",
                    background: "#ffffff", // White button
                    color: "#16a34a",      // Green text
                    onClick: () => console.log("Undo clicked"),
                },
                style: {
                    background: "#16a34a",   // Green success background
                    color: "#ffffff",        // White text
                    border: "1px solid #15803d", // Darker green border
                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                    borderRadius: "12px",
                },
            })

            navigate("/orders")
        } else {
            toast.error("ERROR", {
                description: `${res.payload.message}`,
                action: {
                    label: "Undo",
                    background: "#ffffff", // White button
                    color: "#dc2626",      // Red text
                    onClick: () => console.log("Undo clicked"),
                },
                style: {
                    background: "#dc2626",      // Red background (Tailwind red-600)
                    color: "#ffffff",           // White text
                    border: "1px solid #b91c1c", // Dark red border (red-700)
                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                    borderRadius: "12px",
                },
            })
        }
    }
    const otherOrderToast = (method) => {
        toast.warning(`${method} payment is not available at the moment`, {
            description: `We’re working on enabling secure online payments soon Please choose Cash on Delivery or try again later`,
            action: {
                label: "Undo",
                background: "#ffffff", // white button
                color: "#b45309",      // amber text
                onClick: () => console.log("Undo clicked"),
            },
            style: {
                background: "#facc15",    // yellow background (warning)
                color: "#78350f",         // dark amber/brown text
                border: "1px solid #eab308", // yellow border
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                borderRadius: "12px",
            },
        })
    }

    useEffect(() => {
        if (!orderNowProduct) {
            navigate("/");
        }
    }, [orderNowProduct]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch(getAddress(cookies.token))
    }, [])

    useEffect(() => {
        console.log(orderNowProduct)
    }, [orderNowProduct])
    return (
        <>
            <div className='bg-gray-100 min-h-[85vh] w-full'>

                <div className='flex flex-col-reverse md:grid grid-cols-10 gap-4 max-w-6xl mx-auto p-4 '>
                    <div className='col-span-10 md:col-span-7 rounded-2xl shadow-2xl'>
                        {!isAddressComplete ? <div>
                            <div className='bg-white mb-4'>
                                <h1 className='py-2 px-4 bg-gray-600 text-white mb-2'>DELIVERY ADDRESS</h1>

                                {alluserAddress && alluserAddress.length > 0 && alluserAddress.map((add, i) => (
                                    <div key={i} className='border-b py-2 px-2 md:px-3 lg:px-5'>
                                        <div className='flex gap-1 md:gap-3 lg:gap-5 justify-between' >

                                            <div className='flex gap-1 md:gap-3 lg:gap-5'>
                                                <input type="radio"
                                                    name="address"
                                                    id={`address${i}`}
                                                    checked={selectedAddress === i}
                                                    onChange={() => setSelectedAddress(i)} />
                                                <label htmlFor={`address${i}`} className="cursor-pointer" id="address">
                                                    <div className='flex gap-1 md:gap-2 lg:gap-4 font-semibold mb-2'>
                                                        <h1>{add?.name}</h1>
                                                        <div className='flex gap-1'>
                                                            <h1>{add?.phoneNo}</h1>
                                                            {add?.alternatePhoneNo && <h1>, {add?.alternatePhoneNo}</h1>}
                                                        </div>
                                                    </div>
                                                    <div className='flex items-start'>
                                                        <House size={15} className='text-3xl flex-1/16 flex mt-2' />
                                                        <div className='md:flex gap-1 flex-14/16'>
                                                            <h1>{add?.address}</h1>
                                                            <h1>{add?.city}</h1>
                                                            <h1>{add?.pincode}</h1>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>

                                            {selectedAddress === i && < div >
                                                <h1 className='text-orange-500 font-semibold px-1'>EDIT</h1>
                                            </div>}
                                        </div>
                                        {selectedAddress === i && <div className='py-2 px-5'>
                                            <button onClick={() => deliveryHere(add)} className='py-1 px-2 rounded-sm bg-orange-600 text-base cursor-pointer text-white'>Delivery Here</button>
                                        </div>}
                                    </div>))
                                }

                            </div>

                            <div className='bg-white rounded-md mb-4'>
                                {isnewUserAddress ?
                                    <div className='p-4 bg-white rounded-md transition-all'>
                                        <h1 className='pb-4 text-blue-600 font-semibold px-2 flex gap-3 items-center'><Plus /> Add a New Address</h1>
                                        <form onSubmit={formSubmit}>
                                            <div className='grid grid-cols-10 gap-3 pb-2 md:pb-4'>
                                                <Input className={"col-span-5 md:col-span-4 mb-2"} type="text" placeholder='name' name="name" onChange={onChangeValue} />
                                                <Input className={"col-span-5 md:col-span-4 mb-2"} type="number" placeholder='mobile number' name="phoneNo" onChange={onChangeValue} />
                                            </div>

                                            <div className='grid grid-cols-10 gap-3 pb-2 md:pb-4'>
                                                <Input className={"col-span-5 md:col-span-4 mb-2"} type="number" placeholder='Pincode' name="pincode" onChange={onChangeValue} />
                                                <Input className={"col-span-5 md:col-span-4 mb-2"} type="text" placeholder='City/District/Town' name="city" onChange={onChangeValue} />
                                            </div>

                                            <div className='grid grid-cols-10 pb-2 md:pb-4' >
                                                <textarea className={"col-span-8 h-20 border-gray-200 border-2 rounded-md p-2"} placeholder='Address (Area and street)' name="address" onChange={onChangeValue} />
                                            </div>

                                            <div className='grid grid-cols-10 gap-3 pb-2 md:pb-4'>
                                                <div className={"col-span-5 md:col-span-4 mb-2"}>

                                                    <Select value={state} onValueChange={(value) => setState(value)}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a state" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>State</SelectLabel>
                                                                {indianStates.map((state) => (
                                                                    <SelectItem value={state}>{state}</SelectItem>

                                                                ))}

                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <Input className={"col-span-5 md:col-span-4 mb-2"} type="number" placeholder='Alternate Phone Number' name="alternatePhoneNo" onChange={onChangeValue} />
                                            </div>
                                            <div className='flex gap-8 items-center'>
                                                <button className='py-2 px-4 rounded-md bg-orange-600 text-white'>Save and Delivery Here</button>
                                                {error && <p className='text-red-700 font-semibold'>{error}</p>}
                                            </div>
                                        </form>
                                    </div>
                                    : <div onClick={() => {
                                        setIsNewAddress(true)
                                        setSelectedAddress(null)
                                    }} className='py-3 text-sm md:text-base px-5 text-blue-700 font-medium flex gap-3 cursor-pointer items-center'><Plus /> Add new Address</div>}
                            </div>
                        </div>

                            : <div>
                                <div className='flex justify-between items-center py-2 px-4 bg-gray-600 text-white'>
                                    <h1 className=''>DELIVERY ADDRESS</h1>
                                    {isAddressComplete && <MapPinCheckInside color='white' />}
                                </div>
                                <div className='px-3 lg:px-5 py-2 bg-gray-50 flex justify-between items-center'>
                                    <div>
                                        <div className='flex gap-2 md:gap-3 lg:gap-4 font-semibold mb-2'>
                                            <h1>{orderNowProduct[0]?.userName}</h1>
                                            <div className='flex gap-1'>
                                                <h1>{orderNowProduct[0]?.phoneNo}</h1>
                                                {orderNowProduct[0]?.alternatePhoneNo && <h1>, {orderNowProduct[0]?.alternatePhoneNo}</h1>}
                                            </div>
                                        </div>
                                        <div className='md:flex text-sm md:text-base gap-1 px-2'>
                                            <h1>{orderNowProduct[0]?.address}</h1>
                                            <h1>{orderNowProduct[0]?.city}</h1>
                                            <h1>{orderNowProduct[0]?.pincode}</h1>
                                        </div>
                                    </div>
                                    {orderNowProduct[0]?.address && <div className='md:px-3 px-2 flex md:gap-2'>
                                        <h1 onClick={() => {
                                            setOrderSummary(false)
                                            setIsPayment(false)
                                            setIsAddressComplete(false)
                                        }} className='text-orange-500 uppercase cursor-pointer font-semibold'>change</h1>

                                    </div>}
                                </div>
                            </div>}
                        {/* orderSummary */}
                        <div className='bg-white rounded-md'>
                            {orderSummary ?
                                <div>
                                    <h1 className='py-2 px-4 bg-gray-600 text-white mb-2'>ORDER SUMMARY</h1>
                                    {orderNowProduct.map((orders) => (<div className='grid grid-cols-10 gap-4 items-center p-3'>
                                        <Link to={`/${orders.catergory}/product/${orders.productId}`} className='col-span-2'>
                                            <img className='w-40 aspect-square object-contain' src={orders?.mainImg} alt={orders?.name} />
                                        </Link>
                                        <div className='col-span-8 md:col-span-5'>
                                            <h1 className="line-clamp-1">{orders?.ditails}</h1>
                                            <h1 className="text-gray-500 md:py-2"><span>Seller</span> {orders?.brand}</h1>
                                            <div className='flex items-center gap-2 md:gap-3 lg:gap-5'>
                                                <div className='flex gap-1 md:gap-2 lg:gap-3 items-center'>
                                                    <h1 className='line-through text-xs md:text-sm'>{formatPrice(orders?.mrp)}</h1>
                                                    <h1 className='font-semibold text-dase md:text-lg'>{formatPrice(orders?.price)}</h1>
                                                    <h1 className='text-green-500 text-[10px] md:text-sm'>{Math.round(((orders?.mrp - orders?.price) / orders?.mrp) * 100)} % Off</h1>
                                                </div>
                                                <div className='flex gap-2 items-center ps-2 md:ps-5 lg:ps-10 '>

                                                    {/* decrease */}
                                                    <h1 className='border rounded-full cursor-pointer text-gray-600'
                                                        onClick={() => orderDecreaseQty(orders.productId)}>
                                                        <Minus size={20} className='text-black md:text-gray-600 hidden md:flex' />
                                                        <Minus size={15} className='text-black md:text-gray-600 md:hidden flex' />
                                                    </h1>

                                                    {/* qty */}
                                                    <h1 className='font-semibold border px-3 text-black  text-sm'>
                                                        {orders?.qty}
                                                    </h1>

                                                    {/* increase */}
                                                    <h1 className='border rounded-full cursor-pointer'
                                                        onClick={() => orderIncreaseQty(orders.productId)}>
                                                        <Plus size={20} className='text-black md:text-gray-600 hidden md:flex' />
                                                        <Plus size={15} className='text-black md:text-gray-600 md:hidden flex' />
                                                    </h1>

                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-10 md:col-span-3'>
                                            <h1 className='font-semibold pb-4 md:mb-2'>Delivery by {getDeliveryDateFormatted(Math.round(orderNowProduct?.rating))}</h1>
                                            <div>

                                                <div className='flex justify-center items-start gap-2'>
                                                    <PackageOpen className='text-yellow-500 ' size={60} />
                                                    <h1 className='text-sm/5 px-2 '>Open Box Delivery is eligible for this item. You will reacive a confirmation post payment.
                                                        <Dialog>
                                                            <form>
                                                                <DialogTrigger asChild>
                                                                    <h1 className='text-blue-500 font-bold cursor-pointer'>Know More</h1>
                                                                </DialogTrigger>
                                                                <DialogContent className="max-w-[275px] max-h-[400px] sm:max-w-[625px] lg:max-h-[500px] overflow-scroll">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Open Box Delivery</DialogTitle>
                                                                        <DialogDescription>
                                                                            Terms and Conditions for Open Box Delivery
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <div>
                                                                        <ul className='p-2' >
                                                                            {openBoxDeliveryList.map((item, i) => (
                                                                                <li className='pb-3 list-disc' key={i}>{item}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>

                                                                </DialogContent>
                                                            </form>
                                                        </Dialog>
                                                    </h1>

                                                </div>

                                            </div>

                                        </div>
                                    </div>))}
                                    <div className='me-3 md:me-5 pb-3 flex justify-end'>
                                        <button onClick={orderSummaryCompleteClick} className='px-2 me-5 py-1 rounded-md uppercase bg-orange-600 font-medium text-[13px] text-white cursor-pointer'>Continue</button>
                                    </div>


                                </div>
                                :
                                <>
                                    {!orderSummary && !isAddressComplete && <h1 className=' py-2 px-4 bg-gray-600 text-white mb-4'>ORDER SUMMARY</h1>}


                                    {!orderSummary && isAddressComplete &&


                                        <div className="bg-gray-50 ">
                                            <div className='flex justify-between items-center py-2 px-4 bg-gray-600 text-white'>
                                                <h1 className=' text-white'>ORDER SUMMARY</h1>
                                                {!orderSummary && <Check color='white' />}
                                            </div>
                                            {orderNowProduct.map((order) => (<div className='px-2 md:px-3 lg:px-5 py-2 bg-blue-0 flex gap-2 items-center justify-between'>
                                                <div className='flex gap-2 items-center'>
                                                    <img className='w-14 object-contain aspect-square' src={order.mainImg} alt="" />
                                                    <div className="md:flex gap-3">
                                                        <h1 className='line-clamp-1'>{order?.ditails.length > 40 ? order?.ditails.substring(0, 40) + "..." : order?.ditails}</h1>
                                                        <h1>{formatPrice(order?.price)}</h1>
                                                        <h1>Qty : {order?.qty}</h1>
                                                    </div>
                                                </div>
                                                <div className='pe-2 md:pe-4'>
                                                    <h1 onClick={() => {
                                                        setOrderSummary(true)
                                                        setIsPayment(false)
                                                        setIsAddressComplete(true)
                                                    }} className='text-orange-500 uppercase cursor-pointer font-semibold'>change</h1>
                                                </div>
                                            </div>))}

                                        </div>

                                    }
                                </>
                            }
                            {/* <h1>{orderNowProduct?.name}</h1> */}
                        </div>
                        {isPayment &&
                            <div className='col-span-10 md:col-span-3 bg-white shadow-2xl cursor-pointer h-fit block md:hidden'>
                                <h1 className='py-2 px-3 border-b bg-gray-600 text-white font-semibold'>PRICE DETALISE</h1>
                                <div>
                                    <div className='py-4 px-4 md:px-8 border-b text-[17px]'>
                                        <div className='grid grid-cols-2 pb-4'>
                                            <h1 className='col-span-1'>price ({orderNowProduct.reduce((tot, item) => tot + item.qty, 0)} items)</h1>
                                            <h1 className='col-span-1'>{formatPrice(orderNowProduct.reduce((tot, item) => tot + (item.qty * item.price), 0))}</h1>
                                        </div>

                                        <div className='grid grid-cols-2 pb-2'>
                                            <h1 className='col-span-1'>Total fees</h1>
                                            <h1 className='col-span-1'>{formatPrice(orderNowProduct.length * 5)}</h1>
                                        </div>
                                    </div>
                                    <div className='py-4  px-4 md:px-8 border-b grid grid-cols-2 font-semibold'>
                                        <h1 className='col-span-1'>Total Payable</h1>
                                        <h1 className='col-span-1'>{formatPrice(orderNowProduct.reduce((tot, item) => (tot + (item.qty * item.price) + 5), 0))}</h1>
                                    </div>
                                    <div className='py-4 border-b flex justify-center items-center'>
                                        <h1 className=' text-green-500'>Your Total Savings on this order {formatPrice(orderNowProduct.reduce((tot, item) => (tot + (item.mrp - (item.qty * item.price)) + 5), 0))}</h1>
                                    </div>
                                </div>
                            </div>

                        }
                        {/* payment */}
                        <div className='bg-white rounded-md mb-4'>
                            {isPayment ?
                                <div>
                                    <h1 className='py-2 px-4 bg-gray-600 text-white mb-2'>PAYMENT</h1>
                                    <div>
                                        <div className='flex flex-col md:grid grid-cols-4 border rounded-md'>
                                            <div className='col-span-2'>
                                                <div onClick={() => setSeletePayment("cod")} className={`${selectPayment === "cod" && "bg-gray-100"} flex gap-2 px-4 py-4 items-center border-b cursor-pointer`}>
                                                    <div>
                                                        {/* icone */}
                                                        <img className='w-6 h-6' src={cashIcone} alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className='font-semibold'>Cash on Delivery</h1>
                                                    </div>
                                                </div>

                                                <div onClick={() => {
                                                    otherOrderToast("UPI")
                                                    setSeletePayment("upi")
                                                }} className={`${selectPayment === "upi" && "bg-gray-100"} flex gap-2 px-4 py-4 items-center border-b cursor-pointer`}>
                                                    <div>
                                                        <img className='w-8 h-8 aspect-square' src={upiIcone} alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className='font-semibold pb-2'>UPI</h1>
                                                        <p className='text-xs text-gray-500'>Pay by any UPI app</p>
                                                    </div>
                                                </div>

                                                <div onClick={() => {
                                                    setSeletePayment("card")
                                                    otherOrderToast("Credit / Debit / ATM Card")
                                                }} className={`${selectPayment === "card" && "bg-gray-100"} flex gap-2 px-4 py-4 items-center border-b cursor-pointer`}>
                                                    <div>
                                                        {/* <CreditCard /> */}
                                                        <img className='w-6 h-6 aspect-square' src={cardIcone} alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className='font-semibold pb-2'>Credit / Debit / ATM Card</h1>
                                                        <p className='text-xs text-gray-500'>Add and Secure cards as per RBI guidelins</p>
                                                    </div>
                                                </div>

                                                <div onClick={() => {
                                                    setSeletePayment("emi")
                                                    otherOrderToast("EMI")
                                                }} className={`${selectPayment === "emi" && "bg-gray-100"}  border-b cursor-no-drop`}>
                                                    <HoverCard>

                                                        <HoverCardTrigger asChild>
                                                            <div className='flex gap-2 px-4 py-4 items-center'>
                                                                <div>
                                                                    {/* icone */}
                                                                    <img className='w-6 h-6' src={emiIcone} alt="" />
                                                                </div>
                                                                <div>
                                                                    <h1 className='font-semibold pb-2'>EMI</h1>
                                                                    <p className='text-xs text-gray-500'>Get Debit and Cardless EMIs on HDFC Bank</p>
                                                                </div>
                                                            </div>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent className="w-80 bg-black text-white"
                                                            align="center"
                                                            sideOffset={0}>
                                                            <div className="flex justify-between gap-4 ">
                                                                <Avatar>
                                                                    <h1 className='text-2xl'>⚠️</h1>
                                                                    <AvatarFallback>VC</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <h4 className="text-xl font-semibold pb-2">Warning/Notice</h4>
                                                                    <p className="text-sm text-gray-500">
                                                                        EMI payment is currently unavailable. This feature will be added soon.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                </div>
                                            </div>
                                            <div className='col-span-2 bg-gray-100 p-2'>

                                                {selectPayment === "cod" && <div className='h-fit bg-white p-3'>
                                                    <p className='text-base text-gray-500 pb-3 px-3'>Due to handling costs , a nominal fee of ₹5 will be charged for order placed using</p>
                                                    <button onClick={codOrder} className='py-2 px-4 bg-yellow-500 font-medium rounded-md cursor-pointer w-full'>Place Order</button>
                                                </div>}


                                                {selectPayment === "card" && <HoverCard>
                                                    <HoverCardTrigger asChild>
                                                        <div className="w-full px-4 py-2 bg-white cursor-no-drop">
                                                            {/* <form onSubmit={(e)=> e.preventDefault()}> */}
                                                            <FieldGroup>
                                                                <FieldSet>
                                                                    <FieldLegend>Card Method</FieldLegend>
                                                                    <FieldDescription>
                                                                        All transactions are secure and encrypted
                                                                    </FieldDescription>

                                                                    <FieldGroup>
                                                                        <Field>
                                                                            <FieldLabel>Name on Card</FieldLabel>
                                                                            <Input placeholder="Evil Rabbit" required />
                                                                        </Field>

                                                                        <Field>
                                                                            <FieldLabel>Card Number</FieldLabel>
                                                                            <Input placeholder="1234 5678 9012 3456" required />
                                                                        </Field>

                                                                        <div className="grid grid-cols-3 gap-4">
                                                                            <Field>
                                                                                <FieldLabel>Month</FieldLabel>
                                                                                <Select>
                                                                                    <SelectTrigger>
                                                                                        <SelectValue placeholder="MM" />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                        <SelectItem value="01">01</SelectItem>
                                                                                        <SelectItem value="02">02</SelectItem>
                                                                                        <SelectItem value="03">03</SelectItem>
                                                                                        <SelectItem value="04">04</SelectItem>
                                                                                        <SelectItem value="05">05</SelectItem>
                                                                                        <SelectItem value="06">06</SelectItem>
                                                                                        <SelectItem value="07">07</SelectItem>
                                                                                        <SelectItem value="08">08</SelectItem>
                                                                                        <SelectItem value="09">09</SelectItem>
                                                                                        <SelectItem value="10">10</SelectItem>
                                                                                        <SelectItem value="11">11</SelectItem>
                                                                                        <SelectItem value="12">12</SelectItem>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </Field>

                                                                            <Field>
                                                                                <FieldLabel>Year</FieldLabel>
                                                                                <Select>
                                                                                    <SelectTrigger>
                                                                                        <SelectValue placeholder="YYYY" />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                        <SelectItem value="2024">2024</SelectItem>
                                                                                        <SelectItem value="2025">2025</SelectItem>
                                                                                        <SelectItem value="2026">2026</SelectItem>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </Field>

                                                                            <Field>
                                                                                <FieldLabel>CVV</FieldLabel>
                                                                                <Input placeholder="123" required />
                                                                            </Field>
                                                                        </div>
                                                                    </FieldGroup>
                                                                </FieldSet>

                                                                <FieldSeparator />
                                                                <Field orientation="horizontal">
                                                                    <Button className="cursor-no-drop" type="submit" onClick={() => otherOrderToast("Credit / Debit / ATM Card")}>Submit</Button>
                                                                    <Button variant="outline" type="button">Cancel</Button>
                                                                </Field>
                                                            </FieldGroup>
                                                            {/* </form> */}
                                                        </div>
                                                    </HoverCardTrigger>

                                                    {/* MUST BE OUTSIDE TRIGGER */}
                                                    <HoverCardContent className="w-80 bg-black text-white"
                                                        align="center"

                                                        sideOffset={0}>
                                                        <div className="flex justify-between gap-4 ">
                                                            <Avatar>
                                                                {/* <AvatarImage src="https://github.com/vercel.png" /> */}
                                                                <h1 className='text-2xl'>⚠️</h1>
                                                                <AvatarFallback>VC</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <h4 className="text-xl font-semibold pb-2">Warning/Notice</h4>
                                                                <p className="text-sm text-gray-500">
                                                                    Credit / Debit / ATM Card payment is not available at the moment. We’re working on enabling secure online payments soon.
                                                                    <span className='text-white'>Please choose Cash on Delivery or try again later</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </HoverCardContent>
                                                </HoverCard>}

                                                {selectPayment === "upi" && <HoverCard>
                                                    <HoverCardTrigger asChild>
                                                        <div className="w-full px-4 py-2 bg-white cursor-no-drop">
                                                            {/* <form> */}
                                                            <h1 className='pb-2'>UPI ID</h1>
                                                            <div className='flex gap-3'>
                                                                <Input placeholder="Enter Your UPI ID" required />
                                                                <Button className="bg-gray-500 text-white">Verify</Button>
                                                            </div>
                                                            <div className='pt-5'>
                                                                <Button className="bg-gray-500 w-full" onClick={() => otherOrderToast("UPI")}>Pay {formatPrice((orderNowProduct?.price * orderNowProduct?.qty) + 5)}</Button>
                                                            </div>
                                                            {/* </form> */}
                                                        </div>
                                                    </HoverCardTrigger>

                                                    {/* MUST BE OUTSIDE TRIGGER */}
                                                    <HoverCardContent className="w-80 bg-black text-white"
                                                        align="center"

                                                        sideOffset={0}>
                                                        <div className="flex justify-between gap-4 ">
                                                            <Avatar>
                                                                <h1 className='text-2xl'>⚠️</h1>
                                                                <AvatarFallback>VC</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <h4 className="text-xl font-semibold pb-2">Warning/Notice</h4>
                                                                <p className="text-sm text-gray-500">
                                                                    UPI payment is not available at the moment. We’re working on enabling secure online payments soon.
                                                                    <span className='text-white'>Please choose Cash on Delivery or try again later</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </HoverCardContent>
                                                </HoverCard>}

                                                {selectPayment === "emi" &&
                                                    <div className='flex justify-center items-center h-full bg-white p-2'>
                                                        <h1 className='text-lg p-4 text-center'>EMI payment is currently unavailable. This feature will be added soon.</h1>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <h1 className='py-2 px-4 bg-gray-600 text-white mb-2'>PAYMENT</h1>
                                </div>
                            }

                        </div>

                    </div>
                    <div className='col-span-10 md:col-span-3 bg-white shadow-2xl cursor-pointer h-fit hidden md:block'>
                        <h1 className='py-2 px-3 md:px-8 border-b bg-gray-600 text-white font-semibold'>PRICE DETALISE</h1>
                        <div className='py-4 px-4 md:px-8 border-b text-[17px]'>
                            <div className='grid grid-cols-2 pb-4'>
                                <h1 className='col-span-1'>price ({orderNowProduct.reduce((tot, item) => tot + item.qty, 0)} items)</h1>
                                <h1 className='col-span-1'>{formatPrice(orderNowProduct.reduce((tot, item) => tot + (item.qty * item.price), 0))}</h1>
                            </div>

                            <div className='grid grid-cols-2 pb-2'>
                                <h1 className='col-span-1'>Total fees</h1>
                                <h1 className='col-span-1'>{formatPrice(orderNowProduct.length * 5)}</h1>
                            </div>
                        </div>
                        <div className='py-4  px-4 md:px-8 border-b grid grid-cols-2 font-semibold'>
                            <h1 className='col-span-1'>Total Payable</h1>
                            <h1 className='col-span-1'>{formatPrice(orderNowProduct.reduce((tot, item) => (tot + (item.qty * item.price) + 5), 0))}</h1>
                        </div>
                        <div className='py-4 border-b flex justify-center items-center'>
                            <h1 className=' text-green-500'>Your Total Savings on this order {formatPrice(orderNowProduct.reduce((tot, item) => (tot + (item.mrp - (item.qty * item.price)) + 5), 0))}</h1>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default payment



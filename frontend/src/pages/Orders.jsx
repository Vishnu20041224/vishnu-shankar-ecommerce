import { House, CircleUserRound, PackageOpen, Ship, Truck, PackageCheck } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useCookies } from 'react-cookie'
import { getAllOrders, getOneOrders } from "../redux/slice/orderSlice.js"
import { useNavigate } from "react-router-dom"
import { getDeliveryDateFormatted, formatPrice } from "../redux/slice/commonfunctionSlice.js"
import VerticalCartLoader from '../components/carts/VerticalCartLoader.jsx';
import Footer from "../components/FooterCart.jsx"

const Orders = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  let [cookies] = useCookies(["token"])

  let { error,
    token,
    loading,
    orderProduct,
    order } = useSelector((state) => state.order)

  let orderPage = async (id) => {
    console.log(id)
    let res = await dispatch(getOneOrders({ id, token: cookies.token }))
    console.log(res)
    if (res.meta.requestStatus === "fulfilled") {
      navigate("order")
    }

  }

  function deliveryState(createdAt, deliveryDateString) {

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
    if (percent < 33.3) {
      return <span className='flex gap-2 items-center text-yellow-500'><PackageOpen size={18} /> Order Confirmed</span>
    }
    if (percent < 66.3) {
      return <span className='flex gap-2 items-center text-yellow-500'><Ship size={18} /> Shipping</span>
    }
    if (percent < 79.3) {
      return <span className='flex gap-2 items-center text-green-300'><Truck size={18} /> Out for delivery</span>
    }
    if (percent <= 100) {
      return <span className='flex gap-2 items-center text-green-500'><PackageCheck size={18} />Delivered</span>
    }
    // return Number(percent.toFixed(2));
  }

  useEffect(() => {
    dispatch(getAllOrders(cookies.token))
    console.log("orderProduct", orderProduct)
  }, [dispatch, cookies.token])


  if (!cookies.token) {
    return (
      <>
      <div className="h-[91vh] w-full flex items-center justify-center">
        <h2 className="text-2xl font-bold">
          Please login to view your Wish List
        </h2>
      </div>
            <Footer/>

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
      <Footer/>
      </>
    )
  }

  // ⏳ Loading
  if (loading) {
    return (

      <VerticalCartLoader />

    )
  }

  // 🧺 Empty wishlist
  if (orderProduct.length === 0) {
    return (
      <>
        <div className="h-[91vh] w-full flex items-center justify-center">
          <h2 className="text-2xl font-bold">
            Your order List is empty
          </h2>
        </div>
        <Footer />

      </>
    )
  }




  return (
    <>
      <div className='bg-gray-100 w-full min-h-screen p-5 py-3 md:p-5'>
        <div className='max-w-6xl mx-auto rounded-2xl'>
          <div className='flex justify-center items-center py-1 md:py-2'>
            <h1 className='md:text-3xl text-2xl font-bold pb-2'>Your Orders</h1>
          </div>
          {orderProduct?.map((product) => (
            <div key={product._id} className="grid grid-cols-10 items-center border mb-2 md:mb-3.5 lg:mb-5 rounded-2xl bg-white p-2 lg:pe-5">

              <div onClick={() => orderPage(product._id)} className="col-span-6 md:col-span-5 grid-cols-6 flex gap-2 items-center text-xs md:text-base cursor-pointer">
                <div className='col-span-3 md:col-span-2 w-18 md:w-32 '>
                  <img className='f-full h-full object-contain aspect-square rounded-2xl' src={product.collectionsImgs && product.selectColor ? product.collectionsImgs[product.selectColor][0] : product.mainImg} alt="" />
                </div>
                <div className='col-span-3 md:col-span-4'>
                  <h1 className='hidden md:flex line-clamp-1'>{product.ditails.length > 40 ? product.ditails.substring(0, 40) + "..." : product.ditails}</h1>
                  <h1 className='md:hidden line-clamp-2'>{product.ditails.length > 20 ? product.ditails.substring(0, 20) + "..." : product.ditails}</h1>
                  <h1 className='text-gray-800'><span className='font-semibold '>Color</span> :{product.selectColor || product.mainColor}</h1>
                  <h1 className='text-gray-800'><span className='font-semibold '>Size</span> :{product.selectSize || product.selectStorage + " GB" || product.memoryStorageCapacity + " GB"}</h1>
                  <h1 className='text-gray-800'><span className='font-semibold '>Saler</span> :{product.brand}</h1>
                </div>
              </div>

              <div className="col-span-0 md:col-span-1 text-sm md:text-base hidden md:flex">{formatPrice((product.price * product.qty) + 5)}</div>
              <div className="col-span-4 md:col-span-4 text-sm md:text-base flex flex-col md:flex-row md:justify-between gap-3">
                <h1 className=' flex gap-2 items-center font-semibold text-xs md:text-base'>{deliveryState(product.createdAt, product.deliveryDate)}</h1>
                <h1 className='flex gap-2 items-center text-[10px] md:text-base'>Delivered on {product.deliveryDate}</h1>
                <h1 className='md:hidden flex text-xs'>{formatPrice((product?.price * product?.qty) + 5)}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Orders
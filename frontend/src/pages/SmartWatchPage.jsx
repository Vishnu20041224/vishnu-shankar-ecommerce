import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../redux/slice/productSlice'
import HorizontalCart from '../components/carts/HorizontalCart'
import FilterProduct from '../components/FilterProduct'
import { Loader2 } from 'lucide-react'
import Footer from "../components/FooterCart.jsx"

const SmartWatchPage = () => {
  let { loading, smartWatchProducts } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  useEffect(() => {
    if (smartWatchProducts.length <= 0) {
      dispatch(getProduct({}))
    }
    console.log("smartWatchProducts", smartWatchProducts)
  }, [])
  return (
    <>
      {loading && <HorizontalCart/>}
      <div className='mb-3 flex gap-3 relative'>
        <div className='top-0 left-0 absolute sm:relative hidden'>
          <FilterProduct data={smartWatchProducts}/>
        </div>
        <div className='flex-1'>
          {smartWatchProducts.map((pro) => (
            <HorizontalCart product={pro} key={pro._id} />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default SmartWatchPage
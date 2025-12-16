import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../redux/slice/productSlice'
import HorizontalCart from '../components/carts/HorizontalCart'
import FilterProduct from '../components/FilterProduct'
import { Loader2 } from 'lucide-react'
import HorizontalCartLoader from '../components/carts/HorizontalCartLoader'
import Footer from "../components/FooterCart.jsx"

const HeadPhonepage = () => {
  let { loading, headPhoneProducts } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  useEffect(() => {
    if (headPhoneProducts.length <= 0) {
      dispatch(getProduct({}))
    }

    console.log(headPhoneProducts)
  }, [])
  return (
    <>
      {loading && <HorizontalCartLoader/>}
      <div className='mb-3 flex gap-3 relative'>
        <div className='top-0 left-0 absolute sm:relative hidden'>
          <FilterProduct data={headPhoneProducts}/>
        </div>
        <div className='flex-1'>
          {headPhoneProducts.map((pro) => (
            <HorizontalCart product={pro} key={pro._id} />
          ))}
        </div>
        
      </div>
      <Footer/>
    </>
  )
}

export default HeadPhonepage
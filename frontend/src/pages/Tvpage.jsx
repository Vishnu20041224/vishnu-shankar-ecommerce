import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../redux/slice/productSlice'
import HorizontalCart from '../components/carts/HorizontalCart'
import FilterProduct from '../components/FilterProduct'
import { Loader2 } from 'lucide-react'
import Footer from "../components/FooterCart.jsx"

const Tvpage = () => {
  let { loading, tvProducts } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  useEffect(() => {
    if (tvProducts.length <= 0) {
      dispatch(getProduct({}))
    }
    console.log(tvProducts)
  }, [])
  return (
    <>
      {loading && <HorizontalCart/>}
      <div className='mb-3 flex gap-3 relative'>
        <div className='top-0 left-0 absolute sm:relative hidden' >
          <FilterProduct data={tvProducts}/>
        </div>
        <div className='flex-1'>
          {tvProducts.map((pro) => (
            <HorizontalCart product={pro} key={pro._id} />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Tvpage
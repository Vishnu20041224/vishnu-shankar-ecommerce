import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProduct } from "../redux/slice/productSlice"
import { Loader2 } from "lucide-react"
import VerticalCart from "../components/carts/VerticalCart"
import FilterProduct from '../components/FilterProduct'
import HorizontalCartLoader from "../components/carts/HorizontalCartLoader"
import Footer from "../components/FooterCart.jsx"

const ShoePage = () => {
  let dispatch = useDispatch()
  let { loading, shoeProducts } = useSelector((state) => state.product)

  useEffect(() => {
    if (shoeProducts.length <= 0) {
      dispatch(getProduct({}))
    }
    console.log(shoeProducts)
  }, [dispatch])
  return (
    <>
      {loading && <HorizontalCartLoader/>}

      <div className='mb-3 flex gap-3 relative'>
       
        <div className='top-0 left-0 absolute sm:relative hidden'>
          <FilterProduct data={shoeProducts}/>
        </div>
       
        <div className='flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 justify-between max-w-6xl mx-auto'>
          {shoeProducts.map((pro) => (
            <VerticalCart product={pro} key={pro._id} />
          ))}
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default ShoePage
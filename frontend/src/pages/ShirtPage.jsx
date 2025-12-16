import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProduct } from "../redux/slice/productSlice"
import { Loader2 } from "lucide-react"
import VerticalCart from "../components/carts/VerticalCart"
import FilterProduct from '../components/FilterProduct'
import HorizontalCartLoader from "../components/carts/HorizontalCartLoader"
import Footer from "../components/FooterCart.jsx"

const ShirtPage = () => {

  let dispatch = useDispatch()
  let { loading, shirtProducts } = useSelector((state) => state.product)

  useEffect(() => {
    if (shirtProducts.length <= 0) {
      dispatch(getProduct({}))
    }
    console.log(shirtProducts)
  }, [dispatch])

  return (
    <>
      {loading && <HorizontalCartLoader/>}

      <div className='mb-3 flex gap-3 relative'>
       
        <div className='top-0 left-0 absolute sm:relative hidden'>
          <FilterProduct data={shirtProducts}/>
        </div>
       
        <div className='flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 justify-between max-w-6xl mx-auto'>
          {shirtProducts.map((pro) => (
            <VerticalCart product={pro} key={pro._id} />
          ))}
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default ShirtPage
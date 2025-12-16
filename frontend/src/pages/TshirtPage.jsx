import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProduct } from "../redux/slice/productSlice"
import { Loader2 } from "lucide-react"
import VerticalCart from "../components/carts/VerticalCart"
import FilterProduct from '../components/FilterProduct'
import VerticalCartLoader from "../components/carts/VerticalCartLoader"
import Footer from "../components/FooterCart.jsx"


const TshirtPage = () => {
  let dispatch = useDispatch()
  let { loading, tshirtProducts } = useSelector((state) => state.product)

  useEffect(() => {
     if (tshirtProducts.length <= 0) {
      dispatch(getProduct({}))
    }
    console.log(tshirtProducts)
  }, [dispatch])
  return (
   <>
      {loading && <VerticalCartLoader/>}

      <div className='mb-3 flex gap-3 relative'>

        <div className='top-0 left-0 absolute sm:relative hidden'>
          <FilterProduct data={tshirtProducts}/>
        </div>

        <div className='flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 justify-between max-w-6xl mx-auto'>
          {tshirtProducts.map((pro) => (
            <VerticalCart product={pro} key={pro._id} />
          ))}
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default TshirtPage
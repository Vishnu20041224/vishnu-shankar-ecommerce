import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../redux/slice/productSlice'
import HorizontalCart from '../components/carts/HorizontalCart'
import FilterProduct from '../components/FilterProduct'
import { Loader2 } from 'lucide-react'
import HorizontalCartLoader from '../components/carts/HorizontalCartLoader'
import Footer from "../components/FooterCart.jsx"

const PhonePage = () => {

    let { loading, phoneProducts } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    useEffect(() => {
        if (phoneProducts.length <= 0) {
            dispatch(getProduct({}))
        }
        console.log(phoneProducts)
    }, [])


    return (
        <>
            {/* {loading && <div className='animate-spin flex justify-center items-center h-screen'>
                <Loader2 className='h-8'/>
            </div>} */}

            {loading &&
                <HorizontalCartLoader />
            }

            <div className='mb-3 flex gap-3 relative'>
                <div className='top-0 left-0 absolute sm:relative hidden'>
                    <FilterProduct data={phoneProducts} />
                </div>
                <div className='flex-1'>
                    {phoneProducts.map((pro) => (
                        <HorizontalCart product={pro} key={pro._id} />
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default PhonePage
import { useDispatch, useSelector } from "react-redux"
import { getLikeProduct } from "../redux/slice/wishListSlice"
import { useCookies } from 'react-cookie'
import { useEffect } from "react"
import VerticalCart from "../components/carts/VerticalCart"
import VerticalCartLoader from "../components/carts/VerticalCartLoader"
import Footer from "../components/FooterCart.jsx"

const WishList = () => {
  const dispatch = useDispatch()
  let { wishListProduct, loading, error } = useSelector((state) => state.wishList)
  let [cookies] = useCookies(["token"])

  async function getProduct() {
    try {
      let res = await dispatch(getLikeProduct(cookies.token))
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    // getProduct()
    dispatch(getLikeProduct(cookies.token))
    console.log("Wishlist Products:", wishListProduct)
  }, [dispatch, cookies.token])

  if (!cookies.token) {
    return (
      <>
        <div className="h-[91vh] w-full flex items-center justify-center">
          <h2 className="text-2xl font-bold">
            Please login to view your Wish List
          </h2>
        </div>
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
        <Footer />
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
  if (wishListProduct.length === 0) {
    return (
      <>
        <div className="h-[91vh] w-full flex items-center justify-center">
          <h2 className="text-2xl font-bold">
            Your Wish List is empty
          </h2>
        </div>
        <Footer />

      </>
    )
  }
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 ">
        {!loading && wishListProduct?.map((product) => (
          <VerticalCart product={product} key={product._id} />
        ))}
      </div>
      <Footer />

    </>
  )
}

export default WishList
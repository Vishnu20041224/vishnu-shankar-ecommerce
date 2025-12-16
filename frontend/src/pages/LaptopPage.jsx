import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../redux/slice/productSlice';
import HorizontalCart from '../components/carts/HorizontalCart';
import FilterProduct from '../components/FilterProduct';
import { Loader2 } from 'lucide-react';
import HorizontalCartLoader from '../components/carts/HorizontalCartLoader';
import Footer from "../components/FooterCart.jsx"

const LaptopPage = () => {
  let { loading, laptopProducts,filteredProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const productsToShow =
    filteredProducts.length > 0 ? filteredProducts : laptopProducts;

  useEffect(() => {
    if (laptopProducts.length === 0) {
      dispatch(getProduct({})); // Updated query to include category
    }
  }, []); // Fixed dependency array

  if (loading) {
    return (
      <HorizontalCartLoader/>
    );
  }

  return (
    <>
      <div className='mb-3 flex gap-3 relative'>
        <div className='top-0 left-0 absolute sm:relative hidden'>
          <FilterProduct data={laptopProducts} />
        </div>
        <div className='flex-1'>
          {productsToShow.map((pro) => (
            <HorizontalCart product={pro} key={pro._id} />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default LaptopPage;
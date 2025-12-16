import { useSelector } from 'react-redux';
import HorizontalCart from '../components/carts/HorizontalCart';
import VerticalCart from '../components/carts/VerticalCart';
import { Loader2 } from 'lucide-react';
import Footer from "../components/FooterCart.jsx"

const SearchPage = () => {
    const { loading, filteredProducts } = useSelector((state) => state.product);

    if (loading) {
        return (
            <HorizontalCartLoader />
        );
    }

    if (!filteredProducts || filteredProducts.length === 0) {
        return <div className="text-center mt-10">No products found</div>;
    }

    const categories = ["phone", "laptop", "Headphone", "Smartwatch", "tv"];
    const isHorizontalCart = categories.includes(filteredProducts[0].catergory);

    return (
        <>
            <div className='mb-3 flex gap-3 relative max-w-6xl mx-auto'>
                {isHorizontalCart ? (
                    <div className='flex-1'>
                        {filteredProducts.map((pro) => (
                            <HorizontalCart product={pro} key={pro._id} />
                        ))}
                    </div>
                ) : (
                    <div className='flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 justify-between'>
                        {filteredProducts.map((pro) => (
                            <VerticalCart product={pro} key={pro._id} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SearchPage;

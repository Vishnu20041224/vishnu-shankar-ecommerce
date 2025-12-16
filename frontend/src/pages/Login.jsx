import React, { useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { authLogin } from "../redux/slice/authSlice"
import { getProduct } from '../redux/slice/productSlice'
import { getAllOrders } from '../redux/slice/orderSlice'
import { getAddToCart } from '../redux/slice/addToCartSlice'
import { useCookies } from "react-cookie";
import Footer from "../components/FooterCart.jsx"

const Login = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);

    let { loading, error, user, token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let [formData, setFormData] = useState({
        password: "",
        email: ""
    })

    function getInputValue(e) {
        console.log(e)
        let { name, value } = e.target
        setFormData((pres) => (
            {
                ...pres,
                [name]: value
            }
        ))
    }

    async function heandClickSubmit(e) {
        e.preventDefault()
        console.log(formData)
        let res = await dispatch(authLogin(formData))
        console.log(res)
        console.log(res.meta.requestStatus)
        if (res.meta.requestStatus === "fulfilled") {
            navigate("/")

            setCookie("token", res.payload.token, { path: "/", maxAge: 7 * 24 * 60 * 60 });
            setCookie("user", JSON.stringify(res.payload.user), { path: "/", maxAge: 7 * 24 * 60 * 60 });
            console.log(res.payload.token)
            console.log(res.payload.user) //{_id: '692c935370a63c3126241a6b', name: 'vishnu', email: 'rhvishnushankar@gmail.com', isAdmain: false}
            console.log(JSON.stringify(res.payload.user))  // {"_id":"692c935370a63c3126241a6b","name":"vishnu","email":"rhvishnushankar@gmail.com","isAdmain":false}
        }
        console.log(error)

    }


    useEffect(() => {
        dispatch(getProduct({}))
        dispatch(getAllOrders(cookies.token))
        dispatch(getAddToCart(cookies.token))
    }, [dispatch, cookies.token])
    return (
        <>
            <div className='w-full h-[91vh] flex justify-center items-center'>
                <form onSubmit={heandClickSubmit} className='border px-5 rounded-2xl'>
                    <div className='flex justify-center items-center py-7'>
                        <h1 className='text-3xl font-bold'>Login</h1>
                    </div>
                    <div className='grid grid-cols-10 items-center gap-2 my-2'>
                        <label className='col-span-3 font-semibold' htmlFor="email">Email :</label>
                        <input className='col-span-7 border-2 rounded-md px-3 py-1' onChange={getInputValue} type="email" name='email' placeholder='user@gamil.com' />
                    </div>

                    <div className='grid grid-cols-10 items-center gap-2 my-2'>
                        <label className='col-span-3 font-semibold' htmlFor="password">Password :</label>
                        <input className='col-span-7 border-2 rounded-md px-3 py-1' onChange={getInputValue} type="password" name='password' placeholder='password' />
                    </div>

                    <div className='flex justify-center items-center py-5 cursor-pointer'>
                        <button className='py-2 px-3 rounded-md font-semibold bg-blue-800 text-white'>{loading ? "Loading..." : "Login"}</button>
                    </div>

                    <Link to={"/signup"} className='flex justify-center items-center text-blue-800 text-xs py-3'>
                        <p>New User Sign up</p>
                    </Link>

                    {error && <div className='flex justify-center items-center py-3'>
                        <p className='text-red-600'>{error}</p>
                    </div>}
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default Login
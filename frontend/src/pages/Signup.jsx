import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { authSignUp } from "../redux/slice/authSlice"
import { useCookies } from "react-cookie";
import Footer from "../components/FooterCart.jsx"

const Signup = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);


    let { loading, error, user, token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let [formData, setFormData] = useState({
        name: "",
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

        let res = await dispatch(authSignUp(formData))
        console.log(res)
        console.log(res.meta.requestStatus)
        if (res.meta.requestStatus === "fulfilled") {
            navigate("/")

            setCookie("token", res.payload.token, { path: "/", maxAge: 7 * 24 * 60 * 60 });
            setCookie("user", res.payload.user, { path: "/", maxAge: 7 * 24 * 60 * 60 });
        }

        // if (res.meta.requestStatus === "rejected") {
        console.log(error)
    }

    return (
        <>
            <div className='w-full h-[91vh] flex justify-center items-center'>
                <form onSubmit={heandClickSubmit} className='border px-5 rounded-2xl'>
                    <div className='flex justify-center items-center py-7'>
                        <h1 className='text-3xl font-bold'>Sign Up</h1>
                    </div>

                    <div className='grid grid-cols-10 items-center gap-2 my-2'>
                        <label className='col-span-3 font-semibold' htmlFor="name">Name :</label>
                        <input className='col-span-7 border-2 rounded-md px-3 py-1' onChange={getInputValue} type="text" name='name' placeholder='userName' />
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
                        <button className='py-2 px-3 rounded-md font-semibold bg-blue-800 text-white'>Sing Up</button>
                    </div>

                    <Link to={"/login"} className='flex justify-center items-center text-blue-800 text-xs'>
                        <p>Already Singin please Login</p>
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

export default Signup
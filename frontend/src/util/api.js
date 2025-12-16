import axios from "axios"

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})
console.log(import.meta.env.VITE_API_URL)
// Fetch Product 

export const fetchProduct = (query)=>API.get("/products",{params:query})
export const fetchOneProduct = (id)=>API.get(`/product/${id}`)

// Auth

export const login = (data)=>API.post("/login",data)
export const signup = (data)=>API.post("/signup",data)

// addToCart

export const getAddToCart = (token)=>API.get("/addtocart",{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const createAddToCart = (data,token)=>API.post("/addtocart",data,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const deleteAddToCart = (id,token)=>API.delete(`/addtocart/${id}`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const deleteAllAddToCart = (token)=>API.delete(`/addtocartdeleteall`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const increaseAddToCart = (id,token)=>API.patch(`/addtocart/increase/${id}`,{},{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const decreaseAddToCart = (id,token)=>API.patch(`/addtocart/decrease/${id}`,{},{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

// Wish List

export const likeProduct = (data,token)=>API.post(`/like`,data,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const getLikeProduct = (token)=>API.get(`/like`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})


// user Address

export const getUserAddress = (token)=>API.get(`/useraddress`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const addNewUserAddress = (address,token)=>API.post(`/useraddress`,address,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})





// Order Product

export const getAllOrderProduct = (token)=>API.get(`/order`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const orderProduct = (data,token)=>API.post(`/order`,data,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const orderAllProduct = (data,token)=>API.post(`/orderall`,data,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const getOneOrderProduct = (id,token)=>API.get(`/order/${id}`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
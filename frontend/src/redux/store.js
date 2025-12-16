import {configureStore} from "@reduxjs/toolkit"
import products from "./slice/productSlice.js"
import authReducer from "./slice/authSlice.js"
import addToCartReducer from "./slice/addToCartSlice.js"
import wishListReducer from "./slice/wishListSlice.js"
import orderReducer from "./slice/orderSlice.js"
import userAddressReducer from "./slice/userAddressSlice.js"

import commonfunctionReducer from "./slice/commonfunctionSlice.js"



const store = configureStore({
    reducer:{
        product:products,
        auth:authReducer,
        addToCart:addToCartReducer,
        common:commonfunctionReducer,
        wishList:wishListReducer,
        order:orderReducer,
        userAddress:userAddressReducer

    }
})

export default store
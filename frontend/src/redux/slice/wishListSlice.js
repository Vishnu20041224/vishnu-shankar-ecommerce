import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import *as api from "../../util/api.js"

export const likeProduct = createAsyncThunk(
    "wishlist/post",
    async ({ data, token }, { rejectWithValue }) => {
        try {
            let res = await api.likeProduct(data, token)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Wish List Product failed" })
        }
    }
)

export const getLikeProduct = createAsyncThunk(
    "wishlist/get",
    async (token, { rejectWithValue }) => {
        try {
            let res = await api.getLikeProduct(token)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Wish List Get Product failed" })
        }
    }
)



const initialState = {
    error: null,
    token: null,
    loading: false,
    wishListProduct: []
}

const wishList = createSlice({
    name: "Like",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getLikeProduct.pending, (state, action) => {
                state.loading = true
            })

            .addCase(getLikeProduct.fulfilled, (state, action) => {
                state.loading = false
                state.wishListProduct = action.payload
            })

            .addCase(getLikeProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                 state.wishListProduct = null
            })

            // create
            // .addCase(likeProduct.pending, (state, action) => {
            //     state.loading = true
            // })

            .addCase(likeProduct.fulfilled, (state, action) => {
                state.loading = false

            })

            // .addCase(likeProduct.rejected, (state, action) => {
            //     state.loading = false
            //     state.error = action.payload.message
            // })
    }
})

export default wishList.reducer
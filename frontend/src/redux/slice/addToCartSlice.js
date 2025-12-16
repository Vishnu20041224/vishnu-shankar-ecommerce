import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import *as api from "../../util/api.js"


export const getAddToCart = createAsyncThunk(
    "addToCart/Get",
    async (token, { rejectWithValue }) => {
        try {
            let res = await api.getAddToCart(token)
            console.log(res.data.data)
            return res.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Get AddToCart failed" })
        }
    }
)

export const createAddToCart = createAsyncThunk(
    "addToCart/post",
    async ({ data, token }, { rejectWithValue }) => {
        try {
            let res = await api.createAddToCart(data, token)
            console.log(data)
            console.log(data.selectShoeSize)
            console.log(res)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Create AddToCart failed" })
        }
    }
)

export const deleteAddToCart = createAsyncThunk(
    "addToCart/DELETE",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            let res = await api.deleteAddToCart(id, token)
            return id
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Delete AddToCart failed" })
        }
    }
)

export const deleteAllAddToCart = createAsyncThunk(
    "addToCart/DELETE/all",
    async (token, { rejectWithValue }) => {
        try {
            let res = await api.deleteAllAddToCart(token)
            return res
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Delete AddToCart failed" })
        }
    }
)

export const increaseAddToCart = createAsyncThunk(
    "addToCart/increse/Patch",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            let res = await api.increaseAddToCart(id, token)
            return res.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "increase AddToCart failed" })
        }
    }
)

export const decreaseAddToCart = createAsyncThunk(
    "addToCart/decrease/Patch",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            let res = await api.decreaseAddToCart(id, token)
            return res.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "increase AddToCart failed" })
        }
    }
)


export const addToCartHeadelClickSlice = async (data, dispatch, token) => {
    let { _id, productId, ...rest } = data
    console.log({ ...rest, productId: _id })
    let res = await dispatch(createAddToCart({
        data: { ...rest, productId: productId || _id },
        token
    }))
    console.log(res)



}




const initialState = {
    error: null,
    token: null,
    loading: false,
    addToCartProduct: []
}

const addToCartSlice = createSlice({
    name: "AddToCart",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAddToCart.pending, (state) => {
                state.loading = true
            })

            .addCase(getAddToCart.fulfilled, (state, action) => {
                state.loading = false
                state.addToCartProduct = action.payload
                state.error = null
            })
            .addCase(getAddToCart.rejected, (state, action) => {
                state.error = action.payload.message
                state.addToCartProduct = []
                state.loading = false
            })

            // create addtocart

            .addCase(createAddToCart.pending, (state, action) => {
                state.loading = true
            })

            .addCase(createAddToCart.fulfilled, (state, action) => {
                state.loading = false
                state.addToCartProduct.unshift(action.payload)
                state.error = null
            })
            .addCase(createAddToCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                state.addToCartProduct = []
            })

            // delete one

            .addCase(deleteAddToCart.fulfilled, (state, action) => {
                const deleteId = action.payload;
                state.addToCartProduct = state.addToCartProduct.filter(
                    (item) => item._id !== deleteId
                );
                state.error = null
            })

            .addCase(deleteAllAddToCart.fulfilled, (state, action) => {
                state.addToCartProduct = [];
                state.error = null
            })

            // increase

            .addCase(increaseAddToCart.fulfilled, (state, action) => {
                const updateProduct = action.payload;
                let { _id } = updateProduct
                state.addToCartProduct = state.addToCartProduct.map((pro) => pro._id === _id ? updateProduct : pro)
                console.log(state.addToCartProduct)
                state.error = null
            })

            // decreaseAddToCart
            .addCase(decreaseAddToCart.fulfilled, (state, action) => {
                const updateProduct = action.payload;
                let { _id } = updateProduct
                state.addToCartProduct = state.addToCartProduct.map((pro) => pro._id === _id ? updateProduct : pro)
                state.error = null
            })
    }
})

export default addToCartSlice.reducer
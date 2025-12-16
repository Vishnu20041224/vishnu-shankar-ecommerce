import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import *as api from "../../util/api.js"

export const getAllOrders = createAsyncThunk(
    "orders/All/GET",
    async (token, { rejectWithValue }) => {
        try {
            let res = await api.getAllOrderProduct(token)
            console.log(res.data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Get Orders failed" })
        }
    }
)

export const getOneOrders = createAsyncThunk(
    "orders/One/GET",
    async ({ id, token }, { rejectWithValue }) => {
        try {
            let res = await api.getOneOrderProduct(id, token)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Get Orders failed" })
        }
    }
)

export const orderProduct = createAsyncThunk(
    "orders/One/Post",
    async ({ data, token }, { rejectWithValue }) => {
        try {
            let res = await api.orderProduct(data, token)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Get Orders failed" })
        }
    }
)

export const orderAllProduct = createAsyncThunk(
    "orders/All/Post",
    async ({ data, token }, { rejectWithValue }) => {
        try {
            let res = await api.orderAllProduct(data, token)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Get Orders failed" })
        }
    }
)



export const orderNowHeadelClickSlice = async (data, dispatch, token) => {
    console.log({ ...data, productId: data.productId || data._id })
    let res = await dispatch(orderProduct({
        data,
        token
    }))
    console.log(res)
}




const initialState = {
    error: null,
    token: null,
    loading: false,
    orderProduct: [],
    order: {},
    orderNowProduct: [],
    orderAllProduct: []
}


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        getOrderNowProduct: (state, action) => {
            state.loading = true
            state.orderNowProduct = action.payload;
            state.loading = false
        },
        getOrderAllProduct: (state, action) => {
            state.loading = true
            state.orderAllProduct = action.payload
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state, action) => {
                state.loading = true
            })

            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orderProduct = action.payload
                state.error = null
            })

            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                 state.orderProduct = []
            })



            .addCase(getOneOrders.pending, (state, action) => {
                state.loading = true
            })

            .addCase(getOneOrders.fulfilled, (state, action) => {
                state.loading = false
                state.order = action.payload
            })

            .addCase(getOneOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })

            // order one product 



            .addCase(orderProduct.fulfilled, (state, action) => {
                state.loading = false
                state.orderProduct.unshift(action.payload)
                state.error = action.payload.message
            })

            // Order All Product

            .addCase(orderAllProduct.pending, (state, action) => {
                state.loading = true
            })

            .addCase(orderAllProduct.fulfilled, (state, action) => {
                console.log(...action.payload)
                state.orderProduct.push(...action.payload)
                state.error = null
                state.loading = false
            })

            .addCase(orderAllProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })

        // get product

    }
})
export const { getOrderNowProduct, getOrderAllProduct } = orderSlice.actions;
export default orderSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import *as api from "../../util/api.js"

export const newUserAddress = createAsyncThunk(
    "userAddress/post",
    async ({ address, token }, { rejectWithValue }) => {
        try {
            let res = await api.addNewUserAddress(address, token)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Add New User failed" })
        }
    }
)

export const getAddress = createAsyncThunk(
    "userAddress/get",
    async (token, { rejectWithValue }) => {
        try {
            let res = await api.getUserAddress(token)
            console.log(res.data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "get New User failed" })
        }
    }
)



const initialState = {
    error: null,
    token: null,
    loading: false,
    alluserAddress: []
}

const userAddressSlice = createSlice({
    name: "AddToCart",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(newUserAddress.pending, (state) => {
                state.loading = true
            })
            .addCase(newUserAddress.fulfilled, (state, action) => {
                state.loading = false
                state.alluserAddress.unshift(action.payload.data)
                state.error = null
            })
            .addCase(newUserAddress.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                
            })

            .addCase(getAddress.pending, (state) => {
                state.loading = true
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.loading = false
                state.alluserAddress = action.payload.data  // ALWAYS replace
                state.error = null
            })
            .addCase(getAddress.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })


    }
}
)


export default userAddressSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import *as api from "../../util/api.js"

const initialState = {
    error: null,
    token: null,
    user: null,
    loading: false
}

export const authLogin = createAsyncThunk(
    "Auth/login/POST",
    async (data, { rejectWithValue }) => {
        try {
            let res = await api.login(data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Login failed" })
        }
    }
)

export const authSignUp = createAsyncThunk(
    "Auth/signup/POST",
    async (data, { rejectWithValue }) => {
        try {
            let res = await api.signup(data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "SignUp failed" })
        }
    }
)

const authSlice = createSlice({
    name: "Auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, (state, action) => {
                state.loading = true
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.error = null
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })

            // SignUp
             .addCase(authSignUp.pending, (state, action) => {
                state.loading = true
            })
            .addCase(authSignUp.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                 state.error = null
            })
            .addCase(authSignUp.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })

    }
})

export default authSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Heart, Star, StarHalf, Loader2, Circle, Package, ShoppingCart } from 'lucide-react';
import { toast } from "sonner"


export function getDeliveryDateFormatted(deliveryDay) {
    const date = new Date();
    let delivery = deliveryDay || 4
    date.setDate(date.getDate() + delivery);

    const options = {
        weekday: "short",   // Mon, Tue, Wed...
        day: "2-digit",     // 01, 02, 03...
        month: "short"      // Jan, Feb, Mar...
    };

    return date.toLocaleDateString("en-US", options);
}

export function formatPrice(price) {
    const num = Number(price);

    // If price is invalid, return ₹0.00
    const safePrice = isNaN(num) ? 0 : num;

    return safePrice.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,   // 👉 No decimals
        maximumFractionDigits: 2    // 👉 Keep decimals if available
    });
}


export const warningToast = (title, message,navigate) => {

    toast.warning(title, {
        description: `${message === "Token Failed" ? "Please login or Sign Up" : message}`,
        action: {
            label: "Login",
            background: "#ffffff", // White button
            color: "#dc2626",      // Red text
            onClick: () => navigate("/login"),
        },
        style: {
            background: "#f59e0b",        // Amber-500 (warning)
            color: "#ffffff",             // White text
            border: "1px solid #d97706",  // Amber-600
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            borderRadius: "12px",
        }
    })
}

const initialState = {
}

const commonfunctionSlice = createSlice({
    name: "commonFunctionSlice",
    initialState,
    reducers: {}

})

export default commonfunctionSlice.reducer
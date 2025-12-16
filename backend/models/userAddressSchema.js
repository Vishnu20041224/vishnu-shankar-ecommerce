import mongoose from "mongoose";

const userDitailsSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, trim: true, required: true },
        phoneNo: { type: Number, trim: true, required: true },
        pincode: { type: Number, trim: true, required: true },
        locality: { type: String, trim: true },
        address: { type: String, trim: true, required: true },
        city: { type: String, trim: true, required: true },
        state: { type: String, trim: true, required: true },
        landMark: { type: String, trim: true },
        alternatePhoneNo: { type: String, trim: true },

    }, { timestamps: true })

export const UserAddress = mongoose.model("userAddress", userDitailsSchema)
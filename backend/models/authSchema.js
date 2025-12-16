import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true, lowercase: true },
    password: { type: String, trim: true, required: true },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)
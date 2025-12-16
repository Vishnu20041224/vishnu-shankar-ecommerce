import mongoose from "mongoose";

export const connectDB = async (url) => {
    try {
        if (!url) return console.log("MongoDB URL was not provide")
        await mongoose.connect(url, {
        dbName:"vsecommerce"
        })
        console.log("mongoDb Connect")
    } catch (error) {
        console.log(error)
        return error
    }
}
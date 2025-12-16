import { UserAddress } from "../models/userAddressSchema.js";

export const createNewAddress = async (req, res) => {
    try {
        let user = req.user
        let userId = req.user._id
        if (!user) return res.status(401).json({ message: "No Token please Login or Singup" })

        let {
            name,
            address,
            phoneNo,
            alternatePhoneNo,
            pincode,
            city,
            state
        } = req.body

        if (!name) return res.status(400).json({ message: "Name is required" })
        if (!address) return res.status(400).json({ message: "address is required" })
        if (!phoneNo) return res.status(400).json({ message: "phone Number is required" })
        if (phoneNo.length > 10 || phoneNo.length < 10) return res.status(400).json({ message: "phone Number must be 10 digit number" })
        // if (alternatePhoneNo && alternatePhoneNo.length > 10 || alternatePhoneNo.length < 10) return res.status(400).json({ message: "alternate phone Number must be 10 digit number" })
        if (!pincode) return res.status(400).json({ message: "pincode is required" })
        if (pincode.length > 6 || pincode.length < 6) return res.status(400).json({ message: "pincode Number must be 6 digit number" })
        if (!city) return res.status(400).json({ message: "city is required" })
        if (!state) return res.status(400).json({ message: "state is required" })

        let newAddress = await UserAddress.create({
            userId,
            name,
            address,
            phoneNo,
            alternatePhoneNo,
            pincode,
            city,
            state
        })

        return res.status(201).json({
            message: "Get New User Address",
            data: newAddress
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}

export const getAddress = async (req, res) => {
    try {
        let user = req.user
        let userId = req.user._id
        if (!user) return res.status(401).json({ message: "No Token please Login or Singup" })

        let allAddress = await UserAddress.find({ userId }).sort({ createdAt: -1 });

        if (allAddress.length === 0) return res.status(200).json({ message: "Add You new Address", data: [] })

        res.status(200).json({
            message: "Get all Your user Address",
            data: allAddress
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}
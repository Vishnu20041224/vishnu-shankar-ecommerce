import { Orders } from "../models/orderSchema.js"

export const orderProduct = async (req, res) => {
    try {
        let user = req.user
        let userId = req.user._id
        if (!user) return res.status(401).json({ message: "No Token please Login or Singup" })

        let {

            productId,
            productNo,
            name,
            brand,
            ditails,
            catergory,
            rating,
            operatingSystem,
            memoryStorageCapacity,
            storages,
            storagesPrice,
            ramMemorySize,
            screenSize,
            resolution,
            formFactor,
            impedance,
            earPlacement,
            materialComposition,
            Pattern,
            fittype,
            sleevetype,
            collarStyle,
            gender,
            shoeSize,
            materialType,
            closureType,
            heelType,
            waterResistanceLevel,
            sole,
            style,
            batteryCapacity,
            sport,
            material,
            neckStyle,
            manufacturer,
            refreshRate,
            displayTechnology,
            specialFeature,
            includedComponents,
            connectivityTechnology,
            screenSizes,
            screenSizesPrice,

            about,
            price,
            mrp,
            mainImg,
            mainColor,
            imgs,
            collectionsImgs,

            size,
            qty,
            selectStorage,
            selectRam,
            selectSize,
            selectColor,

            deliveryDate,

            userName,
            phoneNo,
            pincode,
            city,
            address,
            alternatePhoneNo


        } = req.body

        // if (!productId ||
        //     !userId ||
        //     !name ||
        //     !brand ||
        //     !ditails ||
        //     !catergory ||
        //     !rating ||
        //     !price
        // ) return res.status(400).json({ message: "Invailed Product Ditails" })

        console.log(productId)

        if (!brand) return res.status(400).json({ message: "Invailed Product brand" })
        if (!productId) return res.status(400).json({ message: "Invailed Product productId" })
        if (!userId) return res.status(400).json({ message: "Invailed Product userId" })
        if (!ditails) return res.status(400).json({ message: "Invailed Product ditails" })
        if (!catergory) return res.status(400).json({ message: "Invailed Product catergory" })
        if (!rating) return res.status(400).json({ message: "Invailed Product rating" })
        if (!price) return res.status(400).json({ message: "Invailed Product price" })
        if (!deliveryDate) return res.status(400).json({ message: "Invailed Product deliveryDate" })
        if (!userName) return res.status(400).json({ message: "Invailed Product userName" })
        if (!phoneNo) return res.status(400).json({ message: "Invailed Product phoneNo" })
        if (!pincode) return res.status(400).json({ message: "Invailed Product pincode" })
        if (!city) return res.status(400).json({ message: "Invailed Product city" })
        if (!address) return res.status(400).json({ message: "Invailed Product address" })

        let orderProduct = await Orders.create({
            userId,
            deliveryDate,
            productId,
            productNo,
            name,
            brand,
            ditails,
            catergory,
            rating,
            operatingSystem,
            memoryStorageCapacity,
            storages,
            storagesPrice,
            ramMemorySize,
            screenSize,
            resolution,
            formFactor,
            impedance,
            earPlacement,
            materialComposition,
            Pattern,
            fittype,
            sleevetype,
            collarStyle,
            gender,
            shoeSize,
            materialType,
            closureType,
            heelType,
            waterResistanceLevel,
            sole,
            style,
            batteryCapacity,
            sport,
            material,
            neckStyle,
            manufacturer,
            refreshRate,
            displayTechnology,
            specialFeature,
            includedComponents,
            connectivityTechnology,
            screenSizes,
            screenSizesPrice,

            about,
            price,
            mrp,
            mainImg,
            mainColor,
            imgs,
            collectionsImgs,

            size,
            qty,
            selectStorage,
            selectRam,
            selectSize,
            selectColor,

            userName,
            phoneNo,
            pincode,
            city,
            address,
            alternatePhoneNo

        })

        return res.status(201).json(orderProduct)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}

export const orderAllProduct = async (req, res) => {
    try {
        let user = req.user;
        let userId = req.user._id;

        if (!user)
            return res.status(401).json({ message: "No Token please Login or Signup" });

        let products = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Products array required" });
        }

        const formattedOrders = products.map(item => {

            if (!item.productId)
                throw new Error("Invalid Product productId");

            if (!item.brand)
                throw new Error("Invalid Product brand");

            if (!item.ditails)
                throw new Error("Invalid Product ditails");

            if (!item.catergory)
                throw new Error("Invalid Product category");

            if (!item.rating)
                throw new Error("Invalid Product rating");

            if (!item.price)
                throw new Error("Invalid Product price");

            if (!item.deliveryDate)
                throw new Error("Invalid Product deliveryDate")

            if (!item.userName)
                throw new Error("Invalid Product userName")

            if (!item.phoneNo)
                throw new Error("Invalid Product phoneNo")

            if (!item.pincode)
                throw new Error("Invalid Product pincode")

            if (!item.city)
                throw new Error("Invalid Product city")

            if (!item.address)
                throw new Error("Invalid Product address")



            const { _id, ...withoutId } = item;
            return {
                ...withoutId,
                userId
            };
        });

        const createdOrders = await Orders.insertMany(formattedOrders);

        return res.status(201).json(
            createdOrders
        );
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}


export const getAllOrderProduct = async (req, res) => {
    try {
        let user = req.user
        let userId = req.user._id
        if (!user) return res.status(401).json({ message: "No Token please Login or Singup" })

        let allOrders = await Orders.find({ userId }).sort({ createdAt: -1})
        if (allOrders.length === 0) return res.status(400).json({ message: "please Order to your Orders" })
        return res.status(200).json(allOrders)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}

export const getOneOrderProduct = async (req, res) => {
    try {
        let user = req.user
        let userId = req.user._id
        if (!user) return res.status(401).json({ message: "No Token please Login or Singup" })

        let orderId = req.params.id
        let order = await Orders.findOne({ userId, _id: orderId })
        if (!order) return res.status(400).json({ message: "order was not found" })
        return res.status(200).json(order)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}
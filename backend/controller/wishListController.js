import { wishList } from "../models/wishListSchema.js"

export const Like = async (req, res) => {
    try {
        let userId = req.user._id
        let userName = req.user.name
        if (!userId) return res.status(401).json({ message: "No Token please Login or Singup" })

        // let proId = req.params.id



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
        } = req.body

        if (!productId ||
            !userId
        ) return res.status(400).json({ message: `${userName} Invailed Product ditails ` })

        let deleteWish = await wishList.findOne({ userId, productId })

        if (deleteWish) {
            await wishList.deleteOne({ _id: deleteWish._id })
            return res.status(200).json({
                message: "wish list product remove",
                data: deleteWish
            })
        }

        let createWishList = await wishList.create({
            userId,
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
        })

        return res.status(201).json({
            message: "Create New Wish List Product",
            data: createWishList
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })

    }
}

export const getLike = async (req, res) => {
    try {
        let userId = req.user._id
        if (!userId) return res.status(401).json({ message: "No Token please Login or Singup" })

        let products = await wishList.find({ userId })

        if (!products) return res.status(401).json({ message: "Product not found" })
        if (products.length <= 0) return res.status(401).json({ message: "please Select prodcut" })

        return res.status(200).json(products)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })

    }
}

export const getOneLike = async (req, res) => {
    try {
        let userId = req.user._id
        let productId = req.params.id
        if (!userId) return res.status(401).json({ message: "No Token please Login or Singup" })

        let products = await wishList.findOne({ userId, _id: productId })

        if (!products) return res.status(401).json({ message: "Product not found" })
        if (products.length <= 0) return res.status(401).json({ message: "please Select prodcut" })

        return res.status(200).json(products)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })

    }
}
import { addToCart } from "../models/addToCartSchema.js"

export const addToCartCreate = async (req, res) => {
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
        } = req.body

        if (!productId ||
            !userId ||
            !name ||
            !brand ||
            !ditails ||
            !catergory ||
            !rating ||
            !price
        ) return res.status(400).json({ message: "Invailed Product Ditails" })


        const existing = await addToCart.findOne({
            userId,
            productId,
            selectStorage,
            selectRam,
            selectSize,
            selectColor,
        });

        // If already exists → increase qty
        if (existing) {
            if (existing.qty < 5) {
                existing.qty += 1;
                await existing.save();
                return res.status(201).json(existing);
            } else {
                return res.status(200).json({ message: "Can't increase item more than 5" });
            }
        }
        let createAddToCart = await addToCart.create({
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
            selectColor

        })

        return res.status(201).json(createAddToCart)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })

    }
}

export const addToCartGet = async (req, res) => {
    try {
        let user = req.user
        let userId = req.user._id
        if (!user) return res.status(401).json({ message: "No Token please Login or Singup" })

        let data = await addToCart.find({ userId }).sort({ createdAt: -1 });

        if (data.length <= 0) return res.status(400).json({ message: "please AddToCart to your Orders" })

        return res.status(200).json({
            count: data.length,
            data
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })

    }
}

export const addToCartGetOne = async (req, res) => {
    try {
        let user = req.user
        let userId = req.user._id
        let productId = req.params.id
        if (!user) return res.status(401).json({ message: "No Token please Login or Singup" })

        let data = await addToCart.findOne({ userId, _id: productId });

        if (!data) return res.status(400).json({ message: "AddToCart Product Not Found" })

        return res.status(200).json(
            data
        )

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })

    }
}

export const addToCartdelete = async (req, res) => {
    try {

        let { id } = req.params
        let userId = req.user._id
        if (!id) return res.status(400).json({ message: "Add To Cart ID missing" })

        let product = await addToCart.findOne({ userId, _id: id })
        if (!product) return res.status(401).json({ message: "Product Not Found" })

        await addToCart.deleteOne(product)

        return res.status(200).json({
            message: `id product deleted`,
            data: product
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })

    }
}


export const addToCartdeleteAll = async (req, res) => {
    try {

        let userId = req.user._id

        let product = await addToCart.find({ userId })
        if (!product) return res.status(401).json({ message: "Product Not Found" })

        await addToCart.deleteMany({userId})

        return res.status(200).json({
            message: `All products are deleted`,
            data: product
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })

    }
}

export const addToCartIncrease = async (req, res) => {
    try {
        let { id } = req.params
        let userId = req.user._id
        console.log(userId)
        console.log(id)

        if (!id) return res.status(400).json({ message: "Add To Cart ID missing" })
        if (!userId) return res.status(400).json({ message: "No Token please Login or Singup" })


        let product = await addToCart.findOne({ userId, _id: id })
        if (!product) return res.status(401).json({ message: "Product Not Found" })

        if (product.qty >= 5) {
            return res.status(400).json({ message: "Maximum quantity reached (6)" });
        }

        product.qty += 1
        await product.save()

        return res.status(200).json({
            message: "Quantity increased",
            data: product
        });


    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })

    }
}

export const addToCartDecrease = async (req, res) => {
    try {
        let { id } = req.params
        let userId = req.user._id

        if (!id) return res.status(400).json({ message: "Add To Cart ID missing" })
        if (!userId) return res.status(400).json({ message: "No Token please Login or Singup" })


        let product = await addToCart.findOne({ userId, _id: id })
        if (!product) return res.status(401).json({ message: "Product Not Found" })

        if (product.qty <= 1) {
            return res.status(400).json({ message: "Maximum quantity reached (6)" });
        }

        product.qty -= 1
        await product.save()

        return res.status(200).json({
            message: "Quantity decrease",
            data: product
        });


    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })

    }
}
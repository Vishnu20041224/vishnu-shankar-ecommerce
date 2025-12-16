import { Products } from "../models/productsSchema.js"


export const getProduct = async (req, res) => {
    try {
        let query = {}

        if (req.query.search) {
            query.$or = [
                { ditails: { $regex: req.query.search, $options: "i" } },
                { name: { $regex: req.query.search, $options: "i" } },
            ]
        }


        if (req.query.brand) {
            const brands = Array.isArray(req.query.brand)
                ? req.query.brand
                : [req.query.brand]

            query.brand = { $in: brands }
        }

        let products = await Products.find(query)
        if (products.length < 1) return res.status(404).json({ error: "Product Not Fetch" })
        return res.status(200).json({
            data: products,
            count: products.length
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: error.message })
    }
}

export const getOneProduct = async (req, res) => {
    try {
        const { id } = req.params
        let product = await Products.findById(id)
        if (!product) return res.status(404).json({ error: "Product Not Found" })
        return res.status(200).json({ data: product })
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({ error: error.message })

    }
}

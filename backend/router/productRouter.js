import express from "express"
import { getOneProduct, getProduct } from "../controller/productController.js"


const router = express.Router()

router.route("/products")
.get(getProduct)

router.get("/product/:id", getOneProduct)
export default router
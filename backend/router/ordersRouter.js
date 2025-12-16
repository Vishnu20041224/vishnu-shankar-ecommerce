import express from "express"
import { authRequied } from "../middleware/authMiddleware.js"
import { orderProduct, getAllOrderProduct, getOneOrderProduct, orderAllProduct } from "../controller/orderController.js"

const router = express.Router()

router.route("/order")
    .post(authRequied, orderProduct)
    .get(authRequied, getAllOrderProduct)

router.post("/orderall", authRequied, orderAllProduct)
router.get("/order/:id", authRequied, getOneOrderProduct)

export default router
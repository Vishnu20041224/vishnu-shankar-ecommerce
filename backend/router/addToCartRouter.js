import express from "express"
import {authRequied} from "../middleware/authMiddleware.js"
import {addToCartCreate,addToCartGet,addToCartdelete,addToCartDecrease,addToCartIncrease,addToCartGetOne,addToCartdeleteAll} from "../controller/addToCartController.js"

const router = express.Router()

router.route("/addtocart")
.post(authRequied,addToCartCreate)
.get(authRequied,addToCartGet)

router.route("/addtocart/:id")
.delete(authRequied,addToCartdelete)
.get(authRequied,addToCartGetOne)

router.delete("/addtocartdeleteall",authRequied,addToCartdeleteAll)

router.patch("/addtocart/increase/:id",authRequied,addToCartIncrease)
router.patch("/addtocart/decrease/:id",authRequied,addToCartDecrease)

export default router 
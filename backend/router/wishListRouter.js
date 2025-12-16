import express from "express"
import {Like,getLike,getOneLike} from "../controller/wishListController.js"
import {authRequied} from "../middleware/authMiddleware.js"
const router = express.Router()

// router.get("/like",authRequied,getLike)
// router.post("/like",authRequied,Like)

router.route("/like")
.get(authRequied,getLike)
.post(authRequied,Like)

router.get("/like/:id",authRequied,getOneLike)

export default router
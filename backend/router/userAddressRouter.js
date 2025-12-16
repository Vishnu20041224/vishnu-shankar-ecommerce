import express from "express"
import { authRequied } from "../middleware/authMiddleware.js"
import { createNewAddress, getAddress } from "../controller/userAddressController.js"
const router = express.Router()

router.route("/useraddress")
    .post(authRequied, createNewAddress)
    .get(authRequied, getAddress)

export default router 
import { User } from "../models/authSchema.js"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"


const signupToken = ({ _id, name, email, isAdmin }) => {
    return jwt.sign(
        { _id, name, email, isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRES_IN || "7d" }
    )
}

export const signup = async (req, res) => {
    try {
        let { name, email, password, isAdmin } = req.body
        if (!name) return res.status(401).json({ message: "Invailed name" })
        if (!email) return res.status(401).json({ message: "Invailed email" })
        if (!password) return res.status(401).json({ message: "Invailed password" })

        // if the user already SignUp  

        let exit = await User.findOne({ email })
        if (exit) return res.status(409).json({ message: `${email} its already SignUp Please go and Login` })

        const hashPassword = await bcryptjs.hash(password, 10)

        // email verfistion

        let user = await User.create({ name, email, password: hashPassword, isAdmin })
        let token = signupToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmain: user.isAdmin
        })
        return res.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmain: user.isAdmin
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}


export const login = async (req, res) => {
    try {

        let { email, password } = req.body
        if (!email) return res.status(401).json({ message: "Invailed email" })
        if (!password) return res.status(401).json({ message: "Invailed password" })
        let user = await User.findOne({ email })

        if (!user) return res.status(400).json({ message: "Your are the new user Please  Signup" })

        let passwordMatch = await bcryptjs.compare(password, user.password)
        if (!passwordMatch) return res.status(401).json({ message: "Password Not Match" })

        let token = signupToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmain: user.isAdmin
        })
        res.status(200).json({
            token, user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmain: user.isAdmin
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}
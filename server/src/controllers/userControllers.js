import jwt from "jsonwebtoken"

import UserService from "../services/authService.js"
import AuthErrorHandler from "../utils/authErrorHandler.js"
import sendVerificationCode from "../services/emailService.js"

const userService = new UserService()

const signUp = async (req , res) => {
    try {
        const result = await userService.signUp(req.body)
        sendVerificationCode(req.body.email , result.verifyCode)

        res.status(201).json({
            success: true, 
            message: result.message,
            needsVerification: result.needsVerification
        })

        console.log("Success sign up: " , result)
    } catch (error) {
        AuthErrorHandler.signUpHandler(error , res)
    }
}

const verifyEmail = async (req , res) => {
    try {
        const result = await userService.verifyEmail(req.body)

        res.cookie("jwt" , result.access_token , {
            httpOnly: true,
            domain: 'localhost', 
            maxAge: 14 * 24 * 60 * 60 * 1000,
            path: '/'
        })
        res.status(201).json({
            success: true, 
            message: result.message,
        })

        console.log("Success verify: " , result)
    } catch (error) {
        AuthErrorHandler.verifyEmailHandler(error , res)
    }
}
export {
    signUp,
    verifyEmail
}
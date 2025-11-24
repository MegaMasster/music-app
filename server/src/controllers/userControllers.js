import jwt from "jsonwebtoken"

import UserService from "../services/authService.js"
import AuthErrorHandler from "../utils/authErrorHandler.js"

const userService = new UserService()

const signUp = async (req , res) => {
    try {
        const { user , token } = await userService.signUp(req.body)

        res.cookie("jwt" , token , {
            httpOnly: true,
            domain: 'localhost', 
            maxAge: 14 * 24 * 60 * 60 * 1000,
            path: '/'
        })
        res.status(201).json({
            success: true, 
            user: {
                id: user.id, 
                username: user.username,
                email: user.email
            }
        })
        console.log("Success sign up: " , user)
    } catch (error) {
        AuthErrorHandler.signUpHandler(error , res)
    }
}
export {
    signUp
}
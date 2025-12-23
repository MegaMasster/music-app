import jwt from "jsonwebtoken"

import UserService from "../services/authService.js"
import AuthErrorHandler from "../utils/authErrorHandler.js"
import sendVerificationCode from "../services/emailService.js"
import feedbackService from "../services/feedbackService.js"

const userService = new UserService()

const signUp = async (req , res) => {
    try {
        const { captchaToken } = req.body
        const RECAPTCHA_SECRET_KEY = process.env.GOOGLE_RECAPTCHA_SECRET_KEY

        if (!captchaToken) {
            return res.status(400).json({
                success: false,
                message: 'ReCAPTCHA token is missing.'
            })
        }

        const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify'

        const postData = new URLSearchParams()
        postData.append('secret', RECAPTCHA_SECRET_KEY);
        postData.append('response', captchaToken);

        const googleResponse = await fetch(verificationUrl, {
            method: 'POST',
            body: postData 
        })

        const responseData = await googleResponse.json()

        if (!responseData.success) {
            console.error('ReCAPTCHA verification failed:', responseData['error-codes'])
            return res.status(403).json({
                success: false,
                message: 'Верификация reCAPTCHA не пройдена. Пожалуйста, попробуйте еще раз.'
            })
        }

        const result = await userService.signUp(req.body)
        sendVerificationCode(req.body.email , result.verifyCode)
        res.status(201).json({
            success: true
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
            email: result.email
        })
        console.log("Success verify: " , result)
    } catch (error) {
        AuthErrorHandler.verifyEmailHandler(error , res)
    }
}

const signIn = async (req , res) => {
    try {
        const { captchaToken } = req.body
        const RECAPTCHA_SECRET_KEY = process.env.GOOGLE_RECAPTCHA_SECRET_KEY

        if (!captchaToken) {
            return res.status(400).json({
                success: false,
                message: 'ReCAPTCHA token is missing.'
            })
        }

        const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';

        const postData = new URLSearchParams();
        postData.append('secret', RECAPTCHA_SECRET_KEY);
        postData.append('response', captchaToken);

        const googleResponse = await fetch(verificationUrl, {
            method: 'POST',
            body: postData 
        })

        const responseData = await googleResponse.json()

        if (!responseData.success) {
            console.error('ReCAPTCHA verification failed:', responseData['error-codes'])
            return res.status(403).json({
                success: false,
                message: 'Верификация reCAPTCHA не пройдена. Пожалуйста, попробуйте еще раз.'
            })
        }

        const result = await userService.signIn(req.body)
        res.cookie("jwt" , result.access_token , {
            httpOnly: true,
            domain: 'localhost', 
            maxAge: 14 * 24 * 60 * 60 * 1000,
            path: '/'
        })
        res.status(201).json({
            success: true, 
            email: result.email
        })
        console.log("Success sign in: " , result)
    } catch (error) {
        AuthErrorHandler.signInHandler(error , res)
    }
}

const forgotPassword = async (req , res) => {
    try {
        const result = await userService.forgotPassword(req.body)
        res.status(201).json({
            success: true
        })
        console.log("Success forgot: " , result)
    } catch (error) {
        AuthErrorHandler.forgotPasswordHandler(error , res)
    }
}

const checkResetToken = async(req , res) => {
    try {
        const result = await userService.checkResetToken(req.body)
        res.status(201).json({
            success: true
        })
        console.log("Success CHECKING: " , result)
    } catch (error) {
        AuthErrorHandler.checkResetTokenHandler(error , res)
    }
}

const verifyTokenController = async (req, res) => {
    try {
        const token = req.cookies.jwt
        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'No token'
            })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json({
            success: true, 
            id: decoded.id,
            email: decoded.email
        })
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            })
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        })
    }
}

const resetPassword = async (req , res) => {
    try {
        console.log("Reset data: " , req.body)
        const result = await userService.resetPassword(req.body)
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        AuthErrorHandler.resetPasswordHandler(error , res)
    }
}

const feedback = async (req , res) => {
    try {
        console.log("Feedback data: " , req.body)
        await feedbackService(req.body)
        return res.status(200).json({
            success: true
        })
    } catch (error) {
       return res.status(500).json({
            success: false,
            message: "Iternal server error"
        })
    }
}

export {
    signUp,
    verifyEmail,
    signIn,
    forgotPassword,
    checkResetToken,
    verifyTokenController,
    resetPassword,
    feedback
}
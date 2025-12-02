import express from "express"
const router = express.Router()

import { 
    signUp , 
    verifyEmail , 
    signIn , 
    forgotPassword , 
    checkResetToken ,
    verifyTokenController , 
    resetPassword
} from "../controllers/userControllers.js"

router.post("/signup" , signUp)
router.post("/verify-email" , verifyEmail)
router.post("/signin" , signIn)
router.post("/forgot-password" , forgotPassword)
router.post("/check-reset-token" , checkResetToken)
router.patch("/reset-password" , resetPassword)

router.get("/verifyToken" , verifyTokenController)

export default router
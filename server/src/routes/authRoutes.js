import express from "express"
const router = express.Router()

import { 
    signUp , 
    verifyEmail , 
    signIn , 
    forgotPassword , 
    checkResetToken ,
    verifyTokenController , 
    resetPassword,
    feedback,
    logout
} from "../controllers/userControllers.js"

router.post("/signup" , signUp)
router.post("/verify-email" , verifyEmail)
router.post("/signin" , signIn)
router.post("/forgot-password" , forgotPassword)
router.post("/check-reset-token" , checkResetToken)
router.post("/feedback" , feedback)
router.post("/logout" , logout)

router.patch("/reset-password" , resetPassword)

router.get("/verifyToken" , verifyTokenController)

export default router
import express from "express"
const router = express.Router()

import { signUp , verifyEmail } from "../controllers/userControllers.js"

router.post("/signup" , signUp)
router.post("/verifyemail" , verifyEmail)

export default router
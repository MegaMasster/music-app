import express from "express"
const router = express.Router()

import { signUp } from "../controllers/userControllers"

router.post("/signup" , signUp)

export default router
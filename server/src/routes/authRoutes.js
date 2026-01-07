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

import { 
    createPlayList , 
    getUserPlaylists , 
    deletePlayList ,
    gerUserTracks ,
    removeTrack , 
    addTrackToPlayList
} from "../controllers/playListController.js"

router.post("/signup" , signUp)
router.post("/verify-email" , verifyEmail)
router.post("/signin" , signIn)
router.post("/forgot-password" , forgotPassword)
router.post("/check-reset-token" , checkResetToken)
router.post("/feedback" , feedback)
router.post("/logout" , logout)
router.post("/playlist" , createPlayList)
router.post("/playlist/addtrack" ,     addTrackToPlayList)

router.delete("/playlist/delete" , deletePlayList)
router.delete("/playlist/removetrack" , removeTrack)

router.patch("/reset-password" , resetPassword)

router.get("/verifyToken" , verifyTokenController)
router.get("/playlist" , getUserPlaylists)
router.get("/playlist/gettracks" , gerUserTracks)

export default router
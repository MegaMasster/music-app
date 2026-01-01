import jwt from "jsonwebtoken"

import PlayListService from "../services/main/playListService.js"

const playListService = new PlayListService()

const createPlayList = async (req , res) => {
    try {
        const { playlistName, image, trackId } = req.body

        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ message: "Вы не авторизованы (кука отсутствует)" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id

        const result = await playListService.createPlayList({
            userId,
            playlistName,
            image,
            trackId
        })
        console.log("Все создано" , result.id)

        res.status(201).json(result)

    } catch (error) {
        console.error("Ошибка в контроллере:", error)
        if (error.message === "LIMIT_REACHED") {
            return res.status(400).json({ message: "У вас уже есть плейлист. Можно создать только один." })
        }
    
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Неверный токен" })
        }
        
        res.status(500).json({ message: "Ошибка сервера при создании плейлиста" })
    }
}

const getUserPlaylists = async (req, res) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id

        const playlists = await playListService.getUserPlaylists(userId)

        res.status(200).json(playlists)
    } catch (error) {
        console.error("Ошибка в getUserPlaylists контроллере:", error)
        res.status(500).json({ message: "Ошибка сервера при получении плейлистов" })
    }
}

const deletePlayList = async (req , res) => {
    try {
        const { id } = req.body

        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id

        const result = await playListService.deletePlayList(userId , id)

        res.status(200).json(result)
    } catch(error) {
        console.error("Ошибка в deletePlayList контроллере:", error)
        res.status(500).json({ message: "Ошибка сервера при удалении" })
    }       
}

export {
    createPlayList,
    getUserPlaylists,
    deletePlayList
}
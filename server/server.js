import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"

import { checkDatabaseConnection } from "./src/databaseConnection/db-connect.js"
import router from "./src/routes/authRoutes.js"

dotenv.config()
const app = express()
const PORT = process.env.SERVER_PORT || 5000

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST" , "PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth" , router)

const startServer = async () => {
    try {
        const dbConnect = await checkDatabaseConnection()
        if (dbConnect) {
            app.listen(PORT , () => {
                console.log(`Server started on http://localhost:${PORT}`)
            })
        } else {
            process.exit(1)
        }
    } catch (error) {
        console.error("Failed to start server:", error)
        process.exit(1)
    }
}
startServer()
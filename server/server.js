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
    origin: "https://aurorasounds.onrender.com",
    methods: ["GET", "POST" , "PATCH" , "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cookieParser())

app.use("/api/auth" , router)

const startServer = async () => {
    try {
        const dbConnect = await checkDatabaseConnection()
        if (dbConnect) {
            app.listen(PORT , () => {
                console.log(`Server started!!!`)
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
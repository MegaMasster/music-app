import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 5000,
    ssl: {
        rejectUnauthorized: false 
    }
})

pool.on("error" , (error) => {
    console.error('Database pool error:', error)
})

const checkDatabaseConnection = async () => {
    try {
        const result = await pool.query("SELECT NOW() as current_time")
        console.log('Database connection successful:', result.rows[0].current_time)
        return true
    } catch (error) {
        console.error('Database connection failed:', error.message)
        return false
    }
}
export {
    checkDatabaseConnection,
    pool
}
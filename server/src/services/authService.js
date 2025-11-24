import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import RequestValidation from "../utils/requestValidation.js"
import { pool } from "../databaseConnection/db-connect.js"

class UserService {

    async isUserExist(email) {
        const { rows } = await pool.query(
            `SELECT * FROM users WHERE email = $1` ,
            [email]
        )
        return rows.length > 0
    }

    async signUp(userData) {
        try {
            const { username , email , password } = userData

            RequestValidation.signUpValidation(userData)

            const userExists = await this.isUserExist(email)
            if (userExists) {
                throw new Error("User with this email already exists")
            }

            const hashedPassword = await bcrypt.hash(password , 14)

            const { rows } = await pool.query(
                `INSERT INTO users (username , email , password)
                VALUES ($1 , $2 , $3) RETURNING id , username , email`,
                [username , email , hashedPassword]
            )

            const user = rows[0]
            const token = await this.generateToken(user)

            return { user , token } 
        } catch(error){
            console.error("SignUp error:", error)
            throw error
        }
    }

    async generateToken(user) {
       try {
            const payload = {
                id: user.id,
                email: user.email
            }

            const options = {
                expiresIn: process.env.JWT_EXPIRES_IN || '7d',  
                algorithm: process.env.JWT_ALGORITHM || 'HS256', 
            }

            if (process.env.JWT_ISSUER) {
                options.issuer = process.env.JWT_ISSUER
            }
            
            if (process.env.JWT_AUDIENCE) {
                options.audience = process.env.JWT_AUDIENCE
            }

            return jwt.sign(payload, process.env.JWT_SECRET, options)
        } catch (error) {
            console.error("JWT error:", error)
            throw new Error(`Error generating token: ${error.message}`)
        }
    }

}
export default UserService
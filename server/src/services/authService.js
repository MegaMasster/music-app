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

    async cleanExpiredUser(email) {
        await pool.query(
            `DELETE FROM pending_users 
            WHERE email = $1 AND expires_at < NOW()`,
            [email]
        )
    }   

    async signUp(userData) {
        try {
            const { email , password } = userData
            RequestValidation.signUpValidation(userData)

            const userExists = await this.isUserExist(email)
            if (userExists) {
                throw new Error("User with this email already exists")
            }

            const hashedPassword = await bcrypt.hash(password , 12)
            const verifyCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000

            await pool.query(
                `INSERT INTO pending_users (email , password , verify_code , expires_at)
                    VALUES ($1 , $2 , $3 , $4) 
                    ON CONFLICT (email) 
                    DO UPDATE SET 
                        password = EXCLUDED.password,
                        verify_code = EXCLUDED.verify_code,
                        expires_at = EXCLUDED.expires_at`,
                [email , hashedPassword , verifyCode , new Date(Date.now() + 15 * 60 * 1000)]
            )

            return { 
                success: true,
                needsVerification: true,
                verifyCode: verifyCode,
                message: "Verification code sent to email." 
            }
        } catch(error){
            console.error("SignUp error:", error)
            throw error
        }
    }


    async verifyEmail(data) {
        try {
            const {email , code} = data
            RequestValidation.verifyCodeValidation(data)

            const { rows } = await pool.query(`SELECT * FROM pending_users 
                WHERE email = $1 and verify_code = $2` ,
            [email , code])

            const pendingUser = rows[0]

            if(new Date() > new Date(pendingUser.expires_at)) {
                await this.cleanExpiredUser(email)
                throw new Error("The code has expired.")
            }

            await pool.query(`INSERT INTO users (email , password) VALUES ($1 , $2)` ,
                [pendingUser.email , pendingUser.password]
            )

            await this.cleanExpiredUser(email)

            const user = { id: pendingUser.id, email: pendingUser.email }
            const token = await this.generateToken(user)
            return {
                success: true,
                access_token: token,
                message: "Account verified."
            }
        } catch (error) {
            console.error("Verify error:", error)
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
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import crypto from "crypto"

import RequestValidation from "../utils/requestValidation.js"
import { pool } from "../databaseConnection/db-connect.js"
import sendPasswordResetLink from "../services/tokenService.js"

class UserService {

    async isUserExist(email) {
        const { rows } = await pool.query(
            `SELECT id, email, password FROM users WHERE email = $1` ,
            [email]
        )
        return rows.length > 0 ? {
            exists: true,
            user: rows[0]
        } : { exists: false }
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
            if (userExists.exists) {
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
                verifyCode: verifyCode,
            }
        } catch(error){
            throw error
        }
    }


    async verifyEmail(data) {
        try {
            console.log('Verify email data:', data)
            const {email , code} = data

            RequestValidation.verifyCodeValidation(data)

            const { rows } = await pool.query(
                `SELECT * FROM pending_users 
                WHERE email = $1 and verify_code = $2` ,
            [email , code])

            if (!rows[0]) {
                throw new Error("Invalid code")
            }

            if(new Date() > new Date(rows[0].expires_at)) {
                await this.cleanExpiredUser(email)
                throw new Error("The code has expired")
            }

            const { rows: userRows } = await pool.query(
                `INSERT INTO users (email , password) VALUES ($1 , $2) RETURNING id, email` ,
                [rows[0].email , rows[0].password]
            )

            const newUser = userRows[0]

            await pool.query(
                `DELETE FROM pending_users WHERE email = $1`,
                [email]
            )

            const user = { id: newUser.id, email: newUser.email }
            const token = await this.generateToken(user)

            return {
                success: true,
                access_token: token,
                email: newUser.email,
                id: newUser.id
            }
        } catch (error) {
            console.error("Verify error:", error)
            throw error
        }
    }

    async signIn(userData) {
        try {
            console.log("Sign in data: " , userData)
            const {email , password} = userData

            RequestValidation.signInValidation(userData)

            const result = await this.isUserExist(email)

            if (!result.exists) {
                throw new Error("User not found")
            }

            const passwordValid = await bcrypt.compare(password , result.user.password)
            if (!passwordValid) {
                throw new Error("Invalid password")
            }

            const user = {id: result.user.id, email: result.user.email}
            const token = await this.generateToken(user)

            return {
                success: true,
                access_token: token,
                email: result.user.email
            }
        } catch (error) {
            console.log("Sign in error: " , error)
            throw error
        }
    }

    async forgotPassword(userData) {
        try {
            console.log("Forgot data: " , userData)
            const { email } = userData

            RequestValidation.forgotPasswordValidation(userData)

            const result = await this.isUserExist(email)

            if (!result.exists) {
                throw new Error("User not found")
            }

            const resetToken = crypto.randomBytes(32).toString('hex')

            await pool.query(
                `INSERT INTO password_reset_tokens (user_id, token, expires_at)
                    VALUES ($1, $2, NOW() + INTERVAL '15 minutes')
                    ON CONFLICT (user_id) 
                    DO UPDATE SET 
                        token = EXCLUDED.token,
                        expires_at = EXCLUDED.expires_at,
                        created_at = NOW()`,
                [result.user.id, resetToken]
            )

            await sendPasswordResetLink(email , resetToken)

            return {
                success: true,
                email: email
            }
        } catch(error) {
            console.log("Forgot error: " , error)
            throw error
        }
    }

    async checkResetToken(data) {
        try {
            const { token } = data
            const { rows } = await pool.query(
                `SELECT token, expires_at 
                FROM password_reset_tokens 
                WHERE token = $1 
                AND expires_at > NOW()`,
                [token]
            )

            if (!rows[0]) {
                throw new Error("Invalid or expired link")
            }

            return {
                success: true
            }
        } catch (error) {
            console.log("check token error: " , error)
            throw error
        }
    }

    async resetPassword(userData) {
        try {
            const {email , new_password} = userData

            RequestValidation.resetPasswordValidation(userData)

            const result = await this.isUserExist(email)
            if (!result.exists) {
                throw new Error("User not found")
            }  
            
            const hashedPassword = await bcrypt.hash(new_password , 12)
            await pool.query(`
                UPDATE users SET password = $1 WHERE id = $2`, 
                [hashedPassword , result.user.id]
            )
            console.log("Success reset pass: " , result)
            return{
                success: true
            }
        } catch (error) {
            console.log("Reset password error: " , error)
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
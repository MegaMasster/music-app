import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    pool: true, 
    maxConnections: 5, 
    maxMessages: 100,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendPasswordResetLink = async (email , resetToken) => {
    try {
        const resetLink = `http://localhost:5173/reset-password/${resetToken}`

        transporter.sendMail({
            from: `"Aurora Music" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Reset Your Password - Aurora Music',
            html: `
                <h3><strong>Reset your Aurora Music password:</strong></h3>
                <p>
                    <a href="${resetLink}" style="color: #2563eb;">
                        ${resetLink}
                    </a>
                </p>
                <p>Link expires in 15 minutes</p>
            `,
            timeout: 5000
        })
        return {
            success: true
        }
    } catch (error) {
        console.error('Ошибка отправки email:', error)
        throw new Error('Не удалось отправить код')
    }
}
export default sendPasswordResetLink
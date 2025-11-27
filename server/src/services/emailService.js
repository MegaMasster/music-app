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

const sendVerificationCode = (email , code) => {
    try {
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Код подтверждения',
            html: `
                <h2>Ваш код подтверждения</h2>
                <h1 style="font-size: 32px; color: #2563eb;">${code}</h1>
                <p>Код действителен 15 минут</p>
            `,
            timeout: 5000
        })
    } catch (error) {
        console.error('Ошибка отправки email:', error)
        throw new Error('Не удалось отправить код')
    }
}
export default sendVerificationCode
import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

const sendVerificationCode = async (email, code) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Aurora Music <onboarding@resend.dev>',
            to: email,
            subject: 'Verification code',
            html: `
                <div style="font-family: sans-serif; text-align: center;">
                    <h2>Your verification code</h2>
                    <h1 style="font-size: 32px; color: #2563eb; letter-spacing: 5px;">${code}</h1>
                    <p>Code is valid for 15 minutes</p>
                </div>
            `,
        });

        if (error) {
            console.error('Ошибка Resend:', error)
            throw new Error('Не удалось отправить код')
        }

        console.log('Код успешно отправлен:', data.id)
        return data

    } catch (error) {
        console.error('Критическая ошибка отправки email:', error)
        throw new Error('Не удалось отправить код')
    }
}

export default sendVerificationCode
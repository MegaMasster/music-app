import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

const feedbackService = async (data) => {
    try {
        const { userEmail, problemText } = data

        if (!userEmail || !problemText) {
            throw new Error("The fields are filled in incorrectly")
        }

        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: process.env.EMAIL_USER,   
            subject: `Feedback from ${userEmail}`,
            replyTo: userEmail,           
            text: `Message from: ${userEmail}\n\nBug :\n${problemText}`,
            html: `
                <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px;">
                    <p><strong>Sender:</strong> ${userEmail}</p>
                    <p><strong>Text:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                        ${problemText}
                    </div>
                </div>
            `
        }

        const info = await transporter.sendMail(mailOptions)
        console.log(`Feedback sent from ${userEmail}`)
        return info
        
    } catch (error) {
        console.error("feedback error: ", error)
        throw error
    }
}
export default feedbackService
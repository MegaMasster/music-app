import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

const feedbackService = async (data) => {
    try {
        const { userEmail, problemText } = data

        if (!userEmail || !problemText) {
            throw new Error("The fields are filled in incorrectly")
        }

        const { data: response, error } = await resend.emails.send({
            from: 'Feedback <onboarding@resend.dev>', 
            to: 'aurora.sounds01@gmail.com',   
            subject: `Feedback from ${userEmail}`,
            reply_to: userEmail,         
            html: `
                <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px;">
                    <p><strong>Sender:</strong> ${userEmail}</p>
                    <p><strong>Text:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                        ${problemText}
                    </div>
                </div>
            `
        })

        if (error) {
            console.error("Resend feedback error:", error)
            throw error
        }

        console.log(`Feedback sent from ${userEmail}`)
        return response
        
    } catch (error) {
        console.error("feedback service error: ", error)
        throw error
    }
}

export default feedbackService
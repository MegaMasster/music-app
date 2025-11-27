class AuthErrorHandler {

    static signUpHandler(error , res) {
        const errorMessage = error.message
        if (
            errorMessage.includes("Invalid username format") 
            || errorMessage.includes("Email and password are required")
            || errorMessage.includes("Invalid email format")
        ) {
            return res.status(400).json({
                success: false,
                message: errorMessage
            })
        }
        if (errorMessage.includes("User with this email already exists")) {
            return res.status(409).json({
                success: false,
                message: errorMessage
            })
        }
        console.error("Unhandled signup error:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

    static verifyEmailHandler(error , res) {
        const errorMessage = error.message
        if (errorMessage.includes("Code are required") 
            || errorMessage.includes("Email error, sign up again please.") 
            || errorMessage.includes("Invalid code")
            || errorMessage.includes("Invalid email format")) {
            return res.status(400).json({
                success: false,
                message: errorMessage
            })
        }
        if (errorMessage.includes("The code has expired.")) {
            return res.status(403).json({
                success: false,
                message: errorMessage
            })
        }
        console.error("Unhandled verify error:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}
export default AuthErrorHandler
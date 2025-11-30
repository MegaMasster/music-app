class AuthErrorHandler {

    static signUpHandler(error , res) {
        const errorMessage = error.message
        if (errorMessage.includes("Invalid username format") 
            || errorMessage.includes("Email and password are required")
            || errorMessage.includes("Invalid email format")) {
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
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

    static verifyEmailHandler(error , res) {
        const errorMessage = error.message
        if (errorMessage.includes("Code are required") 
            || errorMessage.includes("Email error, sign up again please") 
            || errorMessage.includes("Invalid code")
            || errorMessage.includes("Invalid email format")) {
            return res.status(400).json({
                success: false,
                message: errorMessage
            })
        }
        if (errorMessage.includes("The code has expired")) {
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

    static signInHandler(error , res) {
        const errorMessage = error.message
        if (errorMessage.includes("Email must be filled in") 
            || errorMessage.includes("Invalid password") 
            || errorMessage.includes("Invalid email format")
            || errorMessage.includes("User not found")) {
            return res.status(400).json({
                success: false,
                message: errorMessage
            })
        }
    }

}
export default AuthErrorHandler
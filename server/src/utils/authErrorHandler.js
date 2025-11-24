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
                error: errorMessage
            })
        }

        if (errorMessage.includes("User with this email already exists")) {
            return res.status(409).json({
                success: false,
                error: errorMessage
            })
        }

        console.error("Unhandled signup error:", error)
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }

}
export default AuthErrorHandler
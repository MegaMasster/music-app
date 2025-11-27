class RequestValidation {

    static signUpValidation(userData) {
        const { email, password } = userData

        // if (username.length < 3) {
        //     throw new Error("Invalid username format")
        // }
        if (!email || !password) {
            throw new Error("Email and password are required")
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format")
        }
        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters")
        }
    }

    static verifyCodeValidation(data) {
        const {email , code} = data
        if (!code) {
            throw new Error("Code are required")
        }
        if (!email) {
            throw new Error("Email error, sign up again please.")
        }
        if (code.length < 6) {
            throw new Error("Invalid code")
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format")
        }
    }

}
export default RequestValidation
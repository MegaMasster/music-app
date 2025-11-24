class RequestValidation {

    static signUpValidation(userData) {
        const { username, email, password } = userData

        if (username.length < 3) {
            throw new Error("Invalid username format")
        }
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

}
export default RequestValidation
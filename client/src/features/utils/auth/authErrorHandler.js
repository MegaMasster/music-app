class AuthErrorHandler {

    static handlerSignUpError (error) {
        if (error.status === 409) {
            return "The user already exists. Please log in."
        } else if (error.status === 408) {
            return "Server is busy, please try again later."
        } else if (error.status === 400) {
            return error.message
        } else {
            return "Server error. Try again later."
        }
    }

    static handlerVerifyEmailError (error) {
        if (error.status === 400) {
            return error.message
        } else if (error.status === 408) {
            return "Server is busy, please try again later."
        } else if (error.status === 403) {
            return "The code has expired."
        } else {
            return "Server error. Try again later."
        }
    }

    static handlerSignInError (error) {
        if (error.status === 400) {
            return error.message
        } else if (error.status === 408) {
            return "Server is busy, please try again later."
        } else {
            return "Server error. Try again later."
        }
    }

    static handleForgotPasswordError (error) {
        if (error.status === 400) {
            return error.message
        } else if (error.status === 408) {
            return "Server is busy, please try again later."
        } else {
            return "Server error. Try again later."
        }
    }

    static handleCheckResetToken (error) {
        if (error.status === 400) {
            return error.message
        } else if (error.status === 408) {
            return "Server is busy, please try again later."
        } else {
            return "Server error. Try again later."
        }
    }

    static handleResetPassword (error) {
        if (error.status === 400) {
            return error.message
        } else if (error.status === 408) {
            return "Server is busy, please try again later."
        } else {
            return "Server error. Try again later."
        }
    }
}
export default AuthErrorHandler
interface ErrorType {
    status: number | string,
    message: string
}

class AuthErrorHandler {

    static handlerSignUpError (error: ErrorType) {
        if (error.status === 409) {
            return "The user already exists. Please log in."
        } else if (error.status === 408) {
            return "Server is busy, please try again later."
        } else if (error.status === 400) {
            return error.message
        } else if (error.status === 403) {
            return "Suspicious activity detected. Please refresh the page and enter the captcha again."
        } else {
            return "Server error. Try again later."
        }
    }

    static handlerVerifyEmailError (error: ErrorType) {
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

    static handlerSignInError (error: ErrorType) {
        if (error.status === 400) {
            return error.message
        } else if (error.status === 408) {
            return "Server is busy, please try again later."
        } else if (error.status === 403) {
            return "Suspicious activity detected. Please refresh the page and enter the captcha again."
        } else {
            return "Server error. Try again later."
        }
    }

    static handleForgotPasswordError (error: ErrorType) {
        if (error.status === 400) {
            return error.message
        } else if (error.status === 408) {
            return "Server is busy, please try again later."
        } else {
            return "Server error. Try again later."
        }
    }

    static handleCheckResetToken (error: ErrorType) {
        if (error.status === 400) {
            return error.message
        } else if (error.status === 408) {
            return "Server is busy, please try again later."
        } else {
            return "Server error. Try again later."
        }
    }

    static handleResetPassword (error: ErrorType) {
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
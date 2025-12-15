class MainErrorHandler {

    static handleSearchMusics (error) {
        if (error.status === 400) {
            return error.message
        } else if (error.status === 408) {
            return "Server is busy, please try again later."
        } else {
            return "Server error. Try again later."
        }
    }
    
}
export default MainErrorHandler
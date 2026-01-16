class MainErrorHandler {

    static handleSearchMusics (error) {
        if (error.status === 400) {
            return error.message
        } else if (error.status === 403) {
            return "Spotify API access is likely restricted in your region. Please use a VPN."
        } else if (error.status === 401 || error.status === 400) {
            return "Try refreshing the page several times or re-visiting the site."
        }else if (error.status === 408) {
            return "Server is busy, please reload the page."
        } else {
            return "Server error. Try again later."
        }
    }
    
}
export default MainErrorHandler
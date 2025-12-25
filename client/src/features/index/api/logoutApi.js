import { MAIN_ENDPOINTS } from "./mainEndpoints"
const BASE_URL = import.meta.env.VITE_API_URL

const logout = async (tokenData) => {

    const url = `${BASE_URL}${MAIN_ENDPOINTS.LOGOUT}`

    const controller = new AbortController()
    const timer = setTimeout(() => {
        controller.abort()
    } , 8000)

    try {
        const response = await fetch(url , {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type" : "application/json"},
            signal: controller.signal
        })  

        clearTimeout(timer)

        if (!response.ok) {
            const errorData = await response.json()
            const error = new Error(errorData.message)
            error.status = response.status
            throw error
        }

        const successData = await response.json()
        return {
            success: true
        }

    } catch (error) {
        clearTimeout(timer)

        if (error.name === "AbortError") {
            return {
                success: false,
                message: "Request timeout",
                status: 408
            }
        }

        return {
            success: false,
            status: error.status || 500,
            message: error.message
        }
    }
}
export default logout
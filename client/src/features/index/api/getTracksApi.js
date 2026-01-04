import { MAIN_ENDPOINTS } from "./mainEndpoints"
const BASE_URL = import.meta.env.VITE_API_URL

const getTracks = async (playListId) => {

    const url = `${BASE_URL}${MAIN_ENDPOINTS.GETTRACKS}?playlistId=${playListId}`

    const controller = new AbortController()
    const timer = setTimeout(() => {
        controller.abort()
    } , 8000)

    try {
        const response = await fetch(url , {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            credentials: "include",
            signal: controller.signal
        })

        clearTimeout(timer)

        if (!response.ok) {
            const errorData = await response.json()
            const error = new Error(errorData.message || "Server error")
            error.status = response.status
            throw error
        }

        const successData = await response.json()
        return {
            success: true,
            data: successData
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
export default getTracks
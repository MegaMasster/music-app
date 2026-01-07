import { MAIN_ENDPOINTS } from "./mainEndpoints"
const BASE_URL = import.meta.env.VITE_API_URL

const addTrackToPlayList = async (playlistId , trackId) => {

    const url = `${BASE_URL}${MAIN_ENDPOINTS.ADDTRACK}`

    const controller = new AbortController()
    const timer = setTimeout(() => {
        controller.abort()
    } , 8000)

    try {
        const response = await fetch(url , {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({playlistId: playlistId , trackId: trackId}),
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
export default addTrackToPlayList
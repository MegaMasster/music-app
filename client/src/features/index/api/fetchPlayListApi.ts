import { MAIN_ENDPOINTS } from "./mainEndpoints"
const BASE_URL = import.meta.env.VITE_API_URL

interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    status?: number
}

const fetchPlayList = async <T>(): Promise<ApiResponse<T>> => {

    const url = `${BASE_URL}${MAIN_ENDPOINTS.PLAYLIST}`

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
            const error = new Error(errorData.message || "Server error") as any
            error.status = response.status
            throw error
        }

        const successData = await response.json() as T
        return {
            success: true,
            data: successData
        }

    } catch (error) {
        clearTimeout(timer)

        if (error instanceof Error) {
            if (error.name === "AbortError") {
                return {
                    success: false,
                    message: "Request timeout",
                    status: 408
                }
            }

            return {
                success: false,
                status: (error as any).status || 500,
                message: error.message
            }
        } else {
            return {
                success: false,
                message: "Unknown error"
            }
        }
    }
}
export default fetchPlayList
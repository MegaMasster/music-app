import { MAIN_ENDPOINTS } from "./mainEndpoints"
const BASE_URL = import.meta.env.VITE_API_URL

interface FeedbackData {
    userEmail: string
    problemText: string
}

interface ApiResponse {
    success: boolean
    message?: string
    status?: number
}

const feedbackApi = async (feedbackData: FeedbackData): Promise<ApiResponse> => {

    const url = `${BASE_URL}${MAIN_ENDPOINTS.FEEDBACK}`

    const controller = new AbortController()
    const timer = setTimeout(() => {
        controller.abort()
    } , 8000)

    try {
        const response = await fetch(url , {
            method: "POST" , 
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(feedbackData),
            signal: controller.signal
        })

        clearTimeout(timer)

        if (!response.ok) {
            const errorData = await response.json()
            const error = new Error(errorData.message || "Server error") as any
            error.status = response.status
            throw error
        }

        const successData = await response.json() as ApiResponse
        return {
            success: true
        }

    } catch (error: unknown) {
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
export default feedbackApi
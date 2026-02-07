import useIndexStore from "../../../../shared/stores/useIndexStore"

interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    status?: number
}

const loadTracks = async <T>(allIds: string | undefined): Promise<ApiResponse<T>> => {

    const { spotifyAccessToken } = useIndexStore.getState()

    const controller = new AbortController()
    const timer = setTimeout(() => {
        controller.abort()
    } , 8000)

    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${allIds}` , {
            method: "GET",
            headers: {"Authorization" : `Bearer ${spotifyAccessToken}`},
            signal: controller.signal
        })

        clearTimeout(timer)

        if (!response.ok) {
            const errorData = await response.json()
            const error = new Error(errorData.message || "Server error") as any
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
export default loadTracks
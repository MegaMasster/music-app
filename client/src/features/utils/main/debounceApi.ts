import useIndexStore from "../../../shared/stores/useIndexStore"

interface ApiResponse<T> {
    success: boolean;
    data?: T; 
    status?: number | string;
    error?: string;
}

const debouceApi = async <T>(spotifyAccessToken: string |  null, apiPath: string): Promise<ApiResponse<T>> => {
    const controller = new AbortController()
    const timer = setTimeout(() => {
        controller.abort()
    } , 8000)

    try {
        const response = await fetch(`https://api.spotify.com${apiPath}&type=track&limit=18` , {
            method: "GET" ,
            headers: {"Authorization": "Bearer " + spotifyAccessToken},
            signal: controller.signal
        })

        clearTimeout(timer)

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                useIndexStore.getState().clearSpotifyAccessToken()
            }
        }

        if (!response.ok) {
            const errorData = await response.json()
            const error = new Error(errorData || "Server error.") as any
            error.status = response.status
            throw error
        }

        const successData = await response.json() as T
        return {
            success: true,
            data: successData
        }

    } catch (error: unknown) {
        clearTimeout(timer)

        if (error instanceof Error) {
            if (error.name === "AbortError") {
                return {
                    success: false,
                    status: 408
                }
            }

            return {
                success: false,
                status: (error as any).status || 500
            }
        } else {
            return { success: false, error: "Unknown error" }
        }
    }
}
export default debouceApi
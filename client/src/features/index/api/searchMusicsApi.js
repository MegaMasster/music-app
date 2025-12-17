import useIndexStore from "../../../shared/stores/useIndexStore"; 

const searchMusic = async (spotifyAccessToken , query) => {

    const controller = new AbortController()
    const timer = setTimeout(() => {
        controller.abort()
    } , 8000)

    try {
        const searchUrl = new URL('https://api.spotify.com/v1/search')
        searchUrl.searchParams.append('q', query)
        searchUrl.searchParams.append('type', 'track')
        searchUrl.searchParams.append('limit', '18')

        const response = await fetch(searchUrl.toString() , {
            method: "GET" , 
            headers: {
                "Authorization": "Bearer " + spotifyAccessToken
            },
            signal: controller.signal
        })

        clearTimeout(timer)

        if(!response.ok) {
            if (response.status === 401 || response.status === 403) {
                useIndexStore.getState().clearSpotifyAccessToken(); 
            }
        }

        if(!response.ok) {
            const errorData = await response.json()
            const error = new Error(errorData.message || "Server error")
            error.status = response.status
            throw error
        }

        const successData = await response.json()

        return {
            success: true,
            data: successData.tracks.items
        }
    } catch(error) {
        clearTimeout(timer)

        if (error.name === "AbortError") {
            return {
                success: false,
                status: 408
            }
        }

        return {
            success: false,
            status: error.status || 500
        }
    }
}
export default searchMusic
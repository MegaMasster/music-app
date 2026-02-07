import getTracks from "../../index/api/getTracksApi"
import useTracksListPopupStore  , { TracksListPopupAllTracks } from "../../../shared/stores/useTracksListPopupStore"
import useAuthStore from "../../../shared/stores/useAuthStore"
import loadTracks from "../../index/api/spotifyApi/loadTracksApi"  

interface GetTracksResponse {
    tracks: string[]
}

interface LoadTracksResult {
    tracks: string[]
}

const getTracksService = async (playlistId: string) => {

    const {
        setServerError
    } = useAuthStore.getState()

    const {
        setInfo,
        resetInfo,
        setIds,
        setAllTracks,
        setTracksLoading
    } = useTracksListPopupStore.getState()
    
    try {
        resetInfo()
        setTracksLoading(true)
        const result = await getTracks<GetTracksResponse>(playlistId)
        if (result.success) {
            if (result.data?.tracks.length == 0) {
                console.log(result.data)
                console.log("трэков нет")
                setInfo("Your playlist is clear")
            } else {
                console.log(result.data)
                const allIds = result.data?.tracks.join(",")
                console.log(allIds)
                setIds(allIds ?? null)

                const loadTracksResult = await loadTracks<LoadTracksResult>(allIds)
                if (loadTracksResult.success) {
                   const tracksFromApi = loadTracksResult.data?.tracks ?? [];
    
                    const formattedTracks: TracksListPopupAllTracks[] = tracksFromApi.map(id => ({
                        trackId: id,
                        trackName: null,
                        trackArtistName: null,
                        imgUrl: null
                    }))

                    setAllTracks(formattedTracks)
                    console.log(loadTracksResult.data)
                } else {
                    if (loadTracksResult.status === 401) {
                        setServerError("Refresh the site about 5 times")
                    } else if (loadTracksResult.status === 403) {
                        setServerError("Please use VPN")
                    } else {
                        setServerError("Server error, try again later")
                    }
                }
            }
        } else {
            console.log("пизда")
            console.log(result.status)
            console.log(result.message)
            setServerError("Server error")
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            setServerError(error.message)
        } else {
            setServerError("Unknown error")
        }
    } finally {
        setTracksLoading(false)
    }
}
export default getTracksService
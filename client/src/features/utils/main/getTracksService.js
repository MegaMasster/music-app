import getTracks from "../../index/api/getTracksApi"
import useTracksListPopupStore from "../../../shared/stores/useTracksListPopupStore"
import useAuthStore from "../../../shared/stores/useAuthStore"
import loadTracks from "../../index/api/loadTracksApi"

const getTracksService = async (playlistId) => {

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
        const result = await getTracks(playlistId)
        if (result.success) {
            if (result.data.tracks.length == 0) {
                console.log(result.data)
                console.log("трэков нет")
                setInfo("Your playlist is clear")
            } else {
                console.log(result.data)
                const allIds = result.data.tracks.join(",")
                console.log(allIds)
                setIds(allIds)

                const loadTracksResult = await loadTracks(allIds)
                if (loadTracksResult.success) {
                    setAllTracks(loadTracksResult.data.tracks)
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
    } catch (error) {
        console.log("Fuck err: " , error)
        setServerError("Err " , error)
    } finally {
        setTracksLoading(false)
    }
}
export default getTracksService
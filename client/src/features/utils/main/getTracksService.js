import getTracks from "../../index/api/getTracksApi"
import useTracksListPopupStore from "../../../shared/stores/useTracksListPopupStore"
import useAuthStore from "../../../shared/stores/useAuthStore"


const getTracksService = async (playlistId) => {

    const {
        setLoading,
        setServerError
    } = useAuthStore.getState()

    const {
        setInfo,
        resetInfo
    } = useTracksListPopupStore.getState()


    // src={track.album.images[0]?.url} 
    // alt={track.name}\
    // {track.artists[0]?.name}
    
    try {
        resetInfo()
        setLoading(true)
        const result = await getTracks(playlistId)
        if (result.success) {
            if (result.data.tracks.length == 0) {
                console.log(result.data)
                console.log("трэков нет")
                setInfo("Your playlist is clear")
            } else {
                console.log(result.data)
                // ставим с втор данные ебашим их в компонент
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
        setLoading(false)
    }
}
export default getTracksService
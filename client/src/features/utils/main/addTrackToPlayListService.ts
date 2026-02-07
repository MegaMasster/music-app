import addTrackToPlayList from "../../index/api/addTrackToPlayListApi"
import useTracksListPopupStore from "../../../shared/stores/useTracksListPopupStore"
import useAuthStore from "../../../shared/stores/useAuthStore"

interface AddTrackToPlayListResponse {
    id: string
}

const addTrackToPlayListService = async (playListId: string , trackId: string) => {

    const {
        setServerError
    } = useAuthStore.getState()

    const {
        addTrackToList,
        addId
    } = useTracksListPopupStore.getState()

    try {
        const result = await addTrackToPlayList<AddTrackToPlayListResponse>(playListId , trackId)
        if (result.success) {
            addId(trackId)
            addTrackToList({
                trackId: trackId
            })
        } else {
            setServerError("Server error, try again later")
            console.log("FUCK: " , result)
        }
    } catch(error) {
        setServerError("Server error, try again later")
        console.log("FUCK: " , error)
    }
}
export default addTrackToPlayListService
import addTrackToPlayListApi from "../../index/api/addTrackToPlayListApi"
import useTracksListPopupStore from "../../../shared/stores/useTracksListPopupStore"
import useAuthStore from "../../../shared/stores/useAuthStore"

const addTrackToPlayListService = async (playListId , trackId) => {

    const {
        setServerError
    } = useAuthStore.getState()

    const {
        addTrackToList,
        addId
    } = useTracksListPopupStore.getState()

    try {
        const result = await addTrackToPlayListApi(playListId , trackId)
        if (result.success) {
            addId(trackId)
            addTrackToList(trackId)
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
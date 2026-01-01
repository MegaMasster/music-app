import { create } from "zustand"

const useTracksListPopupStore = create((set) => ({
    isTracksListPopupOpen: false,
    isPlayListDeleted: false,

    setIsTracksListPopupOpen: (isOpen) => set({isTracksListPopupOpen: isOpen}),
    setIsPlayListDeleted: (isDeleted) => set({isPlayListDeleted: isDeleted})
}))
export default useTracksListPopupStore
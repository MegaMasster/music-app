import { create } from "zustand"

const useTracksListPopupStore = create((set) => ({
    isTracksListPopupOpen: false,
    isPlayListDeleted: false,
    info: null,
    isPlayListClear: false,

    // data
    trackImg: null ,
    trackName: null ,
    trackArtistName: null,
    // 

    setIsTracksListPopupOpen: (isOpen) => set({isTracksListPopupOpen: isOpen}),
    setIsPlayListDeleted: (isDeleted) => set({isPlayListDeleted: isDeleted}),

    setInfo: (info) => set({info: info , isPlayListClear: true}),
    resetInfo: () => set({info: null , isPlayListClear: false}),

    // data
    setTrackImg: (img) => set({trackImg: img}),
    setTrackName: (name) => set({trackName: name}),
    setTrackArtistName: (artistName) => set({trackArtistName: artistName}),
    // 

}))
export default useTracksListPopupStore
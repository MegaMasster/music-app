import { create } from "zustand"
import { devtools } from "zustand/middleware"

// уже не помню
export interface TracksListPopupAllTracks {
    imgUrl?: string | null
    trackName?: string | null
    trackArtistName?: string | null
    trackId: string | null
    id?: string
}

interface TracksListPopupStates {
    isTracksListPopupOpen: boolean
    isPlayListDeleted: boolean
    info: string | null
    tracksLoading: boolean

    // data
    trackImg: string | null 
    trackName: string | null 
    trackArtistName: string | null 
    ids: string | null
    allTracks: TracksListPopupAllTracks[]
    // 
}

interface TracksListPopupActions {
    setIsTracksListPopupOpen: (isOpen: boolean) => void,
    setIsPlayListDeleted: (isDeleted: boolean)  => void, 
    setInfo: (info: string | null) => void,
    resetInfo: () => void,
    setTracksLoading: (loadingState: boolean) => void,
    setTrackImg: (img: string | null) => void,
    setTrackName: (name: string | null) => void,
    setTrackArtistName: (artistName: string | null) => void,
    setIds: (tracksId: string | null) => void,
    setAllTracks: (tracksArray: TracksListPopupAllTracks[]) => void,
    removeId: (idToRemove: string) => void,
    removeTrackFromList: (trackId: string) => void,
    addTrackToList: (newTrack: TracksListPopupAllTracks) => void,
    addId: (id: string) => void
}

type TracksListPopupStore = TracksListPopupStates & TracksListPopupActions

const useTracksListPopupStore = create<TracksListPopupStore>()(
    devtools(
        (set) => ({
            isTracksListPopupOpen: false,
            isPlayListDeleted: false,
            info: null,
            tracksLoading: false,

            // data
                trackImg: null ,
                trackName: null ,
                trackArtistName: null ,
                ids: null,
                allTracks: [],
            // 

            setIsTracksListPopupOpen: (isOpen) => set({isTracksListPopupOpen: isOpen} , false , "tracksListPopup/setIsTracksListPopupOpen"),
            setIsPlayListDeleted: (isDeleted) => set({isPlayListDeleted: isDeleted} , false , "tracksListPopup/setIsPlayListDeleted"),

            setInfo: (info) => set({info: info } , false , "tracksListPopup/setInfo"),
            resetInfo: () => set({info: null } , false , "tracksListPopup/resetInfo"),

            setTracksLoading: (loadingState) => set({tracksLoading: loadingState} , false , "tracksListPopup/setTracksLoading"), 

            // data
                setTrackImg: (img) => set({trackImg: img} , false , "tracksListPopup/setTrackImg"),
                setTrackName: (name) => set({trackName: name} , false , "tracksListPopup/setTrackName"),
                setTrackArtistName: (artistName) => set({trackArtistName: artistName} , false , "tracksListPopup/setTrackArtistName"),
                setIds: (tracksId) => set({ids: tracksId} , false , "tracksListPopup/setIds"),
                setAllTracks: (tracksArray) => set({allTracks: tracksArray} , false , "tracksListPopup/setAllTracks"),

                removeId: (idToRemove) => set((state) => {
                if (!state.ids) return state
                    const updatedIds = state.ids
                        .split(',')
                        .map(id => id.trim()) 
                        .filter(id => id !== idToRemove)
                        .join(',')
                    return { ids: updatedIds }
                } , false , "tracksListPopup/removeId"),

                removeTrackFromList: (trackId) => set((state) => ({
                    allTracks: state.allTracks.filter(track => track.id !== trackId)
                }) , false , "tracksListPopup/removeTrackFromList"),
                
                addTrackToList: (newTrack) => set((state) => ({
                    allTracks: [newTrack , ...state.allTracks]
                }) , false , "tracksListPopup/addTrackToList"),

                addId: (id) => set((state) => ({
                    ids: state.ids ? `${state.ids},${id}` : id
                }) , false , "tracksListPopup/addId"),
            // 
                
        }
    )
))
export default useTracksListPopupStore
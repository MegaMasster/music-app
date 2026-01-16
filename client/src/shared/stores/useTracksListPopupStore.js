import { create } from "zustand"

const useTracksListPopupStore = create((set) => ({
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

    setIsTracksListPopupOpen: (isOpen) => set({isTracksListPopupOpen: isOpen}),
    setIsPlayListDeleted: (isDeleted) => set({isPlayListDeleted: isDeleted}),

    setInfo: (info) => set({info: info }),
    resetInfo: () => set({info: null }),

    setTracksLoading: (loadingState) => set({tracksLoading: loadingState}), 

    // data
        setTrackImg: (img) => set({trackImg: img}),
        setTrackName: (name) => set({trackName: name}),
        setTrackArtistName: (artistName) => set({trackArtistName: artistName}),
        setIds: (tracksId) => set({ids: tracksId}),
        setAllTracks: (tracksArray) => set({allTracks: tracksArray}),

        removeId: (idToRemove) => set((state) => {
        if (!state.ids) return state
            const updatedIds = state.ids
                .split(',')
                .map(id => id.trim()) 
                .filter(id => id !== idToRemove)
                .join(',')
            return { ids: updatedIds }
        }),

        removeTrackFromList: (trackId) => set((state) => ({
            allTracks: state.allTracks.filter(track => track.id !== trackId)
        })),
        
        addTrackToList: (newTrack) => set((state) => ({
            allTracks: [newTrack , ...state.allTracks]
        })),

        addId: (id) => set((state) => ({
            ids: state.ids ? `${state.ids},${id}` : id
        })),
    // 

}))
export default useTracksListPopupStore
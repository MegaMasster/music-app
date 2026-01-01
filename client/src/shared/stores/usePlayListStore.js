import { create } from "zustand"

const usePlayListStore = create((set) => ({
    isCreatePlayListWindowOpen: false,
    image: null,
    trackId: null,
    isLoading: false,
    isPlaylistsExist: false,
    hasMusic: false,
    serverError: null,
    isError: false,

    // pl data
        playListName: null,
        imageUrl: null,
    // 

    setIsCreatePlayListWindowOpen: (isOpen) => set({isCreatePlayListWindowOpen: isOpen}),
    setImage: (imgData) => set({ image: imgData }),
    setTrackId: (id) => set({trackId: id}),

    resetImage: () => set({image: null }),

    setLoading: (loadingState) => set({isLoading : loadingState}),

    setIsPlaylistsExist: (isExist) => set({isPlaylistsExist: isExist}),

    setHasMusic: (isHas) => set({hasMusic: isHas}),

    setServerError: (error) => set({serverError: error , isError: true}),
    resetError: () => set({serverError: null , isError: false}),

    // set pl data
        setPlayListName: (name) => set({playListName: name}),
        setImageUrl: (url) => set({imageUrl: url})
    // 
}))
export default usePlayListStore
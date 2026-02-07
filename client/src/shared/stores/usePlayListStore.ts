import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface PlayListStates {
    isCreatePlayListWindowOpen: boolean,
    image: string | null,
    trackId: string | null,
    isLoading: boolean,
    isPlaylistsExist: boolean,
    hasMusic: boolean,
    serverError: string | null,
    isError: boolean,
    playListId: string | null,

    playListName: string | null,
    imageUrl: string | null,
}

interface PlayListActions {
    setIsCreatePlayListWindowOpen: (isOpen: boolean) => void,
    setImage: (imgData: string | null) => void,
    setTrackId: (id: string | null) => void,
    resetImage: () => void,
    setLoading: (loadingState: boolean) => void,
    setIsPlaylistsExist: (isExist: boolean) => void,
    setHasMusic: (isHas: boolean) => void,
    setServerError: (error: string) => void,
    resetError: () => void,
    setPlayListName: (name: string) => void,
    setImageUrl: (url: string | null) => void,
    setPlayListId: (id: string | null) => void
}

type PlayListStore = PlayListStates & PlayListActions

const usePlayListStore = create<PlayListStore>()(
    devtools(
        (set) => ({
            isCreatePlayListWindowOpen: false,
            image: null,
            trackId: null,
            isLoading: false,
            isPlaylistsExist: false,
            hasMusic: false,
            serverError: null,
            isError: false,
            playListId: null,

            // pl data
                playListName: null,
                imageUrl: null,
            // 

            setIsCreatePlayListWindowOpen: (isOpen) => set({isCreatePlayListWindowOpen: isOpen} , false , "playList/setIsCreatePlayListWindowOpen"),
            setImage: (imgData) => set({image: imgData }, false , "playList/setImage"),
            setTrackId: (id) => set({trackId: id}, false , "playList/setTrackId"),

            resetImage: () => set({image: null }, false , "playList/resetImage"),

            setLoading: (loadingState) => set({isLoading : loadingState}, false , "playList/setLoading"),

            setIsPlaylistsExist: (isExist) => set({isPlaylistsExist: isExist}, false , "playList/setIsPlaylistsExist"),

            setHasMusic: (isHas) => set({hasMusic: isHas}, false , "playList/setHasMusic"),

            setServerError: (error) => set({serverError: error , isError: true}, false , "playList/setServerError"),
            resetError: () => set({serverError: null , isError: false}, false , "playList/resetError"),

            // set pl data
                setPlayListName: (name) => set({playListName: name}, false , "playList/setPlayListName"),
                setImageUrl: (url) => set({imageUrl: url}, false , "playList/setImageUrl"),
                setPlayListId: (id) => set({playListId: id}, false , "playList/setPlayListId")
            // 
        })
    )
)
export default usePlayListStore
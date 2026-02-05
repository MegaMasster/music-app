import { create } from "zustand"
import { persist , devtools } from "zustand/middleware"

interface IndexStates {
    musicLoading: boolean,
    spotifyAccessToken: string | null,
    isSearchPanelOpen: boolean,
    isMusicSearching: boolean,
    isMusicsFound: boolean,
    successFeedback: string | null,
    isSuccessFeedback: boolean
}

interface IndexActions {
    setMusicLoading: (isMusicLoading: boolean) => void,
    setSpotifyAccessToken: (token: string | null) => void,
    setIsSearchPanelOpen: (isOpen: boolean) => void,
    clearSpotifyAccessToken: () => void,
    setIsMusicSearching: (isSearching: boolean) => void,
    setIsMusicsFound: (isFound: boolean) => void,
    setSuccessFeedback: (isSuccess: string) => void
}

type IndexStore = IndexStates & IndexActions

const useIndexStore = create<IndexStore>()(
    devtools(
        persist((set) => 
            ({
                musicLoading: false,
                spotifyAccessToken: null,
                isSearchPanelOpen: false,
                isMusicSearching: false,
                isMusicsFound: false,
                successFeedback: null,
                isSuccessFeedback: false,

                setMusicLoading: (isMusicLoading) => set({musicLoading: isMusicLoading}),

                setSpotifyAccessToken: (token) => set({spotifyAccessToken: token}),
                setIsSearchPanelOpen: (isOpen) => set({isSearchPanelOpen: isOpen}),

                clearSpotifyAccessToken: () => set({ spotifyAccessToken: null}),

                setIsMusicSearching: (isSearching) => set({isMusicSearching: isSearching}),

                setIsMusicsFound: (isFound) => set({isMusicsFound: isFound}),

                setSuccessFeedback: (isSuccess) => set({successFeedback: isSuccess , isSuccessFeedback: true}),

            }) , {
                name: "spotify_access_token",
                partialize: (state) => ({
                    spotifyAccessToken: state.spotifyAccessToken
                })
            }
        )
    )
)
export default useIndexStore
import { create } from "zustand"
import { persist } from "zustand/middleware"

const useIndexStore = create(
    persist((set) => 
        ({
            musicLoading: false,
            spotifyAccessToken: null,
            isSearchPanelOpen: false,
            isMusicSearching: false,

            setMusicLoading: (isMusicLoading) => set({musicLoading: isMusicLoading}),

            setSpotifyAccessToken: (token) => set({spotifyAccessToken: token}),
            setIsSearchPanelOpen: (isOpen) => set({isSearchPanelOpen: isOpen}),

            clearSpotifyAccessToken: () => set({ spotifyAccessToken: null}),

            setIsMusicSearching: (isSearching) => set({isMusicSearching: isSearching})
        }) , {
            name: "spotify_access_token",
            partialize: (state) => ({
                spotifyAccessToken: state.spotifyAccessToken
            })
        }
    )
)
export default useIndexStore
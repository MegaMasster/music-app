import { create } from "zustand"
import { persist } from "zustand/middleware"

const useIndexStore = create(
    persist((set) => 
        ({
            musicLoading: false,
            spotifyAccessToken: null,
            isSearchPanelOpen: false,
            isMusicSearching: false,
            isMusicsFound: false,
            searchInputValue: null,
            
            // musics data
            foundTracks: [],
            // 

            setMusicLoading: (isMusicLoading) => set({musicLoading: isMusicLoading}),

            setSpotifyAccessToken: (token) => set({spotifyAccessToken: token}),
            setIsSearchPanelOpen: (isOpen) => set({isSearchPanelOpen: isOpen}),

            clearSpotifyAccessToken: () => set({ spotifyAccessToken: null}),

            setIsMusicSearching: (isSearching) => set({isMusicSearching: isSearching}),

            setIsMusicsFound: (isFound) => set({isMusicsFound: isFound}),

            // musics data
            setFoundTracks: (tracks) => set({foundTracks: tracks}),
            resetFoundTracks: () => set({foundTracks: []}),
            // 

            setSearchInputValue: (value) => set({searchInputValue: value})

        }) , {
            name: "spotify_access_token",
            partialize: (state) => ({
                spotifyAccessToken: state.spotifyAccessToken
            })
        }
    )
)
export default useIndexStore
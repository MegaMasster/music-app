import { create } from "zustand"
import { persist , createJSONStorage , devtools } from "zustand/middleware" 

interface Track {
    id: string;
    [key: string]: any;
}

interface RecentlyPlayedStates {
    recentlyTracks: Record<string , Track[]>
    userId: string | null
}

interface RecentlyPlayedActions {
    setUserId: (id: string) => void
    getUserTracks: () => Track[]
    addTrack: (track: Track) => void
}

type RecentlyPlayedStore = RecentlyPlayedStates & RecentlyPlayedActions

const useRecentlyPlayedStore = create<RecentlyPlayedStore>()(
    devtools(
        persist(
            (set, get) => ({
                recentlyTracks: {}, 
                userId: null,

                setUserId: (id) => set({ userId: id } , false , "recentlyPlayed/setUserId"),

                getUserTracks: () => {
                    const state = get()
                    return state.userId ? (state.recentlyTracks[state.userId] || []) : []
                }, 

                addTrack: (track) => set((state) => {
                    if (!state.userId) return state

                    const userTracks = state.recentlyTracks[state.userId] || []
                    
                    const updatedTracks = [
                        track, 
                        ...userTracks.filter(t => t.id !== track.id)
                    ].slice(0, 6)

                    return {
                        recentlyTracks: {
                            ...state.recentlyTracks,
                            [state.userId]: updatedTracks
                        }
                    }
                } , false , "recentlyPlayed/addTrack"),
            }), 
            {
                name: "recently_played_v2", 
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({
                    recentlyTracks: state.recentlyTracks 
                })
            }
        )
    )
)
export default useRecentlyPlayedStore
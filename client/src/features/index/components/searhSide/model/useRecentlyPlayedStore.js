import { create } from "zustand"
import { persist , createJSONStorage } from "zustand/middleware" 

const useRecentlyPlayedStore = create(
    persist(
        (set, get) => ({
            recentlyTracks: {}, 
            userId: null,

            setUserId: (id) => set({ userId: id }),

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
            }),
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
export default useRecentlyPlayedStore
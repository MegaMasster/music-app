import { create } from "zustand"
import { persist } from "zustand/middleware"

const useControllerStore = create(
    persist(
        (set, get) => ({
            lastTracksByUser: {},
            userId: null,

            setUserId: (id) => set({ userId: id }),

            setActiveTrackId: (trackId) => set((state) => {
                if (!state.userId) return state
                
                return {
                    lastTracksByUser: {
                        ...state.lastTracksByUser,
                        [state.userId]: trackId
                    }
                };
            })
        }), 
        {
            name: "user_playback_state_v2", 
            partialize: (state) => ({
                lastTracksByUser: state.lastTracksByUser
            })
        }
    )
)
export default useControllerStore
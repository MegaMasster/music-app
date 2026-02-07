import { create } from "zustand"
import { persist , devtools } from "zustand/middleware"

interface ControllerStates {
    lastTracksByUser: Record<string , string>,
    userId: string | null
}

interface ControllerActions {
    setUserId: (id: string | null) => void,
    setActiveTrackId: (trackId: string) => void,
}

type ControllerStore = ControllerStates & ControllerActions

const useControllerStore = create<ControllerStore>()(
    devtools(
        persist(
            (set, get) => ({
                lastTracksByUser: {},
                userId: null,

                setUserId: (id) => set({ userId: id } , false , "controller/setUserId"),

                setActiveTrackId: (trackId) => set((state) => {
                    if (!state.userId) return state
                    
                    return {
                        lastTracksByUser: {
                            ...state.lastTracksByUser,
                            [state.userId]: trackId
                        }
                    };
                } , false , "controller/setActiveTrackId")
            }), 
            {
                name: "user_playback_state_v2", 
                partialize: (state) => ({
                    lastTracksByUser: state.lastTracksByUser
                })
            }
        )
    )
)
export default useControllerStore
import { create } from "zustand"
import { persist } from "zustand/middleware"

const useControllerStore = create(
    persist(
        (set) => ({
            activeTrackId: null,

            setActiveTrackId: (id) => set({activeTrackId: id})
        }) , {
            name: "last_track_id",
            partialize: (state) => ({
                activeTrackId: state.activeTrackId
            })
        }
    )
)
export default useControllerStore
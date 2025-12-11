import { create } from "zustand"

const useControllerStore = create(
    (set) => ({
        isMusicPaused: true,

        setIsMusicPaused: () => set((state) => ({isMusicPaused: !state.isMusicPaused}))
    })
)
export default useControllerStore
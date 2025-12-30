import { create } from "zustand"

const usePlayListStore = create((set) => ({
    isCreatePlayListWindowOpen: false,
    image: null,

    setIsCreatePlayListWindowOpen: (isOpen) => set({isCreatePlayListWindowOpen: isOpen}),
    setImage: (imgData) => set({ image: imgData }),

    resetImage: () => set({image: null }) 
}))
export default usePlayListStore
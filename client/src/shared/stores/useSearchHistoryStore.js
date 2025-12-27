import { create } from "zustand"
import { persist } from "zustand/middleware"

const useSearchHistoryStore = create(
    persist((set) => ({  
        userSearchHistory: [],

        setUserSearchHistory: (query) => set((state) => {
            const filtered = state.userSearchHistory.filter(item => item !== query)
            
            const newHistory = [query, ...filtered].slice(0, 6);
            
            return { userSearchHistory: newHistory }
        })
    }), {
        name: "recent_queries",
        partialize: (state) => ({
            userSearchHistory: state.userSearchHistory
        })
    })
)
export default useSearchHistoryStore
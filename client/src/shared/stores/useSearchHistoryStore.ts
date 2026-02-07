import { create } from "zustand"
import { persist , createJSONStorage , devtools  } from "zustand/middleware"

interface SearchHistoryStates {
    userSearchHistory: Record<string , string[]>,
    userId: string | null
}

interface SearchHistoryActions {
    setUserId: (id: string | null) => void,
    getUserHistory: () => string[],
    setUserSearchHistory: (query: string) => void
}

type SearchHistoryStore = SearchHistoryStates & SearchHistoryActions

const useSearchHistoryStore = create<SearchHistoryStore>()(
    devtools (
        persist((set , get) => ({  
            userSearchHistory: {},
            userId: null,

            setUserId: (id) => set({userId: id} , false , "searchHistory/setUserId"),

            getUserHistory: () => {
                const state = get()
                return state.userId ? (state.userSearchHistory[state.userId] || []) : []
            },

            setUserSearchHistory: (query) => {
                const { userId, userSearchHistory } = get()
                
                if (!userId) {
                    console.error("Cannot save history: userId is null")
                    return
                }

                const currentList = userSearchHistory[userId] || []
                const filtered = currentList.filter(item => item !== query)
                const newHistory = [query, ...filtered].slice(0, 6)
                
                set({ 
                    userSearchHistory: { 
                        ...userSearchHistory, 
                        [userId]: newHistory 
                    } 
                })
            }
        }), {
            name: 'recent_queries_v2',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                userSearchHistory: state.userSearchHistory
            })
        })
    )
)
export default useSearchHistoryStore
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface DebounceSearchResultTracks {
    // уже не помню что мне там возвращает 
    name: string,
    id: string
}

interface DebounceSearchStates {
    query: string,
    results: DebounceSearchResultTracks[]
}

interface DebounceSearchActions {
    setQuery: (inputText: string) => void,
    setResults: (data: DebounceSearchResultTracks[]) => void
}

type DebounceSearchStore = DebounceSearchStates & DebounceSearchActions

const useDebounceSearchStore = create<DebounceSearchStore>()(
    devtools(
        (set) => ({
                query: "",
                results: [],

                setQuery: (inputText) => set({query: inputText} , false , "debounceSearch/setQuery"),
                setResults: (data) => set({results: data}, false , "debounceSearch/setResults")
            }
        )
    )
)
export default useDebounceSearchStore
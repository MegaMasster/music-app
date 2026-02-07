import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { SpotifyTrackItem } from "../../features/utils/main/interfaces/tracks"

interface DebounceSearchStates {
    query: string,
    results: SpotifyTrackItem[]
}

interface DebounceSearchActions {
    setQuery: (inputText: string) => void,
    setResults: (data: SpotifyTrackItem[]) => void
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
import { create } from "zustand"

const useDebounceSearchStore = create((set) => ({
    query: "",
    results: [],

    setQuery: (inputText) => set({query: inputText}),
    setResults: (data) => set({results: data})
}))
export default useDebounceSearchStore
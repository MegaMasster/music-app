import useSearchHistoryStore from "../../../shared/stores/useSearchHistoryStore"
import useDebounceSearchStore from "../../../shared/stores/useDebounceSearchStore"

const saveSearchHistory = () => {
    const setUserSearchHistory = useSearchHistoryStore.getState().setUserSearchHistory
    const query = useDebounceSearchStore.getState().query

    if (query && query.trim()) {
        setUserSearchHistory(query)
    }
}
export default saveSearchHistory
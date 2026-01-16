import { useEffect } from "react"

import debouceApi from "./debounceApi"
import useDebounceSearchStore from "../../../shared/stores/useDebounceSearchStore"
import useIndexStore from "../../../shared/stores/useIndexStore"
import useAuthStore from "../../../shared/stores/useAuthStore"
import MainErrorHandler from "./mainErrorHandler"


const debounceSearch = async () => {  
    
    const query = useDebounceSearchStore(state => state.query)
    const setResults = useDebounceSearchStore(state => state.setResults)

    const spotifyAccessToken = useIndexStore(state => state.spotifyAccessToken)
    const setIsMusicSearching = useIndexStore(state => state.setIsMusicSearching)
    const setIsMusicsFound = useIndexStore(state => state.setIsMusicsFound)
    const setMusicLoading = useIndexStore(state => state.setMusicLoading)

    const setServerError = useAuthStore(state => state.setServerError)

    useEffect(() => {
        let isCurrent = true
        if (!query.trim()) {
            setIsMusicSearching(false)
            setResults([])
            setIsMusicsFound(false)
            return
        }
        const delayDebounceFn = setTimeout(async () => {
            setMusicLoading(true)
            try {
                const apiPath = `/v1/search?q=${encodeURIComponent(query)}`
                const result = await debouceApi(spotifyAccessToken , apiPath)
                if (isCurrent) {
                    if (result.success) {
                        console.log(result.data)
                        setResults(result.data)
                    } else {
                        const errorMessage = MainErrorHandler.handleSearchMusics(result)
                        setServerError(errorMessage)
                        setResults([])
                    }
                }
            } catch (error) {
                if (isCurrent) {
                    const errorMessage = MainErrorHandler.handleSearchMusics(error)
                    setServerError(errorMessage)
                }  
            } finally {
                setMusicLoading(false)
            }
        } , 320)

        return () => {
            isCurrent = false
            clearTimeout(delayDebounceFn)
        }
    } , [query])
}
export default debounceSearch
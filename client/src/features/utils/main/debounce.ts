import { useEffect } from "react"

import debouceApi from "./debounceApi"
import useDebounceSearchStore from "../../../shared/stores/useDebounceSearchStore"
import useIndexStore from "../../../shared/stores/useIndexStore"
import useAuthStore from "../../../shared/stores/useAuthStore"
import MainErrorHandler from "./mainErrorHandler"

import { SpotifyResponse } from "./interfaces/tracks"


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
                const result = await debouceApi<SpotifyResponse>(spotifyAccessToken , apiPath)
                if (isCurrent) {
                    if (result.success) {
                        console.log(result.data)
                        setResults(result.data?.tracks.items ?? [])
                    } else {
                        const errorMessage = MainErrorHandler.handleSearchMusics({
                            status: result.status ?? 500,
                            message: result.error ?? "Unknown error"
                        })
                        setServerError(errorMessage)
                        setResults([])
                    }
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    if (isCurrent) {
                        const errorMessage = MainErrorHandler.handleSearchMusics(error)
                        setServerError(errorMessage)
                    } 
                }  else {
                    setServerError("Unrnown error")
                }
            } finally {
                setMusicLoading(false)
            }
        } , 320)

        return () => {
            isCurrent = false
            clearTimeout(delayDebounceFn)
        }
    } , [query , spotifyAccessToken])
}
export default debounceSearch
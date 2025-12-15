import { useEffect } from "react"

import Header from "./Header"
import PlayerController from "./PlayerController"
import MainContent from "./MainContent"
import useAuthStore from "../../../shared/stores/useAuthStore"
import useIndexStore from "../../../shared/stores/useIndexStore"
import Loader from "../../../shared/ui/loader/Loader"

const MusicApp = () => {

    const {
        setLoading,
        resetError,
        setServerError,
        serverError
    } = useAuthStore()

    const {
        spotifyAccessToken,
        setSpotifyAccessToken
    } = useIndexStore()

    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

    useEffect(() => {
        const getSpotifyAccessToken = async () => {
            if (spotifyAccessToken) {
                setLoading(false)
                return
            }

            resetError()
            setLoading(true)

            if (!clientId || !clientSecret) {
                console.error("ENV DATA NOT FOUND SYKA")
                setServerError("Env data not found.")
                setLoading(false)
                return
            }

            try {
                const spotifyKeys = btoa(`${clientId}:${clientSecret}`)
                const result = await fetch("https://accounts.spotify.com/api/token" , {
                    method: "POST",
                    headers: {
                        "Authorization": `Basic ${spotifyKeys}`,
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: 'grant_type=client_credentials'
                })

                if(!result.ok) {
                    const spotifyError = await result.json()
                    throw new Error(`Error Spotify API: ${spotifyError.error_description || result.statusText}`)
                }

                const successData = await result.json()
                setSpotifyAccessToken(successData.access_token)
            } catch (error) {
                console.error("Ошибка при получении токена:", error)
                setServerError(error.message)
            } finally {
                setLoading(false)
            }
        }  
        getSpotifyAccessToken()  
    } , [spotifyAccessToken, clientId, clientSecret, resetError, setLoading, setServerError, setSpotifyAccessToken])

    return(
        <main className="indexWrapper">

            <Loader/>
            
            <Header/>
            <PlayerController/>
            <MainContent/>
        </main>
    )
}
export default MusicApp
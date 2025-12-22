import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import searchIcon from "../../../assets/images/indexIcons/searchIcon.png"
import leaveIcon from "../../../assets/images/indexIcons/leaveIcon.png"
import track from "../../../assets/images/indexIcons/track.png"
import useIndexStore from "../../../shared/stores/useIndexStore"
import useAuthStore from "../../../shared/stores/useAuthStore"
import searchMusic from '../api/searchMusicsApi'
import MainErrorHandler from '../../utils/main/mainErrorHandler'
import SearchMusicsLoader from '../../../shared/ui/loader/searchMusicsLoader'
import { ROUTES } from "../../../routing/routes"


const SearchMusicSide = () => {

    const {
        isSearchPanelOpen,
        setIsSearchPanelOpen,
        musicLoading,
        setMusicLoading,
        spotifyAccessToken,
        isMusicSearching,
        setIsMusicSearching,
        isMusicsFound,
        setIsMusicsFound,
        foundTracks,
        setFoundTracks,
        resetFoundTracks,
        searchInputValue,
        setSearchInputValue
    } = useIndexStore()

    const {
        setServerError,
        serverError,
        isError,
        resetError
    } = useAuthStore()

    const location = useLocation()
    const isAboutPage = location.pathname === ROUTES.ABOUT_AUTHOR

    const inputRef = useRef(null)
    const panelRef = useRef(null)

    const handleInputClick = () => {
        setIsSearchPanelOpen(true)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current && 
                !inputRef.current.contains(event.target) &&
                panelRef.current &&
                !panelRef.current.contains(event.target)
            ) {
                setIsSearchPanelOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [setIsSearchPanelOpen])

    const panelAnimation = {
        hidden: { 
            opacity: 0, 
            transition: { 
                duration: 0.12
            } 
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.12, 
                ease: "easeOut"
            }
        }
    }

    const onSubmit = async () => {
        if (!searchInputValue.trim()){
            return
        }
        resetError()
        setMusicLoading(true)
        setIsMusicSearching(false)
        try {
            const result = await searchMusic(spotifyAccessToken , searchInputValue)
            if (result.success){
                console.log("SUCCESS LOADIN MUSICS" , result.data)
                setFoundTracks(result.data)
                setIsMusicsFound(true)
            } else {
                const errorMessage = MainErrorHandler.handleSearchMusics(result)
                setIsMusicsFound(false)
                setServerError(errorMessage)
            } 
        } catch (error) {
            const errorMessage = MainErrorHandler.handleSearchMusics(error)
            setServerError(errorMessage)
        } finally {
            setIsMusicSearching(true)
            setMusicLoading(false)
        }
    }

    const handleInputChange = (e) => {
        setSearchInputValue(e.target.value)
    }

    const handleLeaveFromSearch = () => {
        setIsMusicSearching(false)
        setIsMusicsFound(false)
        setSearchInputValue("")
    }

    return (
        <section className={` ${isAboutPage ? 'hidden' : 'relative flex flex-col items-center w-[90%] mt-0 p-3 rounded'} `}>
            <div className="flex w-full h-8 rounded border border-gray-600">
                <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Music search"
                    className="w-full text-fuchsia-100 text-sm px-4 outline-0 
                    bg-[#151324] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                    value={searchInputValue}
                    disabled={musicLoading}
                />

                <div className="flex items-center pr-5 justify-center w-11 h-full bg-[#151324]">
                    {musicLoading && <SearchMusicsLoader /> }
                    {isMusicSearching && 
                        <button 
                            className='flex items-center justify-center w-5 h-full hover:cursor-pointer'
                            onClick={handleLeaveFromSearch}
                        >
                            <img className="w-4 h-4 select-none"
                                style={{ filter: 'invert(1)' }} 
                                src={leaveIcon} 
                                alt="go to main"
                            />
                        </button>
                    }
                </div>

                <AnimatePresence>
                    {isSearchPanelOpen && (
                        <motion.div ref={panelRef} className="absolute text-sm h-30 top-11 left-3 right-3 z-10 
                            flex flex-col text-white bg-[#383838] 
                            border border-gray-600 rounded border-t-0 px-4"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={panelAnimation}
                        >
                            <p>History is empty...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <button className="flex justify-center items-center w-[8%] rounded border-l border-gray-600
                        bg-[#1d1d1d] hover:cursor-pointer hover:bg-[#242424] disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={onSubmit}
                        disabled={musicLoading}
                    >
                        <img 
                            src={searchIcon}
                            alt="password icon"
                            className="w-4 h-4 select-none"
                            style={{ filter: 'invert(1)' }}
                        />
                </button>
            </div>

            <div className='flex flex-col w-full mt-5'>
                {isMusicsFound && foundTracks.length > 0 ? (

                    <div className="grid grid-cols-2 gap-4 w-full"> 
                        {foundTracks.slice(0, 6).map((tracks) => (
                            <div key={tracks.id} className="w-full">
                                <iframe
                                    title={`Spotify Player - ${tracks.id}`}
                                    src={`https://open.spotify.com/embed/track/${tracks.id}?utm_source=generator&theme=0&view=list`}
                                    width="100%"
                                    height="80"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    className="rounded"
                                ></iframe> 
                            </div> 
                        ))}
                    </div>

                ) : (
                    <>
                        {isError ? (
                            <div className='flex text-center'>
                                <p className='text-sm text-rose-600'>{serverError}</p>
                            </div>
                        ) : (
                            <>
                                <p className='text-white font-bold'>Recently listened</p>
                                <div className='flex w-full mt-5 justify-between'>
                                    <div className='flex flex-col'>
                                        <article className='text-white'>
                                            Трэк 1
                                        </article>
                                        <article className='text-white'>
                                            Трэк 2
                                        </article>
                                        <article className='text-white'>
                                            Трэк 3
                                        </article>
                                    </div>

                                    <div className='flex flex-col'>
                                        <article className='text-white'>
                                            Трэк 1
                                        </article>
                                        <article className='text-white'>
                                            Трэк 2
                                        </article>
                                        <article className='text-white'>
                                            Трэк 3
                                        </article>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}
export default SearchMusicSide
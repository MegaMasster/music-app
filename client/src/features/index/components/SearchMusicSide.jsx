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
        <section className={` ${isAboutPage ? 'hidden' : 'relative flex flex-col items-center w-[90%] mt-0 p-6 rounded-[2.5rem] bg-white/2 border border-white/5 backdrop-blur-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] shadow-indigo-500/5 transition-all duration-500'} `}>
            
            {/* Декоративное свечение сверху для объема */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />

            {/* Контейнер поиска */}
            <div className="flex w-full h-11 rounded-2xl border border-white/10 bg-black/40 overflow-hidden focus-within:border-blue-500/40 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 shadow-inner">
                <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Search your favorite music..."
                    className="w-full text-fuchsia-50 text-sm px-5 outline-0 bg-transparent disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-600 font-light tracking-wide"
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                    value={searchInputValue}
                    disabled={musicLoading}
                />

                <div className="flex items-center pr-5 justify-center w-11 h-full bg-transparent">
                    {musicLoading && <SearchMusicsLoader /> }
                    {isMusicSearching && 
                        <button 
                            className='flex items-center justify-center w-6 h-full hover:cursor-pointer hover:scale-110 transition-transform active:scale-95'
                            onClick={handleLeaveFromSearch} 
                        >
                            <img className="w-4 h-4 select-none opacity-60 hover:opacity-100"
                                style={{ filter: 'invert(1)' }} 
                                src={leaveIcon} 
                                alt="clear"
                            />
                        </button>
                    }
                </div>

                <AnimatePresence>
                    {isSearchPanelOpen && (
                        <motion.div 
                            ref={panelRef} 
                            className="absolute text-sm h-32 top-16 left-6 right-6 z-20 
                            flex flex-col text-white bg-[#161722]/95 backdrop-blur-2xl
                            border border-white/10 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] px-5 py-4"
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Recent History</p>
                            </div>
                            <p className="opacity-40 italic text-xs ml-3 font-light">Your history is currently empty...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <button className="flex justify-center items-center w-[12%] border-l border-white/10
                        bg-white/5 hover:cursor-pointer hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 transition-colors group"
                        onClick={onSubmit}
                        disabled={musicLoading}
                    >
                        <img 
                            src={searchIcon}
                            alt="search"
                            className="w-4 h-4 select-none opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all"
                            style={{ filter: 'invert(1)' }}
                        />
                </button>
            </div>

            {/* Секция результатов */}
            <div className='flex flex-col w-full mt-8'>
                {isMusicsFound && foundTracks.length > 0 ? (
                    <div className="grid grid-cols-2 gap-5 w-full"> 
                        {foundTracks.slice(0, 6).map((tracks) => (
                            <div key={tracks.id} className="group w-full rounded-2xl overflow-hidden border border-white/5 bg-black/20 hover:border-blue-500/30 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.2)] transition-all duration-300">
                                <iframe
                                    title={`Spotify Player - ${tracks.id}`}
                                    src={`https://open.spotify.com/embed/track/${tracks.id}?utm_source=generator&theme=0&view=list`}
                                    width="100%"
                                    height="80"
                                    frameBorder="0"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    className="opacity-90 group-hover:opacity-100 transition-opacity"
                                ></iframe> 
                            </div> 
                        ))}
                    </div>
                ) : (
                    <>
                        {isError ? (
                            <div className='flex items-center justify-center p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl shadow-inner'>
                                <p className='text-xs text-rose-400 font-mono tracking-tight uppercase'>{serverError}</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 mb-5 px-1">
                                    <p className='text-white font-bold tracking-tight text-sm'>Recently listened</p>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>
                                
                                <div className='flex w-full justify-between gap-5'>
                                    <div className='flex flex-col gap-2.5 flex-1'>
                                        {[1, 2, 3].map((i) => (
                                            <article key={i} className='text-gray-400 text-xs p-4 bg-white/3 border border-white/5 rounded-2xl hover:text-white hover:bg-white/5 hover:border-white/10 hover:shadow-lg transition-all cursor-default group flex justify-between items-center'>
                                                <span>Track {i}</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/0 group-hover:bg-blue-500/50 transition-all shadow-[0_0_8px_#3b82f6]" />
                                            </article>
                                        ))}
                                    </div>

                                    <div className='flex flex-col gap-2.5 flex-1'>
                                        {[4, 5, 6].map((i) => (
                                            <article key={i} className='text-gray-400 text-xs p-4 bg-white/3 border border-white/5 rounded-2xl hover:text-white hover:bg-white/5 hover:border-white/10 hover:shadow-lg transition-all cursor-default group flex justify-between items-center'>
                                                <span>Track {i}</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/50 transition-all shadow-[0_0_8px_#6366f1]" />
                                            </article>
                                        ))}
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
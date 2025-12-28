import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import leaveIcon from "../../../assets/images/indexIcons/leaveIcon.png"
import { Clock } from 'lucide-react'

import useIndexStore from "../../../shared/stores/useIndexStore"
import useAuthStore from "../../../shared/stores/useAuthStore"
import SearchMusicsLoader from '../../../shared/ui/loader/searchMusicsLoader'
import { ROUTES } from "../../../routing/routes"
import debounceSearch from '../../utils/main/debounce'
import useDebounceSearchStore from '../../../shared/stores/useDebounceSearchStore'
import useSearchHistoryStore from '../../../shared/stores/useSearchHistoryStore'
import saveSearchHistory from '../../utils/main/saveSearchHistory'
import useControllerStore from '../../../shared/stores/useControllerStore'


const SearchMusicSide = () => {

    debounceSearch()

    const userSearchHistory = useSearchHistoryStore(state => state.userSearchHistory)

    const setActiveTrackId = useControllerStore(state => state.setActiveTrackId)
    const activeTrackId = useControllerStore(state => state.activeTrackId)

    const query = useDebounceSearchStore(state => state.query)
    const setQuery = useDebounceSearchStore(state => state.setQuery)
    const results = useDebounceSearchStore(state => state.results)
    const setResults = useDebounceSearchStore(state => state.setResults)

    const isSearchPanelOpen = useIndexStore(state => state.isSearchPanelOpen)
    const setIsSearchPanelOpen = useIndexStore(state => state.setIsSearchPanelOpen)
    const musicLoading = useIndexStore(state => state.musicLoading)
    const setMusicLoading = useIndexStore(state => state.setMusicLoading)
    const spotifyAccessToken = useIndexStore(state => state.spotifyAccessToken)
    const isMusicSearching = useIndexStore(state => state.isMusicSearching)
    const setIsMusicSearching = useIndexStore(state => state.setIsMusicSearching)
    const isMusicsFound = useIndexStore(state => state.isMusicsFound)
    const setIsMusicsFound = useIndexStore(state => state.setIsMusicsFound)

    const serverError = useAuthStore(state => state.serverError)
    const isError = useAuthStore(state => state.isError)
    const resetError = useAuthStore(state => state.resetError)

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
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setIsSearchPanelOpen])


    const onSubmit = async () => {
        if (!query.trim()) {
            setResults([])
            return
        }
        setIsSearchPanelOpen(false)
        resetError()
        setMusicLoading(true)
        setIsMusicSearching(false) 
        saveSearchHistory()
        if (results.length > 0) {
            setIsMusicsFound(true)
            setMusicLoading(false)
            setIsMusicSearching(true) 
        } else {
            setIsMusicsFound(false)
        }
    }

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleLeaveFromSearch = () => {
        setResults([])
        setIsMusicSearching(false)
        setIsMusicsFound(false)
        setQuery("")
    }

    return (
        <section className={` ${isAboutPage ? 'hidden' : 'relative flex flex-col items-center w-[90%] mt-0 p-6 rounded-[2.5rem] bg-white/2 border border-white/5 backdrop-blur-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] shadow-indigo-500/5 transition-all duration-500'} `}>
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="flex w-full h-11 rounded-2xl border border-white/10 bg-black/40 overflow-hidden focus-within:border-blue-500/40 
                focus-within:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 shadow-inner"
            >
                <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Search your favorite music..."
                    className="w-full text-fuchsia-50 text-sm px-5 outline-0 bg-transparent disabled:cursor-not-allowed disabled:opacity-50 
                    placeholder:text-gray-600 font-light tracking-wide"
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                    value={query}
                />

                <div className="flex items-center pr-5 justify-center w-11 h-full bg-transparent">
                    {musicLoading && <SearchMusicsLoader /> }
                    {isMusicSearching && !musicLoading && 
                        <button 
                            className='flex items-center justify-center w-6 h-full '
                            onClick={handleLeaveFromSearch} 
                        >
                            <img className="w-4 h-4 select-none opacity-60 hover:opacity-100 hover:cursor-pointer hover:scale-110 transition-transform active:scale-95"
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
                            className="absolute top-16 left-6 right-6 z-50 
                            flex flex-col text-white bg-[#161722]/95 backdrop-blur-2xl
                            border border-white/10 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] 
                            px-5 py-4 h-auto min-h-[100px]" 
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.2 }}
                        >

                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                                    {!query.trim() ? "Search History" : "Search Results"}
                                </p>
                            </div>

                            {results.length > 0 ? (
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 w-full'>
                                    {results.slice(0 , 6).map((track) => (
                                        <button 
                                            key={track.id} 
                                            className='group flex items-center gap-3 p-2 w-full bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl 
                                            transition-all duration-300 active:scale-95 text-left hover:cursor-pointer'
                                            onClick={() => {
                                                onSubmit()
                                                setActiveTrackId(track.id)
                                            }} 
                                        >
                                            <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
                                                <img 
                                                    src={track.album.images[0]?.url} 
                                                    alt={track.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>

                                            <div className="flex flex-col items-start overflow-hidden w-full">
                                                <span className="text-white text-sm font-medium truncate w-full group-hover:text-fuchsia-400 transition-colors">
                                                    {track.name}
                                                </span>
                                                <span className="text-gray-500 text-[10px] truncate w-full">
                                                    {track.artists[0]?.name}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                !query.trim() ? (
                                    userSearchHistory.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                                            {userSearchHistory.map((q, index) => (
                                                <button 
                                                    key={index}
                                                    onClick={() => {
                                                        setQuery(q)
                                                    }}
                                                    className='group flex items-center gap-3 p-3 w-full bg-white/[0.03] hover:bg-white/[0.08] 
                                                    border border-white/5 rounded-2xl h-12 transition-all duration-300 active:scale-95 text-left hover:cursor-pointer'
                                                >
                                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-black/20 rounded-xl border border-white/5 
                                                        group-hover:border-blue-500/30 transition-colors"
                                                    >
                                                        <Clock size={14} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                                                    </div>

                                                    <div className="flex flex-col overflow-hidden">
                                                        <span className="text-[12px] text-gray-300 font-medium truncate group-hover:text-white transition-colors">
                                                            {q}
                                                        </span>
                                                        <span className="text-[9px] text-gray-600 uppercase tracking-widest font-bold group-hover:text-blue-500/50 
                                                            transition-colors"
                                                        >
                                                            Recent Search
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="opacity-40 italic text-xs ml-3 font-light py-2">Your history is currently empty...</p>
                                    )
                                ) : (
                                    <div className="flex items-center py-2 ml-3">
                                        {musicLoading ? (
                                            <motion.p 
                                                animate={{ 
                                                    opacity: [0.3, 0.8, 0.3],
                                                }}
                                                transition={{ 
                                                    duration: 1.5,       
                                                    repeat: Infinity,      
                                                    ease: "easeInOut"      
                                                }}
                                                className="text-blue-400 italic text-xs font-light tracking-wide"
                                            >
                                                Searching magic...
                                            </motion.p>
                                        ) : (
                                            <p className="opacity-40 italic text-xs font-light">
                                                Nothing found...
                                            </p>
                                        )}
                                    </div>
                                )
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='flex flex-col w-full mt-8'>
                {isMusicsFound && results.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 w-full"> 
                        {results.slice(0, 6).map((track) => {
                            const isActive = activeTrackId === track.id;

                            return (
                                <div 
                                    key={track.id} 
                                    onClick={() => setActiveTrackId(track.id)}
                                    className={`group relative flex items-center gap-4 p-3 w-full rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden
                                    ${isActive 
                                        ? 'bg-blue-600/10 border-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.15)]' 
                                        : 'bg-white/[0.03] border-white/5 hover:border-blue-500/30 hover:bg-white/[0.08]'
                                    }`}
                                >

                                    {isActive && (
                                        <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                                    )}

                                    <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden shadow-xl bg-black/40">
                                        <img 
                                            src={track.album.images[0]?.url} 
                                            alt={track.name}
                                            className={`w-full h-full object-cover transition-transform duration-700 
                                                ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                                        />
                                        
                                        <div className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300
                                            ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                        >
                                            {isActive ? (
                                                <div className="flex gap-0.5 items-end h-3">
                                                    <div className="w-1 bg-blue-400 animate-[bounce_1s_infinite_0.1s] shadow-[0_0_8px_#60a5fa]" />
                                                    <div className="w-1 bg-blue-400 animate-[bounce_1s_infinite_0.3s] shadow-[0_0_8px_#60a5fa]" />
                                                    <div className="w-1 bg-blue-400 animate-[bounce_1s_infinite_0.5s] shadow-[0_0_8px_#60a5fa]" />
                                                </div>
                                            ) : (
                                                <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-1" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col flex-1 min-w-0">
                                        <h4 className={`text-sm font-bold truncate transition-colors duration-300
                                            ${isActive ? 'text-blue-400' : 'text-white'}`}>
                                            {track.name}
                                        </h4>
                                        <p className="text-[11px] text-gray-500 truncate mt-0.5">
                                            {track.artists[0]?.name}
                                        </p>
                                        
                                        {isActive && (
                                            <span className="text-[8px] text-blue-500/80 font-black tracking-[0.2em] mt-1.5 animate-pulse">
                                                NOW PLAYING
                                            </span>
                                        )}
                                    </div>

                                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500
                                        ${isActive ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-transparent'}`} 
                                    />
                                </div>
                            )
                        })}
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
                                            <article key={i} className='text-gray-400 text-xs p-4 bg-white/3 border border-white/5 rounded-2xl hover:text-white 
                                                over:bg-white/5 hover:border-white/10 hover:shadow-lg transition-all cursor-default group flex justify-between items-center'
                                            >
                                                <span>Track {i}</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/0 group-hover:bg-blue-500/50 transition-all shadow-[0_0_8px_#3b82f6]" />
                                            </article>
                                        ))}
                                    </div>

                                    <div className='flex flex-col gap-2.5 flex-1'>
                                        {[4, 5, 6].map((i) => (
                                            <article key={i} className='text-gray-400 text-xs p-4 bg-white/3 border border-white/5 rounded-2xl hover:text-white
                                                hover:bg-white/5 hover:border-white/10 hover:shadow-lg transition-all cursor-default group flex 
                                                justify-between items-center'
                                            >
                                                <span>Track {i}</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/50 transition-all 
                                                    shadow-[0_0_8px_#6366f1]" 
                                                />
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
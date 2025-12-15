import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'

import searchIcon from "../../../assets/images/indexIcons/searchIcon.png"
import useIndexStore from "../../../shared/stores/useIndexStore"
import useAuthStore from "../../../shared/stores/useAuthStore"
import searchMusic from '../api/searchMusicsApi'
import MainErrorHandler from '../../utils/main/mainErrorHandler'
import SearchMusicsLoader from '../../../shared/ui/loader/searchMusicsLoader'

const SearchMusicSide = () => {

    const {
        isSearchPanelOpen,
        setIsSearchPanelOpen,
        musicLoading,
        setMusicLoading,
        spotifyAccessToken
    } = useIndexStore()

    const {
        setServerError,
        serverError,
        resetError
    } = useAuthStore()

    const [searchInputValue , setSearchInputValue] = useState([])

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
        if (!searchInputValue.trim())
        resetError()
        setMusicLoading(true)
        try {
            const result = await searchMusic(spotifyAccessToken , searchInputValue)
            if (result.success){
                console.log("SUCCESS LOADIN MUSICS" , result.data)
            } else {
                const errorMessage = MainErrorHandler.handleSearchMusics(result)
                setServerError(errorMessage)
            } 
        } catch (error) {
            const errorMessage = MainErrorHandler.handleSearchMusics(error)
                setServerError(errorMessage)
        } finally {
            setMusicLoading(false)
        }
    }

    const handleInputChange = (e) => {
        setSearchInputValue(e.target.value);
    }

    return (
        <section className="relative flex flex-col items-center w-[90%] mt-0 p-3 rounded">
            <div className="flex w-full h-8 rounded border border-gray-600">
                <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Music search"
                    className="w-full text-white text-sm px-4 outline-0 
                    bg-[#151324]"
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                    value={searchInputValue}
                />

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
                    bg-[#1d1d1d] hover:cursor-pointer hover:bg-[#242424]"
                    onClick={onSubmit}
                >
                    <img 
                        src={searchIcon}
                        alt="password icon"
                        className="w-4 h-4 select-none"
                        style={{ filter: 'invert(1)' }}
                    />
                </button>
            </div>

            <div>
                {musicLoading ? (
                    <div className='flex justify-center w-full mt-3'>
                        <SearchMusicsLoader/>
                    </div>
                ) : (
                    <article className='text-white'>
                        хуй хуй хуй
                    </article>
                )}
            </div>
        </section>
    )
}
export default SearchMusicSide
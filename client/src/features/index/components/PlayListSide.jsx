import { useLocation , useNavigate } from "react-router-dom"
import { Music, Plus, X, Camera, Sparkles } from 'lucide-react'
import { useRef , useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from "react-hook-form"

import { ROUTES } from "../../../routing/routes"
import usePlayListStore from "../../../shared/stores/usePlayListStore"
import createPlayList from "../api/createPlayListApi"
import useAuthStore from "../../../shared/stores/useAuthStore"
import fetchPlayList from "../api/fetchPlayListApi"
import useTracksListPopupStore from "../../../shared/stores/useTracksListPopupStore"
import getTracksService from '../../utils/main/getTracksService'

const PlayListSide = () => {

    const navigate = useNavigate()

    const isCreatePlayListWindowOpen = usePlayListStore(state => state.isCreatePlayListWindowOpen)
    const setIsCreatePlayListWindowOpen = usePlayListStore(state => state.setIsCreatePlayListWindowOpen)
    const image = usePlayListStore(state => state.image)
    const setImage = usePlayListStore(state => state.setImage)
    const resetImage = usePlayListStore(state => state.resetImage)
    const trackId = usePlayListStore(state => state.trackId)

    const setLoading = useAuthStore(state => state.setLoading)
    const serverError = usePlayListStore(state => state.serverError)
    const setServerError = usePlayListStore(state => state.setServerError)
    const isError = usePlayListStore(state => state.isError)
    const resetError = usePlayListStore(state => state.resetError)
    const setIsPlaylistsExist = usePlayListStore(state => state.setIsPlaylistsExist)
    const isPlaylistsExist = usePlayListStore(state => state.isPlaylistsExist)
    const playListName = usePlayListStore(state => state.playListName)
    const setPlayListName = usePlayListStore(state => state.setPlayListName)
    const imageUrl = usePlayListStore(state => state.imageUrl)
    const setImageUrl = usePlayListStore(state => state.setImageUrl)
    const setPlayListId = usePlayListStore(state => state.setPlayListId)
    const playListId = usePlayListStore(state => state.playListId)

    const setIsTracksListPopupOpen = useTracksListPopupStore(state => state.setIsTracksListPopupOpen)

    useEffect(() => {
        const loadPlayList = async () => {
            try {
                const result = await fetchPlayList()
                if (result.success) {
                    if (result.data.length > 0) {
                        console.log(result.data)
                        setPlayListId(result.data[0].id)
                        setImageUrl(result.data[0].image_url)
                        setPlayListName(result.data[0].name)
                        setIsPlaylistsExist(true)
                    } else {
                        setIsPlaylistsExist(false)
                    }
                } else {
                    throw Error("Не получилось получить плейлист")
                }
            } catch(error) {
                console.error("Не удалось загрузить плейлисты из БД:", error)
            }
        }
        loadPlayList()
    } , [])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            playlistName: ''
        }
    })

    const fileInputRef = useRef(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setImage(reader.result)
            reader.readAsDataURL(file)
        }
    }

    const handleClose = () => {
        setIsCreatePlayListWindowOpen(false)
        reset()
        resetImage()
    }

    const location = useLocation()
    const isAboutPage = location.pathname === ROUTES.ABOUT_AUTHOR

    const onSubmit = async (data) => {
        setLoading(true)
        resetError()

        const playlistData = {
            ...data,
            image: image,
            trackId: trackId || null
        }

        console.log(playlistData)

        try {
            const result = await createPlayList(playlistData)
            if (result.success) {
                if (result.data && (Array.isArray(result.data) ? result.data.length > 0 : true)) {
                    const created = Array.isArray(result.data) ? result.data[0] : result.data
                    setPlayListId(created.id)
                    setImageUrl(created.image_url)
                    setPlayListName(created.name)
                    setIsPlaylistsExist(true)
                    handleClose()
                } else {
                    setIsPlaylistsExist(false)
                }
            } else {
                if (result.status === 400) {
                    setServerError("You already have a playlist")
                } else {
                    setServerError("Server error")
                }
            }
        } catch (error) {
            console.log(error)
            setServerError("Request Error")
        } finally {
            setLoading(false)
        }
    }

    const handleOpenPopup = () => {
        setIsTracksListPopupOpen(true)
        navigate(`/index/playlist/${playListId}`)
        getTracksService(playListId)
    }

    return (
        <section className={`${isAboutPage ? "hidden" : "relative flex flex-col justify-between items-start w-[90%] h-full mx-auto mt-6 mb-5"} z-10`}>
            
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    Playlists <Sparkles className="text-blue-500" size={20} />
                </h1>
                
                <button 
                    type="button"
                    onClick={() => setIsCreatePlayListWindowOpen(true)}
                    className="group relative flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-500 active:scale-95 cursor-pointer shadow-xl"
                >
                    <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                    Create New
                </button>
            </div>

            {isPlaylistsExist ? (
                <button 
                    className="group relative flex flex-col items-start gap-2 p-2 rounded-2xl transition-all duration-300 hover:bg-white/[0.05] 
                    active:scale-95 text-left w-[186px] hover:cursor-pointer"
                    onClick={handleOpenPopup}
                >

                    <div className="relative w-[160px] h-[140px] overflow-hidden rounded-xl border border-white/5 shadow-lg 
                        group-hover:border-white/20 transition-colors"
                    >
                        {imageUrl ? (
                            <img 
                                src={imageUrl} 
                                alt={playListName} 
                                className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 transition-colors">
                                <div className="relative">
                                    <Music 
                                        size={42} 
                                        className="text-white/10 group-hover:text-blue-500/40 transition-colors duration-500" 
                                        strokeWidth={1.5} 
                                    />
                                    <Music 
                                        size={42} 
                                        className="absolute inset-0 text-blue-500/0 group-hover:text-blue-500/20 blur-xl transition-colors duration-500" 
                                        strokeWidth={1.5} 
                                    />
                                </div>
                            </div>
                        )}
                                        
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="px-1 w-full">
                        <p className="text-white font-medium text-sm truncate tracking-tight group-hover:text-blue-400 transition-colors">
                            {playListName}
                        </p>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-0.5">
                            Playlist
                        </p>
                    </div>
                </button>
            ) : (
                <div className="relative w-full h-44 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm flex 
                    flex-col items-center justify-center group"
                >
                    <Music size={40} className="text-white/10" strokeWidth={1} />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold mt-2">No playlists yet</span>
                </div>
            )}

            {isCreatePlayListWindowOpen && createPortal(
                <div className="fixed inset-0 z-[10] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-[20px] cursor-pointer"
                        onClick={handleClose} 
                    />
                    
                    <div 
                        className="relative w-full max-w-[420px] bg-white/[0.05] border border-white/10 backdrop-blur-[40px] p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <button 
                            type="button"
                            onClick={handleClose} 
                            className="absolute top-8 right-8 p-2 text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer z-20"
                        >
                            <X size={22} />
                        </button>

                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-white tracking-tighter">New Playlist</h2>
                                <p className="text-[10px] text-blue-400 uppercase tracking-[0.4em] font-black mt-1">Design your vibe</p>
                            </div>

                            <div className="group relative w-40 h-40 mx-auto" onClick={() => fileInputRef.current.click()}>
                                <div className="absolute -inset-4 bg-blue-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-500" 
                                />
                                <div className="relative w-full h-full bg-black/40 rounded-[2rem] border border-white/10 flex items-center justify-center 
                                    overflow-hidden cursor-pointer transition-transform group-hover:scale-[1.02]"
                                >
                                    {image ? (
                                        <img src={image} className="w-full h-full object-cover" alt="Cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-3">
                                            <Camera className="text-white/20 group-hover:text-blue-500 transition-colors" size={28} />
                                            <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest">Upload Cover</span>
                                        </div>
                                    )}
                                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-400 uppercase font-black tracking-[0.3em] ml-2">
                                        Playlist Name
                                    </label>
                                    <input 
                                        {...register("playlistName", { 
                                            required: "Name is required", 
                                            maxLength: { value: 30, message: "Too long" }
                                        })}
                                        autoFocus
                                        type="text" 
                                        placeholder="My Awesome Mix"
                                        className={`w-full bg-white/5 border ${errors.playlistName ? 'border-red-500/50' : 'border-white/10'} 
                                        rounded-2xl px-6 py-5 text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-sm`}
                                    />
                                    {isError && (
                                        <p className="text-[9px] text-red-500 uppercase font-bold ml-2 tracking-widest animate-pulse">
                                            {serverError}
                                        </p>
                                    )}
                                    {errors.playlistName && (
                                        <p className="text-[9px] text-red-500 uppercase font-bold ml-2 tracking-widest animate-pulse">
                                            {errors.playlistName.message}
                                        </p>
                                    )}
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.2em] 
                                    rounded-2xl shadow-xl shadow-blue-900/30 active:scale-95 transition-all cursor-pointer"
                                >
                                    Create Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>,
                document.body 
            )}
        </section>
    )
}
export default PlayListSide
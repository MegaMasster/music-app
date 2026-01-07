import { X, Trash2, Music, Play, ListMusic , ListPlus , Check} from 'lucide-react'
import { createPortal } from "react-dom"
import { useNavigate, useParams } from "react-router-dom"

import usePlayListStore from "../../../shared/stores/usePlayListStore"
import useTracksListPopupStore from "../../../shared/stores/useTracksListPopupStore"
import deletePlayList from "../api/deletePlayListApi"
import useAuthStore from "../../../shared/stores/useAuthStore"
import useControllerStore from '../../../shared/stores/useControllerStore'
import removeTrackApi from '../api/removeTrackApi'
import TracksLoader from "../../../shared/ui/loader/TracksLoader"

const TracksListPopup = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const serverError = useAuthStore(state => state.serverError)
    const setServerError = useAuthStore(state => state.setServerError)
    const isError = useAuthStore(state => state.isError)
    const resetError = useAuthStore(state => state.resetError)
    const setLoading = useAuthStore(state => state.setLoading)

    const playListName = usePlayListStore(state => state.playListName)
    const imageUrl = usePlayListStore(state => state.imageUrl)
    const setIsPlaylistsExist = usePlayListStore(state => state.setIsPlaylistsExist)
    const isPlaylistsExist = usePlayListStore(state => state.isPlaylistsExist)
    const setTrackId = usePlayListStore(state => state.setTrackId)
    const playListId = usePlayListStore(state => state.playListId)
    
    const isTracksListPopupOpen = useTracksListPopupStore(state => state.isTracksListPopupOpen)
    const setIsTracksListPopupOpen = useTracksListPopupStore(state => state.setIsTracksListPopupOpen)
    const isPlayListDeleted = useTracksListPopupStore(state => state.isPlayListDeleted)
    const setIsPlayListDeleted = useTracksListPopupStore(state => state.setIsPlayListDeleted)
    const info = useTracksListPopupStore(state => state.info)
    const allTracks = useTracksListPopupStore(state => state.allTracks)
    const ids = useTracksListPopupStore(state => state.ids)
    const removeId = useTracksListPopupStore(state => state.removeId)
    const removeTrackFromList = useTracksListPopupStore(state => state.removeTrackFromList)

    const setTracksLoading = useTracksListPopupStore(state => state.setTracksLoading)
    const tracksLoading = useTracksListPopupStore(state => state.tracksLoading)

    const setActiveTrackId = useControllerStore(state => state.setActiveTrackId)
    const activeTrackId = useControllerStore(state => state.activeTrackId)

    if (!id || !isTracksListPopupOpen) return null

    const handleClose = () => {
        setIsTracksListPopupOpen(false)
        resetError()
        navigate("/index")
    }

    const delPlayList = async (id) => {
        if (!id || id === "null") return
        setLoading(true)
        try {
            const result = await deletePlayList(id)
            if (result.success) {
                setIsPlayListDeleted(false)
                handleClose()
                setIsPlaylistsExist(false)
                resetError()
            } else {
                setIsPlayListDeleted(false)
                setServerError("Server error")
            }
        } catch (error) {
            console.log("Delete error: " , error)
        } finally {
            setLoading(false)
        }
    }

    const removeTrack = async (trackId) => {
        setTracksLoading(true)
        try {
            const result = await removeTrackApi(trackId , playListId)
            if (result.success) {
                console.log("ВСЕ ОК")
                removeId(trackId)
                removeTrackFromList(trackId)
            } else {
                setServerError("Server error, try again later")
            }
        } catch (error) {
            console.log("Fuck err: " , error)
            setServerError("Server error, try again later")
        } finally {
            setTracksLoading(false)
        }
    }

    const idsArray = ids ? ids.split(',') : []

    return createPortal(
        <section className="fixed inset-0 z-[100] flex items-center justify-center p-4">

            {isPlayListDeleted && (
                <div className="absolute inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-300">

                    <div className="absolute inset-0 bg-[#030507]/60 backdrop-blur-md rounded-[3rem]" />
                    
                    <div className="relative w-full max-w-[280px] bg-[#0a0f14] border border-red-500/20 p-8 rounded-[2.5rem] shadow-2xl text-center">
                        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={20} className="text-red-500" />
                        </div>
                        
                        <h3 className="text-white font-black text-sm uppercase tracking-tighter mb-2">
                            Delete Playlist?
                        </h3>
                        <p className="text-blue-400/40 text-[10px] leading-relaxed mb-6 font-medium uppercase tracking-widest">
                            This action cannot be undone. All tracks will be removed.
                        </p>
                        
                        <div className="flex flex-col gap-2">
                            <button 
                                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all active:scale-95 cursor-pointer"
                                onClick={() => {
                                    delPlayList(id)
                                }}
                            >
                                Confirm Delete
                            </button>
                            <button 
                                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white/50 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all cursor-pointer"
                                onClick={() => setIsPlayListDeleted(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-[12px] animate-in fade-in duration-500 cursor-pointer"
                onClick={handleClose}
            />

            <div className="relative w-full max-w-[400px] h-[70vh] bg-[#030507] border border-blue-500/10 backdrop-blur-3xl rounded-2xl overflow-hidden flex flex-col 
                shadow-2xl animate-in zoom-in-95 duration-300"
            >
                
                <div className="relative p-8 flex flex-col items-center gap-4 bg-gradient-to-b from-blue-900/20 to-transparent flex-shrink-0">
                    <button 
                        onClick={handleClose}
                        className="absolute top-6 right-6 p-2 text-blue-400/30 hover:text-blue-400 transition-all z-20 cursor-pointer"
                    >
                        <X size={20} />
                    </button>

                    <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20 bg-black flex-shrink-0">
                        {imageUrl ? (
                            <img src={imageUrl} className="w-full h-full object-cover select-none" alt="Cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-950/20">
                                <Music size={40} className="text-blue-500/10" />
                            </div>
                        )}
                    </div>

                    <div className="text-center space-y-1">
                        <span className="text-[7px] uppercase tracking-[0.5em] text-blue-500 font-black opacity-70">Collection</span>
                        <h2 className="text-2xl font-black text-white tracking-tighter truncate w-64 uppercase">
                            {playListName || "Vibe"}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 w-full mt-2 px-2">
                        <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 
                            hover:bg-blue-500 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all active:scale-95 
                            shadow-lg shadow-blue-600/10 cursor-pointer"
                            onClick={() => {
                                if (allTracks && allTracks.length > 0) {
                                    setActiveTrackId(allTracks[0].id)
                                }
                            }}
                        >
                            <Play size={12} fill="currentColor" /> Play Mix
                        </button>
                        <button 
                            className="p-4 bg-blue-950/30 text-blue-500 hover:text-red-500 rounded-2xl border border-blue-500/10 transition-all cursor-pointer group"
                            onClick={() => setIsPlayListDeleted(true)}
                        >
                            <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    {isError && (
                        <p className='text-[13px] text-rose-600 mt-1 ml-1 font-medium animate-pulse'>
                           {serverError} 
                        </p>
                    )}

                </div>

                <div className="flex-1 overflow-y-auto px-6 scrollbar-hide">
                    <div className="flex items-center gap-3 mb-0 text-blue-100 uppercase text-[7px] font-black tracking-[0.4em]">
                        <ListMusic size={12} />
                        <span>Tracks</span>
                        <div className="h-[1px] flex-1 bg-blue-500/5" />
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center gap-2 justify-center p-1 text-center">
                        {allTracks.length == 0 ? (
                            <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
                                <div className="w-16 h-16 bg-blue-500/5 rounded-full flex items-center justify-center mb-4 border border-blue-500/10">
                                    <ListMusic size={24} className="text-blue-500/20" />
                                </div>
                                
                                <span className="text-[10px] uppercase tracking-[0.3em] text-blue-500/80 font-black mb-1">
                                    Status: Empty
                                </span>
                                <p className="text-white/70 text-[11px] font-medium uppercase tracking-widest max-w-[180px] leading-relaxed">
                                    {info || "Your playlist is clear"}
                                </p>
                            </div>
                        ) : (
                            tracksLoading ? (
                                <TracksLoader/>
                            ) : (
                                <div className="w-full space-y-1">
                                    <span className="text-[7px] uppercase tracking-[0.4em] text-blue-500/80 font-black px-2">
                                        Playlist Content
                                    </span>
                                    {allTracks.map((track) => {
                                        const isActive = activeTrackId === track.id
                                        const isTrackAlreadyIn = idsArray.includes(track.id)

                                        return (
                                            <div 
                                                key={track.id} 
                                                onClick={() => setActiveTrackId(track.id)}
                                                className={`group relative flex items-center h-17 gap-2 p-3 w-full rounded-2xl border transition-all 
                                                duration-500 cursor-pointer 
                                                ${isActive 
                                                    ? 'bg-blue-600/10 border-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.15)]' 
                                                    : 'bg-white/[0.03] border-white/5 hover:border-blue-500/30 hover:bg-white/[0.08]'
                                                }`}
                                            >
                                                {isActive && (
                                                    <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                                                )}

                                                <div className="relative w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden shadow-xl bg-black/40">
                                                    <img 
                                                        src={track.album?.images[0]?.url} 
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
                                                    <h4 className={`text-[12px] font-bold truncate transition-colors duration-300
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

                                                {isTrackAlreadyIn && isPlaylistsExist ? (
                                                    <button 
                                                        className="relative p-1 rounded bg-blue-500/20 border border-blue-500/40 hover:bg-red-500/20 hover:border-red-500/40 
                                                        transition-all hover:cursor-pointer active:scale-[93%] group/btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            removeTrack(track.id)
                                                            console.log("Remove click")
                                                        }}
                                                    >
                                                        <Check size={18} className="text-blue-400 group-hover/btn:hidden" />
                                                        <Trash2 size={18} className="hidden text-red-400 group-hover/btn:block" />
                                                        
                                                        <span className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 
                                                            opacity-0 group-hover/btn:opacity-100 transition-all duration-200
                                                            bg-gray-900 backdrop-blur-md border border-white/15 
                                                            text-[11px] text-white font-medium px-2 py-0.5 rounded shadow-xl
                                                            pointer-events-none tracking-tight z-50">
                                                            Remove from playlist
                                                        </span>
                                                    </button>
                                                ) : (
                                                    <button 
                                                        className="relative p-1 rounded bg-white/5 border border-white/10 hover:bg-blue-500/20 
                                                        transition-all hover:opacity-100 hover:cursor-pointer active:scale-[93%]"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setTrackId(track.id)
                                                            modalWindowFunc()
                                                        }}
                                                    >
                                                        <ListPlus size={18} className="text-white opacity-70 hover:opacity-100" />
                                                        
                                                        <span className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 
                                                            opacity-0 [button:hover_&]:opacity-100 transition-all duration-200
                                                            bg-gray-900 backdrop-blur-md border border-white/15 
                                                            text-[11px] text-white font-medium px-2 py-0.5 rounded shadow-xl
                                                            pointer-events-none tracking-tight z-50">
                                                            Add to playlist
                                                        </span>
                                                    </button>
                                                )}

                                                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500
                                                    ${isActive ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-transparent'}`} 
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>,
        document.body
    )
}
export default TracksListPopup
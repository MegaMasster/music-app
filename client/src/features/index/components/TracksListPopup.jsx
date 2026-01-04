import { X, Trash2, Music, Play, ListMusic } from 'lucide-react'
import { createPortal } from "react-dom"
import { useNavigate, useParams } from "react-router-dom"

import usePlayListStore from "../../../shared/stores/usePlayListStore"
import useTracksListPopupStore from "../../../shared/stores/useTracksListPopupStore"
import deletePlayList from "../api/deletePlayListApi"
import useAuthStore from "../../../shared/stores/useAuthStore"

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
    
    const isTracksListPopupOpen = useTracksListPopupStore(state => state.isTracksListPopupOpen)
    const setIsTracksListPopupOpen = useTracksListPopupStore(state => state.setIsTracksListPopupOpen)
    const isPlayListDeleted = useTracksListPopupStore(state => state.isPlayListDeleted)
    const setIsPlayListDeleted = useTracksListPopupStore(state => state.setIsPlayListDeleted)
    const isPlayListClear = useTracksListPopupStore(state => state.isPlayListClear)
    const info = useTracksListPopupStore(state => state.info)

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
                        <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-600/10 cursor-pointer">
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
                        <p className='text-[11px] text-rose-600 mt-1 ml-1 font-medium animate-pulse'>
                           {serverError} 
                        </p>
                    )}

                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-8 scrollbar-hide">
                    <div className="flex items-center gap-3 mb-6 text-blue-100 uppercase text-[7px] font-black tracking-[0.4em]">
                        <ListMusic size={12} />
                        <span>Tracks</span>
                        <div className="h-[1px] flex-1 bg-blue-500/5" />
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                        {isPlayListClear ? (
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
                            <div className="w-full space-y-1">
                                <span className="text-[7px] uppercase tracking-[0.4em] text-blue-500/80 font-black px-2">
                                    Playlist Content
                                </span>
                                <p className='text-white uppercase tracking-tighter font-black text-sm px-2'>Tracks</p>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        </section>,
        document.body
    )
}
export default TracksListPopup
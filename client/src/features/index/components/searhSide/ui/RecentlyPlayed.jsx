import { Music } from "lucide-react"

import useRecentlyPlayedStore from "../model/useRecentlyPlayedStore"
import useControllerStore from "../../../../../shared/stores/useControllerStore"

const RecentlyPlayed = () => {

    const getUserTracks = useRecentlyPlayedStore(state => state.getUserTracks)
    const userTracks = getUserTracks()

    const activeTrackId = useControllerStore(state => 
        state.userId ? state.lastTracksByUser[state.userId] : null
    )
    const setActiveTrackId = useControllerStore(state => state.setActiveTrackId)

    return (
        <section className="relative z-10 w-full">  
            <div className="flex items-center gap-1 mb-2 px-1">
                <p className='text-white font-bold tracking-tight text-sm max-sm:text-[10px] max-md:text-[12px]'>Recently listened</p>
                <div className="h-px flex-1 bg-white/5" />
            </div>
                                
            {userTracks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full h-auto">   
                    {userTracks.map((track) => {
                        const isActive = activeTrackId === track.id

                        return (
                            <article
                                key={track.id}
                                onClick={() => {
                                    setActiveTrackId(track.id)
                                }}
                                className={`group relative flex items-center h-17 max-sm:h-12 max-md:h-15 gap-3 p-2 w-full rounded-lg border transition-all 
                                    duration-500 cursor-pointer 
                                ${isActive 
                                    ? 'bg-blue-600/10 border-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.15)]' 
                                    : 'bg-white/[0.03] border-white/5 hover:border-blue-500/30 hover:bg-white/[0.08]'
                                }`}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-transparent to-transparent pointer-events-none rounded-2xl" />
                                )}

                                <div className="relative w-12 h-12 max-sm:h-9 max-sm:w-9 max-md:h-11 max-md:w-11 flex-shrink-0 rounded-xl overflow-hidden shadow-xl
                                bg-black/40">
                                    <img
                                        src={track.album?.images?.[0]?.url}
                                        alt={track.name}
                                        className={`w-full h-full object-cover transition-transform duration-700 
                                            ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                                    />
                                    
                                    <div className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300
                                        ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
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
                                    <h4 className={`text-[12px] max-sm:text-[8px] max-md:text-[10px] font-bold truncate transition-colors duration-300
                                        ${isActive ? 'text-blue-400' : 'text-white'}`}>
                                        {track.name}
                                    </h4>
                                    <p className="text-[11px] max-sm:text-[8px] max-md:text-[10px] text-gray-500 truncate mt-0.5">
                                        {track.artists?.[0]?.name}
                                    </p>
                                    
                                    {isActive && (
                                        <span className="text-[8px] max-sm:text-[6px] max-md:text-[7px] text-blue-500/80 font-black tracking-[0.2em] 
                                        mt-1.5 animate-pulse uppercase">
                                            Now Playing
                                        </span>
                                    )}
                                </div>

                            </article>
                        )
                    })}
                </div>
            ) : (
                <div className="flex h-[80%] flex-col items-center justify-center py-8 px-4 rounded-4xl border border-dashed border-white/5 bg-white/[0.01]">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
                        <Music size={18} className="text-gray-600" />
                    </div>
                    <p className="text-gray-500 text-[14px] font-medium text-center">
                        Your listening history is empty
                    </p>
                    <p className="text-gray-600 text-[11px] mt-1 text-center max-w-[180px]">
                        Play some tracks to see them here later
                    </p>
                </div>
            )}
        </section>
    )
}
export default RecentlyPlayed
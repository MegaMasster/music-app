import { AnimatePresence , motion } from "framer-motion"

import useControllerStore from "../../../shared/stores/useControllerStore"

const PlayerController = () => {

    const activeTrackId = useControllerStore(state => state.activeTrackId)

    return (
        <section className={`relative flex items-center w-[40%] h-[8.7%] bg-white/2 border border-white/5 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 ${!activeTrackId ? 'px-6' : 'px-2'}`}>
            <AnimatePresence mode="wait">
                {activeTrackId ? (
                    <motion.div
                        key={activeTrackId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        <iframe
                            title="Spotify Player"
                            src={`https://open.spotify.com/embed/track/${activeTrackId}?utm_source=generator&theme=0&autoplay=1`}
                            width="100%" 
                            height="80" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            style={{ 
                                border: 'none', 
                                borderRadius: '16px',
                                display: 'block',
                                margin: '0 auto',
                                padding: '0 auto',
                                filter: 'contrast(1.1) brightness(1.1)'
                            }}
                        />
                    </motion.div>
                ) : (
                    <motion.div className="flex items-center justify-between w-full h-full opacity-40">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl animate-pulse" />
                            <div className="flex flex-col gap-2">
                                <div className="w-24 h-2 bg-white/10 rounded-full animate-pulse" />
                                <div className="w-16 h-1.5 bg-white/10 rounded-full animate-pulse" />
                            </div>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400">
                            Select track to play
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default PlayerController
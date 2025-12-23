import leftSkip from "../../../assets/images/indexIcons/leftSkip.png"
import rightSkip from "../../../assets/images/indexIcons/rightSkip.png"
import pauseController from "../../../assets/images/indexIcons/pauseController.png"
import playController from "../../../assets/images/indexIcons/playController.png"

import useControllerStore from "../../../shared/stores/useControllerStore"

const PlayerController = () => {
    const { isMusicPaused, setIsMusicPaused } = useControllerStore()
    const currentPlayPauseIcon = isMusicPaused ? playController : pauseController 

    return (
        <section className="flex justify-between items-center w-[40%] h-[6%] px-6 
            bg-white/2 border border-white/5 backdrop-blur-md rounded-2xl "
        >
            
            <div className="flex items-center w-[30%] gap-5">
                <button className="w-4 h-4 select-none hover:cursor-pointer group active:scale-90 transition-all">
                    <img 
                        className="opacity-60 group-hover:opacity-100 duration-200" 
                        src={leftSkip} 
                        alt="leftSkip"
                        style={{ filter: 'invert(1)' }}
                    />
                </button>

                <button onClick={setIsMusicPaused} className="w-5 h-5 select-none hover:cursor-pointer group active:scale-90 transition-all">
                    <img 
                        className="opacity-80 group-hover:opacity-100 duration-200" 
                        src={currentPlayPauseIcon} 
                        alt="Play/Pause"
                        style={{ filter: 'invert(1)' }}
                    />
                </button>

                <button className="w-4 h-4 select-none hover:cursor-pointer group active:scale-90 transition-all">
                    <img 
                        className="opacity-60 group-hover:opacity-100 duration-200" 
                        src={rightSkip} 
                        alt="rightSkip" 
                        style={{ filter: 'invert(1)' }}
                    />
                </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 px-4">
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[35%] bg-linear-to-r from-blue-500/60 to-indigo-500/60 shadow-[0_0_8px_rgba(59,130,246,0.2)]" />
                </div>
                <p className="text-[9px] text-gray-500 font-mono mt-1 uppercase tracking-widest">Streaming Mode</p>
            </div>

            <div className="flex items-center justify-end w-[30%]">
                <div className="text-right">
                    <p className="text-[10px] text-white/80 font-bold leading-none">Aurora Lab</p>
                    <p className="text-[8px] text-gray-600 font-mono uppercase tracking-tighter">Active</p>
                </div>
            </div>

        </section>
    )
}

export default PlayerController
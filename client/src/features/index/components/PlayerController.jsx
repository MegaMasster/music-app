import leftSkip from "../../../assets/images/indexIcons/leftSkip.png"
import rightSkip from "../../../assets/images/indexIcons/rightSkip.png"
import pauseController from "../../../assets/images/indexIcons/pauseController.png"
import playController from "../../../assets/images/indexIcons/playController.png"

import useControllerStore from "../../../shared/stores/useControllerStore"

const PlayerController = () => {

    const {
        isMusicPaused,
        setIsMusicPaused
    } = useControllerStore()

    const currentPlayPauseIcon = isMusicPaused ? playController : pauseController 

    return (
        <section className="flex justify-between items-cemter w-[40%] h-[5.5%] border border-white rounded-lg">
            
            <div className="flex items-center w-[30%] gap-2.5 border border-white">
                <button className="w-[18px] h-[18px] select-none
                    transition-all hover:cursor-pointer"
                >
                    <img 
                        className="opacity-100 hover:opacity-65 duration-150" 
                        src={leftSkip} 
                        alt="leftSkip" 
                        style={{ filter: 'invert(1)' }}
                    />
                </button>

                <button onClick={setIsMusicPaused} className="w-[17px] h-[17px] select-none 
                    transition-all hover:cursor-pointer"
                >
                    <img 
                        className="opacity-100 hover:opacity-65 duration-150" 
                        src={currentPlayPauseIcon} 
                        alt="Play/Pause"
                        style={{ filter: 'invert(1)' }}
                    />
                </button>

                <button className="w-[18px] h-[18px] select-none 
                    transition-all hover:cursor-pointer"
                >
                    <img 
                        className="opacity-100 hover:opacity-75 duration-150" 
                        src={rightSkip} 
                        alt="rightSkip" 
                        style={{ filter: 'invert(1)' }}
                    />
                </button>
            </div>

            <div className="">
                <p className="text-white">Тут будет сама музыка с таймером</p>
            </div>

            <div className="">
                <p className="text-white">а тут доп инфа</p>
            </div>

        </section>
    )
}
export default PlayerController
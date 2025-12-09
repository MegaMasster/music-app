import SearchMusicSide from "./SearchMusicSide"
import PlayListSide from "./PlayListSide"

const MainContent = () => {
    return (
        <div className="flex flex-col items-center w-[40%] h-[75%] border border-white rounded-lg">
            <SearchMusicSide/>
            <PlayListSide/>
        </div>
    )
}
export default MainContent
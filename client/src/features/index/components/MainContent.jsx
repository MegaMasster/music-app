import SearchMusicSide from "./SearchMusicSide"
import PlayListSide from "./PlayListSide"
import NavBar from "./NavBar"

const MainContent = () => {
    return (
        <section className="flex flex-col items-center w-[40%] h-[75%] 
            border border-gray-600 rounded-lg bg-[#0f101a]"
        >
            <NavBar/>
            <SearchMusicSide/>
            <PlayListSide/>
        </section>
    )
}
export default MainContent
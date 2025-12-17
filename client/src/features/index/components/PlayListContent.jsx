import PlayListSide from "./PlayListSide"
import NavBar from "./NavBar"

const PlayListContent = () => {
    return (
        <section className="flex flex-col items-center mb-5 w-[40%] h-[75%] 
            border border-gray-600 rounded-lg bg-[#0f101a]"
        >
            <NavBar/>
            <PlayListSide/>
        </section>
    )
}
export default PlayListContent
import Header from "./Header"
import PlayerController from "./PlayerController"
import MainContent from "./MainContent"

const MusicApp = () => {
    return(
        <div className="indexWrapper">
            <Header/>
            <PlayerController/>
            <MainContent/>
        </div>
    )
}
export default MusicApp
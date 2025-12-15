import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="flex justify-start w-[90%] p-3 gap-7 text-white">
            <Link to="">Home</Link>
            <Link to="">PlayList</Link>
        </nav>
    )
}
export default NavBar
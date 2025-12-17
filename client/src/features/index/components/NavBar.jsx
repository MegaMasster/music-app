import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const NavBar = () => {
    
    const links = [
        { path: '/index', label: 'Home' },
        { path: '/play-list/839434', label: 'PlayList' },
    ]

    return (
        <nav className="flex justify-start w-[90%] p-3 gap-7 text-white">
            {links.map((link) => (
                <NavLink
                key={link.path}
                to={link.path}
                className="relative px-4 py-2" 
                >
                {({ isActive }) => (
                    <>
                    <span className="relative z-10">{link.label}</span>

                    {isActive && (
                        <motion.div
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="absolute inset-0 bg-gray-500/30 rounded-md"
                        />
                    )}
                    </>
                )}
                </NavLink>
            ))}
        </nav>
    )
}
export default NavBar
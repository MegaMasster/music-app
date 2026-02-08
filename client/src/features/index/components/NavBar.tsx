import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const NavBar = () => {
    const links = [
        { path: '/index', label: 'Home' },
        { path: '/about-project', label: 'About project' },
    ]

    return (
        <nav className="flex justify-start w-[95%] h-19 p-4 gap-2 text-white">
            {links.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className="relative px-5 py-2.5 max-sm:py-1.5 max-md:py-2 transition-colors duration-300 group"
                >
                    {({ isActive }) => (
                        <>
                            <span className={`relative z-10 text-[14px] max-sm:text-[11px] max-md:text-[12px] font-medium tracking-wide transition-colors duration-300 ${
                                isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                            }`}>
                                {link.label}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="nav-active" 
                                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.03)]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30
                                    }}
                                />
                            )}

                            {isActive && (
                                <motion.div 
                                    layoutId="nav-dot"
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30
                                    }}
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
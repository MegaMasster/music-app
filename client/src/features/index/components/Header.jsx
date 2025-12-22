import { motion } from 'framer-motion'

const Header = () => {
    return (
        <motion.header 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center w-[85%] mt-4 py-3 px-6 bg-white/2 border border-white/5 backdrop-blur-md rounded-2xl"
        >
            {/* Минималистичный индикатор слева для баланса */}
            <div className="absolute left-6 hidden md:flex items-center gap-1.5 opacity-30">
                <div className="w-1 h-1 bg-white rounded-full" />
                <span className="text-[9px] text-white font-mono tracking-[0.2em] uppercase">Lab</span>
            </div>

            <h1 className="text-[24px] font-black tracking-tight text-gradient-aurora select-none">
                Aurora Musics
            </h1>

            {/* Тонкий блик по нижней границе */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
        </motion.header>
    )
}

export default Header
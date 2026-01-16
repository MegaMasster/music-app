import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import logout from '../api/logoutApi'
import useAuthStore from '../../../shared/stores/useAuthStore'
import Loader from "../../../shared/ui/loader/Loader"
import useSearchHistoryStore from '../../../shared/stores/useSearchHistoryStore'

const Header = () => {

    const navigate = useNavigate()

    const setLoading = useAuthStore(state => state.setLoading)
    const setServerError = useAuthStore(state => state.setServerError)
    const resetError = useAuthStore(state => state.resetError)
    const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)

    const setUserId = useSearchHistoryStore(state => state.setUserId)

    const onSubmit = async () => {
        resetError()
        setLoading(true)
        try {
            const result = await logout()
            if (result.success) {
                setUserId(null)
                setIsAuthenticated(false)
                console.log("SUCCESS Logut" , result)
                navigate("/sign-in")
            } else {
                setServerError("Unsuccessful logout, please try again later.")
            }
        } catch (error) {
            setServerError("Unsuccessful logout, please try again later.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.header 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center  mt-4 py-3 px-6 bg-white/2 border border-white/5 backdrop-blur-md rounded-2xl
            w-[calc(100%-32px)] 
            max-w-[700px] 
            min-w-[320px]"
        >

            <Loader/>

            <div className="absolute left-6 hidden md:flex items-center gap-1.5 opacity-30">
                <div className="w-1 h-1 bg-white rounded-full" />
                <span className="text-[9px] text-white font-mono tracking-[0.2em] uppercase">Lab</span>
            </div>

            <h1 className="text-[24px] font-black tracking-tight max-sm:text-[16px] max-md:text-[20px] text-gradient-aurora select-none">
                Aurora Musics
            </h1>

            <div className="absolute right-3 flex items-center">
                <button className="group flex items-center gap-2 rounded-[5px] py-1 border border-transparent 
                    hover:border-white/10 hover:bg-white/5 hover:cursor-pointer transition-all duration-300"
                    onClick={onSubmit}
                >
                    <span className="text-[14px] max-sm:text-[9px] max-md:text-[11px] text-white/30 font-mono tracking-[0.2em]
                    uppercase group-hover:text-rose-500/70 transition-colors font-medium">
                        Logout
                    </span>
                    <LogOut 
                        size={16} 
                        className="text-white/30 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all duration-300" 
                    />
                </button>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
        </motion.header>
    )
}

export default Header
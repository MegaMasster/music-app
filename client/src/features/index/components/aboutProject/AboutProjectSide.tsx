import { useForm  , SubmitHandler  } from 'react-hook-form'
import { motion } from 'framer-motion'
import { 
    Github, 
    ExternalLink, 
    Send, 
    Sparkles, 
    Globe, 
    Music, 
    Cpu, 
    Server 
} from 'lucide-react'

import NavBar from "../NavBar"
import feedbackApi from "../../api/feedbackApi"
import useAuthStore from "../../../../shared/stores/useAuthStore"
import useIndexStore from "../../../../shared/stores/useIndexStore"
import Loader from "../../../../shared/ui/loader/Loader"

interface FeedbackData {
    userEmail: string
    problemText: string
}

const AboutProjectSide = () => {

    const {
        serverError,
        setServerError,
        isError,
        setLoading
    } = useAuthStore()
    
    const {
        setSuccessFeedback,
        successFeedback,
        isSuccessFeedback,
    } = useIndexStore()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<FeedbackData>({mode: "onTouched"})

    const frontendStack = [
        { name: "React 19 / vite", color: "bg-blue-400" },
        { name: "JavaScript (ES6+)", color: "bg-yellow-400" },
        { name: "FSD Architecture", color: "bg-orange-500" },
        { name: "React Hook Form", color: "bg-[#ec5990]" },
        { name: "Zustand", color: "bg-purple-500" },
        { name: "Tailwind v4", color: "bg-cyan-400" },
        { name: "Framer Motion", color: "bg-pink-500" },
        { name: "TanStack Query", color: "bg-yellow-500" }
    ]

    const backendStack = [
        { name: "Node.js / Express", color: "bg-amber-500" },
        { name: "PostgreSQL", color: "bg-blue-700" }, 
        { name: "Spotify Web API", color: "bg-green-500" },
        { name: "reCAPTCHA v2", color: "bg-blue-400" },
    ]

    const onSubmit = async (data: FeedbackData) => {
        try {
            setLoading(true)
            const result = await feedbackApi(data)
            if (result.success) {
                reset()
                setServerError("")
                setSuccessFeedback("Successfully sent to the author")
            } else {
                setServerError("There are some problems, try again later.")
                setSuccessFeedback("")
            }
        } catch (error) {
            setServerError("There are some problems, try again later.")
            setSuccessFeedback("")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="relative flex flex-col items-center bg-[#0f101a] text-gray-200 rounded-2xl">

            <Loader/>

            <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
            
            <NavBar />

            <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }}  
                className="relative z-10 w-full max-w-[1200px] mx-auto px-10 py-10 space-y-12"
            >

                <div className="flex flex-col gap-8 md:gap-10 border-b border-white/5 pb-12">
                    <div className="flex items-center gap-6 md:gap-10">
                        <div className="relative shrink-0">
                            <div className="absolute -inset-2 bg-linear-to-r from-green-500/20 to-blue-600/20 rounded-3xl blur-xl"></div>
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-35 md:h-35 lg:w-40 lg:h-40 bg-[#161722] rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center">
                                <Music className="text-green-500 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight flex items-center gap-3">
                            Music App Project <Sparkles className="text-green-400 shrink-0" size={24} />
                        </h1>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl font-light">
                            I spent about 2 month building this project to truly level up my development skills. 
                            On the frontend, I implemented <span className="text-white font-medium italic">FSD (Feature-Sliced Design)</span> architecture 
                            to keep the codebase clean, while ensuring <span className="text-white font-medium">seamless, non-stop music playback</span> during navigation. 
                            <span className="block mt-2 opacity-50 italic">(I'm not a designer!!)</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10">
                    <div className="w-full lg:w-[65%] space-y-10 order-2 lg:order-1">
                        
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                                <Globe size={14} /> Frontend Stack
                            </h3>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {frontendStack.map((tech) => (
                                    <span key={tech.name} className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-xl 
                                        text-xs sm:text-sm transition-all hover:bg-white/10"
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${tech.color}`} />
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-green-500">
                                <Server size={14} /> Backend & Database
                            </h3>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {backendStack.map((tech) => (
                                    <span key={tech.name} className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm transition-all
                                        hover:bg-white/10"
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${tech.color}`} />
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                            <div className="p-5 sm:p-6 bg-white/[0.02] rounded-3xl border border-white/10 space-y-3">
                                <div className="flex items-center gap-2 text-blue-400">
                                    <Server size={18} />
                                    <h4 className="text-white font-semibold italic">PostgreSQL</h4>
                                </div>
                                <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed">
                                    Used as the primary relational database to store user data and app states. 
                                    It ensures <b>data integrity</b> and provides high-speed query performance for the backend.
                                </p>
                            </div>
                            
                            <div className="p-5 sm:p-6 bg-white/[0.02] rounded-3xl border border-white/10 space-y-3">
                                <div className="flex items-center gap-2 text-green-500">
                                    <Cpu size={18} />
                                    <h4 className="text-white font-semibold italic">Spotify Web API</h4>
                                </div>
                                <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed">
                                    Deeply integrated Spotify's data layer via <b>Client Credentials Flow</b>. 
                                    Handles real-time data fetching for tracks, albums, and artist metadata.
                                </p>
                            </div>
                        </div>
                    </div>

                    <aside className="w-full lg:w-[35%] lg:sticky lg:top-10 order-1 lg:order-2">
                        <div className="bg-[#161722] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-white font-bold flex items-center gap-2 text-lg sm:text-xl">
                                    <Send size={24} className="text-blue-500 sm:size-[30px]" /> Bugs / Feedback
                                </h3>
                                <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-tight">Report any glitches or share ideas</p>
                            </div>
                            
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <input 
                                    {...register("userEmail" , { required: "Enter email address" })}
                                    placeholder="Email"
                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 sm:py-4 text-sm 
                                    focus:border-blue-500/50 outline-none transition-all"
                                />
                                <textarea 
                                    {...register("problemText" , { required: "Enter bugs" })}
                                    placeholder="What's wrong or what to add?"
                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 sm:py-4 text-sm h-32 sm:h-36 focus:border-blue-500/50 
                                    outline-none resize-none transition-all"
                                />
                                <button className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg 
                                    shadow-blue-600/20 active:scale-95 hover:cursor-pointer text-sm sm:text-base"
                                >
                                    Submit Report
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>

            <div className="pt-12 border-t border-white/5 flex flex-col gap-8 sm:flex-row sm:justify-between sm:items-center">
                <a 
                    href="https://github.com/MegaMasster/music-app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 sm:gap-5 px-6 py-4 sm:px-8 sm:py-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 
                    transition-all duration-300 shadow-lg shadow-black/20 w-full sm:w-auto justify-center sm:justify-start"
                >
                    <Github size={24} className="shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest truncate">Project GitHub</p>
                        <p className="text-[9px] sm:text-[10px] text-gray-600 font-mono truncate">MegaMasster/music-app</p>
                    </div>
                    <ExternalLink size={16} className="ml-2 sm:ml-4 text-gray-700 group-hover:text-white transition-all transform group-hover:translate-x-1 shrink-0" />
                </a>

                <p className="text-[11px] sm:text-[12px] text-gray-700 font-mono tracking-[0.2em] text-center sm:text-right uppercase">
                    by Gleb Filin ©2025
                </p>
            </div>
            </motion.div>
        </section>
    )
}

export default AboutProjectSide
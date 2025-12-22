import { motion } from 'framer-motion'
import { 
    Github, 
    Code2, 
    ExternalLink, 
    ShieldCheck,  
    Send, 
    Sparkles, 
    Globe, 
    Music, 
    Cpu, 
    Server 
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import NavBar from "./NavBar"

const AboutProjectSide = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const frontendStack = [
        { name: "JavaScript (ES6+)", color: "bg-yellow-400" },
        { name: "React 19 / vite", color: "bg-blue-400" },
        { name: "FSD Architecture", color: "bg-orange-500" },
        { name: "React Hook Form", color: "bg-[#ec5990]" },
        { name: "Zustand", color: "bg-purple-500" },
        { name: "Tailwind v4", color: "bg-cyan-400" },
        { name: "Framer Motion", color: "bg-pink-500" },
    ]

    const backendStack = [
        { name: "Node.js / Express", color: "bg-amber-500" },
        { name: "PostgreSQL", color: "bg-blue-700" }, 
        { name: "Spotify Web API", color: "bg-green-500" },
        { name: "reCAPTCHA v3", color: "bg-blue-400" },
    ]

    const onSubmit = (data) => console.log("Message received:", data);

    return (
        <section className="relative flex flex-col items-center w-full h-full bg-[#0f101a] text-gray-200 overflow-y-auto no-scrollbar scroll-smooth">

            <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
            
            <NavBar />

            <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }}  
                className="relative z-10 w-full max-w-[1200px] mx-auto px-10 py-10 space-y-12"
            >

                <div className="flex items-center gap-10 border-b border-white/5 pb-12">
                    <div className="relative shrink-0">
                        <div className="absolute -inset-2 bg-linear-to-r from-green-500/20 to-blue-600/20 rounded-3xl blur-xl"></div>
                        <div className="relative w-40 h-40 bg-[#161722] rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center">
                            <Music className="text-green-500" size={64} />
                        </div>
                    </div>
                    
                    <div className="flex flex-col">
                        <h1 className="text-5xl font-bold text-white tracking-tight flex items-center gap-4">
                            Music App Project <Sparkles className="text-green-400" size={32} />
                        </h1>
                        <p className="text-gray-400 mt-4 text-xl leading-relaxed max-w-3xl font-light">
                            I spent about a month building this project to truly level up my development skills. 
                            On the frontend, I implemented <span className="text-white font-medium italic">FSD (Feature-Sliced Design)</span> architecture 
                            to keep the codebase clean, while ensuring <span className="text-white font-medium">seamless, non-stop music playback</span> during navigation. 
                            (I'm not a designer!!)
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-10">
                    
                    <div className="w-[65%] space-y-10">
                        
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                                <Globe size={14} /> Frontend Stack
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {frontendStack.map((tech) => (
                                    <span key={tech.name} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl 
                                        text-sm transition-all hover:bg-white/10"
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
                            <div className="flex flex-wrap gap-3">
                                {backendStack.map((tech) => (
                                    <span key={tech.name} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm transition-all
                                        hover:bg-white/10"
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${tech.color}`} />
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                            <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/10 space-y-3">
                                <div className="flex items-center gap-2 text-blue-400">
                                    <Server size={18} />
                                    <h4 className="text-white font-semibold italic">PostgreSQL</h4>
                                </div>
                                <p className="text-[13px] text-gray-500 leading-relaxed">
                                    Used as the primary relational database to store user data and app states. 
                                    It ensures <b>data integrity</b> and provides high-speed query performance for the backend.
                                </p>
                            </div>
                            
                            <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/10 space-y-3">
                                <div className="flex items-center gap-2 text-green-500">
                                    <Cpu size={18} />
                                    <h4 className="text-white font-semibold italic">Spotify Web API</h4>
                                </div>
                                <p className="text-[13px] text-gray-500 leading-relaxed">
                                    Deeply integrated Spotify's data layer via <b>Client Credentials Flow</b>. 
                                    Handles real-time data fetching for tracks, albums, and artist metadata.
                                </p>
                            </div>
                        </div>
                    </div>

                    <aside className="w-[35%] sticky top-10">
                        <div className="bg-[#161722] p-8 rounded-3xl border border-white/10 space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-white font-bold flex items-center gap-2 text-xl">
                                    <Send size={20} className="text-blue-500" /> Bugs / Feedback
                                </h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-tight">Report any glitches or share ideas</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <input 
                                    {...register("email", { required: true })}
                                    placeholder="Email"
                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-sm focus:border-blue-500/50 outline-none transition-all"
                                />
                                <textarea 
                                    {...register("message", { required: true })}
                                    placeholder="What's wrong or what to add?"
                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-sm h-36 focus:border-blue-500/50 
                                    outline-none resize-none transition-all"
                                />
                                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg 
                                    shadow-blue-600/20 active:scale-95 hover:cursor-pointer"
                                >
                                    Submit Report
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>

                <div className="pt-12 border-t border-white/5 flex justify-between items-center">
                    <a 
                        href="https://github.com/MegaMasster/music-app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-5 px-8 py-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 
                        transition-all duration-300 shadow-lg shadow-black/20"
                    >
                        <Github size={24} />
                        <div>
                            <p className="text-xs font-bold text-white uppercase tracking-widest">Project GitHub</p>
                            <p className="text-[10px] text-gray-600 font-mono">MegaMasster/music-app</p>
                        </div>
                        <ExternalLink size={16} className="ml-4 text-gray-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                    </a>
                    <p className="text-[12px] text-gray-700 font-mono tracking-widest">by Gleb Filin ©2025</p>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutProjectSide
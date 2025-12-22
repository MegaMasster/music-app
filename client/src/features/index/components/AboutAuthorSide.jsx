import { motion } from 'framer-motion';
import { 
    Github, Code2, ExternalLink, 
    ShieldCheck, Server, Send, Sparkles, Globe 
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import NavBar from "./NavBar";

const AboutAuthorSide = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const techStack = [
        { name: "React 19", color: "bg-blue-400" },
        { name: "Tailwind v4", color: "bg-cyan-400" },
        { name: "Node.js / Express", color: "bg-green-500" },
        { name: "Zustand", color: "bg-purple-500" },
        { name: "React Hook Form", color: "bg-[#ec5990]" },
        { name: "reCAPTCHA v2", color: "bg-blue-600" }
    ];

    const onSubmit = (data) => console.log("Message received:", data);

    return (
        <section className="relative flex flex-col items-center w-full h-full bg-[#0f101a] text-gray-200 overflow-y-auto no-scrollbar scroll-smooth">
            {/* Ambient Glows */}
            <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

            <NavBar />

            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}  
                transition={{ 
                    duration: 0.4,         
                    ease: "easeOut"         
                }}
                className="relative z-10 w-full max-w-[1200px] mx-auto px-10 py-10 space-y-12"
            >
                <div className="flex items-center gap-10 border-b border-white/5 pb-12">
                    <div className="relative shrink-0">
                    <div className="absolute -inset-2 bg-linear-to-r from-blue-600/40 to-purple-600/40 rounded-3xl blur-xl transition duration-1000 group-hover:opacity-100"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/30 blur-[50px] rounded-full"></div>
                    <div className="relative w-40 h-40 bg-[#161722] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                        <img 
                            src="https://github.com/MegaMasster.png"    
                            alt="Developer photo" 
                            className="w-full h-full object-cover select-none"
                        />
                    </div>
                </div>
                    
                    <div className="flex flex-col">
                        <h1 className="text-5xl font-bold text-white tracking-tight flex items-center gap-4">
                            Frontend Developer <Sparkles className="text-yellow-400" size={32} />
                        </h1>
                        <p className="text-gray-400 mt-4 text-xl leading-relaxed max-w-2xl">
                            I am a <span className="text-white font-medium">Frontend Engineer</span> dedicated to writing clean, maintainable code and building high-performance web applications. 
                            I focus on creating seamless user experiences through optimized performance and scalable architecture.
                        </p>
                    </div>
                </div>

                {/* Main Content - Fixed 2-column layout (No responsive stack) */}
                <div className="flex items-start gap-10">
                    
                    {/* Left Side: Skills & Bio (65% width) */}
                    <div className="w-[65%] space-y-10">
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                                <Code2 size={18} /> Tech Stack For This Project
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {techStack.map((tech) => (
                                    <span  key={tech.name} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 
                                        rounded-xl text-sm transition-all hover:border-white/20 hover:bg-gray-800"
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${tech.color}`} />
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Frontend & Backend Breakdown */}
                        <div className="flex gap-5">
                            <div className="flex-1 p-6 bg-white/[0.03] rounded-3xl border border-blue-500/20 space-y-3 relative">
                                <div className="absolute top-0 right-0 p-2 bg-blue-500 text-white text-[9px] font-bold uppercase 
                                    tracking-widest px-3 rounded-bl-xl"
                                >Main Role</div>
                                <Globe className="text-blue-400" size={20} />
                                <h4 className="text-white font-semibold text-lg">Frontend Focus</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Creating fast, responsive, and beautiful interfaces. I make sure everything works smoothly for the user.
                                </p>
                            </div>

                            <div className="flex-1 p-6 bg-white/[0.01] rounded-3xl border border-white/5 space-y-3">
                                <Server className="text-green-400" size={20} />
                                <h4 className="text-white font-semibold text-lg">Backend Knowledge</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    I can build servers with Node.js and Express to manage data and connect external APIs.
                                </p>
                            </div>
                        </div>

                        {/* Security Info */}
                        <div className="p-6 bg-linear-to-br from-white/5 to-transparent rounded-3xl border border-white/5 flex items-start gap-5">
                            <ShieldCheck className="text-blue-500 shrink-0" size={24} />
                            <p className="text-sm text-gray-400 leading-relaxed">
                                High performance meets security. I use <span className="text-white font-medium text-xs">reCAPTCHA v2</span> and 
                                <span className="text-white font-medium text-xs ml-1">React Hook Form</span> to protect and optimize every site.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Contact Form (35% width) */}
                    <div className="w-[35%] sticky top-10">
                        <div className="bg-[#161722] p-8 rounded-3xl border border-white/10 space-y-6">
                            <h3 className="text-white font-bold flex items-center gap-2 text-xl">
                                <Send size={20} className="text-blue-500" /> Contact Me
                            </h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <input 
                                    {...register("email", { required: true })}
                                    placeholder="Email"
                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-sm 
                                    focus:border-blue-500/50 outline-none"
                                />
                                <textarea 
                                    {...register("message", { required: true })}
                                    placeholder="Message..."
                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 text-sm h-36 
                                    focus:border-blue-500/50 outline-none resize-none"
                                />
                                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold 
                                    transition-all shadow-lg shadow-blue-600/20 active:scale-95 hover:cursor-pointer"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="pt-12 border-t border-white/5 flex justify-between items-center">
                    <a 
                        href="https://github.com/MegaMasster/music-app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-5 px-8 py-5 bg-white/5 hover:bg-white/10 rounded-2xl border 
                        border-white/5 transition-all duration-300"
                    >
                        <Github size={28} />
                        <div>
                            <p className="text-sm font-bold text-white">Project GitHub</p>
                            <p className="text-xs text-gray-500 font-mono">MegaMasster/music-app</p>
                        </div>
                        <ExternalLink size={18} className="ml-6 text-gray-600 group-hover:text-white transform group-hover:translate-x-1 transition-all" />
                    </a>
                    <p className="text-[11px] text-gray-700 font-mono uppercase tracking-[0.4em]">
                        Developed by Gleb ©2025
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutAuthorSide;
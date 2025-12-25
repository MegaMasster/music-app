import { Link } from 'react-router-dom'
import { FileQuestion, ArrowLeft, Sparkles } from 'lucide-react'

const NotFound = () => {
    return (
        <main className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#0f101a] text-gray-200 overflow-hidden px-6">
            
            <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-10 max-w-2xl">
                
                <div className="flex items-center gap-8 md:gap-12">
                    <div className="flex flex-col items-end">
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter opacity-20">
                            404
                        </h1>
                    </div>

                    <div className="h-20 md:h-28 w-px bg-white/10"></div>

                    <div className="space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            Lost in space <Sparkles className="text-blue-400" size={24} />
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
                            The page you're looking for doesn't exist <br className="hidden md:block" /> 
                            or has been moved to another dimension.
                        </p>
                    </div>
                </div>

                <Link 
                    to="/" 
                    className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 shadow-xl"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-blue-400" />
                    Back to reality
                </Link>

                <div className="flex items-center gap-2 text-gray-700 mt-4">
                    <FileQuestion size={14} />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold italic">Page Not Found</span>
                </div>
            </div>
        </main>
    )
}
export default NotFound
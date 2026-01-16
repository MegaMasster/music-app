import useAuthStore from "../../stores/useAuthStore"

const Loader = () => {
    const { isLoading } = useAuthStore()

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-[#0f101a]/60 backdrop-blur-md flex justify-center items-center z-[100]">
                    <div className="relative flex items-center justify-center">
                        
                        <div className="absolute w-24 h-24 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />

                        <div className="flex items-end gap-[4px] h-10 relative z-10">
                            {[
                                { h: '60%', d: '0.1s' },
                                { h: '100%', d: '0.3s' },
                                { h: '70%', d: '0.5s' },
                                { h: '90%', d: '0.2s' },
                                { h: '50%', d: '0.4s' }
                            ].map((bar, i) => (
                                <div
                                    key={i}
                                    className="w-[4px] bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                                    style={{
                                        height: bar.h,
                                        animation: `music-bounce 1s ease-in-out infinite`,
                                        animationDelay: bar.d
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <style jsx>{`
                        @keyframes music-bounce {
                            0%, 100% { 
                                height: 30%; 
                                opacity: 0.7;
                            }
                            50% { 
                                height: 100%; 
                                opacity: 1;
                                transform: translateY(-2px);
                            }
                        }
                    `}</style>
                </div>
            )}
        </>
    )
}

export default Loader
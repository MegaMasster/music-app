import useAuthStore from "../../stores/useAuthStore"

const Loader = () => {
    const { isLoading } = useAuthStore()

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-[#0f101a]/60 backdrop-blur-sm flex justify-center items-center z-100">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-14 h-14 border-4 border-white/5 rounded-full"></div>
                        
                        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                        
                        <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Loader
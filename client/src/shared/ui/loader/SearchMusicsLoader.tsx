import useIndexStore from "../../stores/useIndexStore"

const SearchMusicsLoader = () => {

    const musicLoading = useIndexStore(state => state.musicLoading)

    return (
        <>
            {musicLoading && (
                <div className="flex items-center justify-center w-full h-full min-h-[100px]">
                    <div className="relative flex items-center justify-center">
                        
                        <div className="absolute w-12 h-12 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />

                        <div className="flex items-end gap-[3px] h-5 relative z-10">
                        {[
                            { h: '60%', d: '0.1s' },
                            { h: '100%', d: '0.3s' },
                            { h: '70%', d: '0.5s' },
                            { h: '90%', d: '0.2s' },
                            { h: '50%', d: '0.4s' }
                        ].map((bar, i) => (
                            <div
                            key={i}
                            className="w-[2px] bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            style={{
                                height: bar.h,
                                animation: `music-bounce 1s ease-in-out infinite`,
                                animationDelay: bar.d
                            }}
                            />
                        ))}
                        </div>
                    </div>
                    {/* @ts-expect-error: styled-jsx is not in React types */}
                    <style jsx>{`
                        @keyframes music-bounce {
                        0%, 100% { height: 30%; transform: translateY(0); }
                        50% { height: 100%; transform: translateY(-2px); }
                        }
                    `}</style>
                </div>
            )}
        </>
    )
}
export default SearchMusicsLoader
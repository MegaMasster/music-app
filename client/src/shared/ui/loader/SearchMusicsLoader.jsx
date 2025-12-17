import useIndexStore from "../../stores/useIndexStore"

const SearchMusicsLoader = () => {

    const {
        musicLoading
    } = useIndexStore()

    return (
        <>
            {musicLoading && (
                <div className="fixed flex justify-center items-center z-50">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </>
    )
}
export default SearchMusicsLoader
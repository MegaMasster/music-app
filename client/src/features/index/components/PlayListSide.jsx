import { useLocation } from "react-router-dom"

import { ROUTES } from "../../../routing/routes"

const PlayListSide = () => {

    const location = useLocation()
    const isAboutPage = location.pathname === ROUTES.ABOUT_AUTHOR

    return (
        <>
            <h1 className={`${isAboutPage ? "hidden" : "text-white"}`}>Play List</h1>
        </>
    )
}
export default PlayListSide
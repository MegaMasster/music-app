import { Navigate } from "react-router-dom"

import useAuthStore from "../../shared/stores/useAuthStore"
import { ROUTES } from "../routes";

const PublicRoute = ({children}) => {
    const {
        isAuthenticated, 
        isEmailVerified
    } = useAuthStore()

    if (isAuthenticated) {
        if (isEmailVerified) {
            return <Navigate to={ROUTES.INDEX} replace/>
        } else {
            return <Navigate to={ROUTES.VERIFY_EMAIL} replace/>
        }
    }

    return children
}
export default PublicRoute
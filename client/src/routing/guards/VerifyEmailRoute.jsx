import { Navigate } from "react-router-dom"

import useAuthStore from "../../shared/stores/useAuthStore"
import { ROUTES } from "../routes";

const VerifyEmailRoute = ({children}) => {
    const {
        isAuthenticated, 
        isEmailVerified
    } = useAuthStore()

    if (!isAuthenticated) {
        return <Navigate to = {ROUTES.SIGN_IN} replace/>
    }
    if (isEmailVerified) {
        return <Navigate to = {ROUTES.USER_NAME} replace/>
    }

    return children
}
export default VerifyEmailRoute
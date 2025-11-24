import { Navigate } from "react-router-dom"

import useAuthStore from "../../shared/stores/useAuthStore"
import { ROUTES } from "../routes";

const UserNameRoute = ({children}) => {
    const {
        isAuthenticated, 
        isEmailVerified,
        isUserNameSet
    } = useAuthStore()

    if (!isAuthenticated) {
        return <Navigate to = {ROUTES.SIGN_IN} replace/>
    }
    if (!isEmailVerified) {
        return <Navigate to = {ROUTES.VERIFY_EMAIL} replace/>
    }
    if (isUserNameSet) {
        return <Navigate to = {ROUTES.INDEX} replace/>
    }

    return children
}
export default UserNameRoute
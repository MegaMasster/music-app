import { Navigate , Outlet} from "react-router-dom"

import useAuthStore from "../../shared/stores/useAuthStore"
import { ROUTES } from "../routes";

const ProtectedRoute = () => {
    const {
        isAuthenticated, 
        isEmailVerified
    } = useAuthStore()

    if (!isAuthenticated) {
        return <Navigate to = {ROUTES.SIGN_IN} replace/>
    }
    if (!isEmailVerified) {
        return <Navigate to = {ROUTES.VERIFY_EMAIL} replace/>
    }

    return <Outlet />
}
export default ProtectedRoute
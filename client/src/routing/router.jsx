import { lazy , Suspense , useEffect } from "react"
import { BrowserRouter , Routes , Route , Navigate } from "react-router-dom"

import { authApi } from "../features/auth/api/authApi"
import useAuthStore from "../shared/stores/useAuthStore"
import useSearchHistoryStore from '../shared/stores/useSearchHistoryStore'
import useControllerStore from '../shared/stores/useControllerStore'
import useRecentlyPlayedStore from "../features/index/components/searhSide/model/useRecentlyPlayedStore"

import { ROUTES } from "./routes"
import PublicRoute from "./guards/PublicRoute"
import ProtectedRoute from "./guards/ProtectedRoute"
import VerifyEmailRoute from "./guards/VerifyEmailRoute"

const SignInPage = lazy(() => import("../pages/authPages/SignInPage"))
const SignUpPage = lazy(() => import("../pages/authPages/SignUpPage"))
const ForgotPassPage = lazy(() => import("../pages/authPages/ForgotPassPage"))
const NotFoundPage = lazy(() => import("../pages/errorPages/NotFoundPage"))
const VerifyEmailPage = lazy(() => import("../pages/authPages/VerifyEmailPage"))
const ResetPasswordPage = lazy(() => import("../pages/authPages/ResetPasswordPage"))

const MainLayoutPage = lazy(() => import("../pages/MainLayoutPages/MainLayoutPage"))
const AboutProjectPage = lazy(() => import("../pages/MainLayoutPages/AboutProjectPage"))
const IndexPage = lazy(() => import("../pages/MainLayoutPages/IndexPage"))
const TrackListPopupPage = lazy(() => import("../pages/MainLayoutPages/TrackListPopupPage"))

const Router = () => { 

    const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)
    const setIsEmailVerified = useAuthStore(state => state.setIsEmailVerified)
    const clearUserEmail = useAuthStore(state => state.clearUserEmail)

    const setUserIdHistory = useSearchHistoryStore(state => state.setUserId)
    const setUserIdController = useControllerStore(state => state.setUserId)
    const setUserIdRecentlyPlayed = useRecentlyPlayedStore(state => state.setUserId)

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const result = await authApi.verifyToken()
                if (result.success) {
                    setIsAuthenticated(true)
                    setIsEmailVerified(true)
                    clearUserEmail()
                    setUserIdRecentlyPlayed(result.id)
                    setUserIdHistory(result.id)
                    setUserIdController(result.id)
                } else {
                    setIsAuthenticated(false)
                    setIsEmailVerified(false)
                }
            } catch (error) {
                console.error("Token verification failed:", error)
                setIsAuthenticated(false)
                setIsEmailVerified(false)
            }
        }
        verifyToken()
    } , [])

    return (
        <BrowserRouter>

            <Suspense fallback={
                <div className="wrapper">
                    <p className="text-lg text-blue-500">Loading...</p>
                </div>
            }>

                <Routes>

                    <Route 
                        path = {ROUTES.ROOT} 
                        element = {<Navigate to={ROUTES.SIGN_IN}/>}
                    />

                    <Route
                        path = {ROUTES.SIGN_IN}
                        element = { 
                            <PublicRoute>
                                <SignInPage />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path={ROUTES.SIGN_UP}
                        element = {
                            <PublicRoute>
                                <SignUpPage />  
                            </PublicRoute>
                        }
                    />

                    <Route
                        path={ROUTES.FORGOT_PASSWORD}
                        element = {
                            <PublicRoute>
                                <ForgotPassPage />
                            </PublicRoute>
                        }
                    />
                    
                    <Route
                        path={ROUTES.VERIFY_EMAIL}
                        element = {
                            <VerifyEmailRoute>
                                <VerifyEmailPage />
                            </VerifyEmailRoute>
                        }
                    />

                    <Route
                        path={ROUTES.RESET_PASSWORD}
                        element = {
                            <PublicRoute>
                                <ResetPasswordPage />
                            </PublicRoute>
                        }
                    />

                    <Route element={<ProtectedRoute />}>
                        <Route element={<MainLayoutPage />}>

                            <Route path={ROUTES.INDEX} element={<IndexPage /> }> 
                                <Route path={ROUTES.PLAYLIST} element={<TrackListPopupPage />} />
                            </Route>

                            <Route path={ROUTES.ABOUT_AUTHOR} element={<AboutProjectPage />} />

                        </Route>
                    </Route>

                    <Route
                        path="*"
                        element = {
                            <NotFoundPage />
                        }
                    />

                </Routes>

            </Suspense>

        </BrowserRouter>
    )
}
export default Router
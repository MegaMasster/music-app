import { lazy , Suspense } from "react"
import { BrowserRouter , Routes , Route , Navigate } from "react-router-dom"

import { ROUTES } from "./routes"
import PublicRoute from "./guards/PublicRoute"
import ProtectedRoute from "./guards/ProtectedRoute"
import VerifyEmailRoute from "./guards/VerifyEmailRoute"

const SignInPage = lazy(() => import("../pages/authPages/SignInPage"))
const SignUpPage = lazy(() => import("../pages/authPages/SignUpPage"))
const ForgotPassPage = lazy(() => import("../pages/authPages/ForgotPassPage"))
const NotFoundPage = lazy(() => import("../pages/errorPages/NotFoundPage"))
const IndexPage = lazy(() => import("../pages/indexPage/IndexPage"))
const VerifyEmailPage = lazy(() => import("../pages/authPages/VerifyEmailPage"))

const Router = () => { 

    return (
        <BrowserRouter>

            <Suspense fallback={
                <div className="wrapper">
                    <p className="text-lg text-amber-600">Loading...</p>
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
                        path={ROUTES.FORGOT}
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
                        path={ROUTES.INDEX}
                        element = {
                            <ProtectedRoute>
                                <IndexPage />
                            </ProtectedRoute>
                        }
                    />

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
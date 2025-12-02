import { Link , useLocation} from 'react-router-dom'
import { useState , useEffect } from 'react'

import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'
import { authApi } from '../api/authApi'
import AuthErrorHandler from "../../utils/auth/authErrorHandler"
import CodeInput from './codeInputs'

const VerifyEmail = () => {

    const location = useLocation()

    const { 
        setIsEmailVerified,
        setIsAuthenticated,
        setLoading,
        isLoading,
        setServerError,
        serverError,
        isError,
        resetError,
        userEmail,
        clearUserEmail
    } = useAuthStore()

    const [verificationCode, setVerificationCode] = useState('')

    useEffect(() => {
        document.title = "Verify email - AuroraSounds"
        resetError()
    } , [location])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!verificationCode || verificationCode.length !== 6) {
            return
        }

        resetError()
        setLoading(true)
        
        try {
            const requestData = {
                email: userEmail,
                code: verificationCode
            }

            console.log(" Sending request data:", requestData)

            const result = await authApi.verifyEmail(requestData)

            console.log("📥 Response from server:", result)

            if (result.success) {
                setIsEmailVerified(true)
                clearUserEmail()
                setVerificationCode('')
            } else {
                const errorMessage = AuthErrorHandler.handlerVerifyEmailError(result)
                setServerError(errorMessage)
                setVerificationCode('')
            }
        } catch (error) {
            const errorMessage = AuthErrorHandler.handlerVerifyEmailError(error)
            setServerError(errorMessage)
            setVerificationCode('')
        } finally {
            setLoading(false)
        }
    }

    const handleCodeComplete = (code) => {
        setVerificationCode(code)
        resetError()
    }

    const setIsAuthenticatedFunction = () => {
        setIsAuthenticated(false)
    }

    return (
        <main className="wrapper">

            {isLoading && (
                <div className="fixed inset-0 bg-opacity-5 backdrop-blur-md flex justify-center items-center z-50">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <AuthAnim className="flex flex-col justify-evenly w-90 h-90 rounded-2x">

                <div className="flex flex-col justify-between items-center">

                    <div className='flex justify-between items-center w-full'>
                        <h1 className="text-2xl">Verify email</h1>
                        <button
                            onClick={setIsAuthenticatedFunction}
                        >    
                            <Link to="/sign-in" className="underline opacity-40 hover:text-amber-600 transition-colors">
                                Back to sign in?
                            </Link>
                        </button>
                    </div>

                    <div className="flex flex-col justify-center items-center mt-5 text-sm">
                        <p className="text-amber-100">We sent a passcode to</p>
                        <strong className='text-amber-200'>{userEmail}</strong>
                        <p className='text-amber-100'>Please check your inbox.</p>
                    </div>

                </div>

                {isError && (
                    <div className='flex w-full justify-center items-center mt-5'>
                        <p className='text-md text-rose-600'>{serverError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col justify-evenly items-center h-[65%]">
                    
                    <CodeInput onCodeComplete={handleCodeComplete} />

                    <button
                        type='submit' 
                        className='text-lg w-full h-11 bg-amber-500 rounded 
                        hover:bg-amber-400 hover:translate-x-2 hover:cursor-pointer active:scale-95
                        transition-all duration-250'
                    >
                        {isLoading ? "Veryfying..." : "Continue"}
                    </button>
                </form>
            </AuthAnim>
        </main>
    )
}
export default VerifyEmail
import { Link , useLocation} from 'react-router-dom'
import { useState , useEffect } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'
import { authApi } from '../api/authApi'
import AuthErrorHandler from "../../utils/auth/authErrorHandler"
import CodeInput from './codeInputs'
import Loader from '../../../shared/ui/loader/Loader'

const VerifyEmail = () => {

    const setIsEmailVerified = useAuthStore(state => state.setIsEmailVerified)
    const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)
    const userEmail = useAuthStore(state => state.userEmail)
    const resetError = useAuthStore(state => state.resetError)
    const setLoading = useAuthStore(state => state.setLoading)
    const isLoading = useAuthStore(state => state.isLoading)
    const serverError = useAuthStore(state => state.serverError)
    const setServerError = useAuthStore(state => state.setServerError)
    const isError = useAuthStore(state => state.isError)
    const clearUserEmail = useAuthStore(state => state.clearUserEmail)

    const location = useLocation()
    useEffect(() => {
        document.title = "Verify email - AuroraMusics"
        resetError()
    } , [location])

    const [verificationCode, setVerificationCode] = useState('')
    
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
            const result = await authApi.verifyEmail(requestData)
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
        <main className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#0f101a] text-gray-200 overflow-hidden px-6">
            <Loader />

            <AuthAnim className="relative z-10 w-full max-w-[400px]">
                
                <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Verify email</h1>
                        <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] mt-1 font-medium italic">Check your inbox</p>
                    </div>
                    <button onClick={setIsAuthenticatedFunction}>    
                        <Link to="/sign-in" className="text-sm flex items-center gap-2 underline opacity-40 hover:opacity-100 hover:text-blue-400 transition-all">
                            <ArrowLeft size={14} /> Back
                        </Link>
                    </button>
                </div>

                <div className="flex flex-col justify-center items-center mb-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-center">
                    <p className="text-sm text-gray-400">We sent a passcode to</p>
                    <strong className='text-blue-400 font-semibold my-1'>{userEmail}</strong>
                    <p className='text-[12px] text-gray-500 font-light'>Please enter the 6-digit code below.</p>
                </div>

                {isError && (
                    <div className='flex w-full justify-center items-center mb-6'>
                        <p className='text-sm text-rose-600 font-medium bg-rose-600/10 w-full py-2 rounded-lg text-center border border-rose-600/20'>
                            {serverError}
                        </p>
                    </div>
                )}

                <div className="bg-[#161722] border border-white/10 p-8 rounded-[24px] shadow-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
                        
                        <CodeInput onCodeComplete={handleCodeComplete} />

                        <button
                            type='submit' 
                            className='text-sm font-bold w-full h-11 bg-white text-[#0f101a] rounded-xl hover:bg-gray-200 hover:translate-x-1 active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Continue"}
                            {!isLoading && <ArrowRight size={16} />}
                        </button>
                    </form>
                </div>
            </AuthAnim>
        </main>
    )
}
export default VerifyEmail
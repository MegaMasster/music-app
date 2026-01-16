import { Link , useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useEffect } from 'react'
import { Mail, ArrowRight, Sparkles } from 'lucide-react'


import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'
import { authApi } from '../api/authApi'
import AuthErrorHandler from '../../utils/auth/authErrorHandler'
import Loader from '../../../shared/ui/loader/Loader'

const ForgotPassword = () => {

    const isSendingEmail = useAuthStore(state => state.isSendingEmail)
    const setIsSendingEmail = useAuthStore(state => state.setIsSendingEmail)
    const userEmail = useAuthStore(state => state.userEmail)
    const setUserEmail = useAuthStore(state => state.setUserEmail)
    const resetError = useAuthStore(state => state.resetError)
    const setLoading = useAuthStore(state => state.setLoading)
    const isLoading = useAuthStore(state => state.isLoading)
    const serverError = useAuthStore(state => state.serverError)
    const setServerError = useAuthStore(state => state.setServerError)
    const isError = useAuthStore(state => state.isError)
    const clearUserEmail = useAuthStore(state => state.clearUserEmail)

    const location = useLocation()
    useEffect(() => {
        document.title = "Forgot password - AuroraMusics"
        resetError()
    } , [location])

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({mode: "onTouched"})

    const onSubmit = async (userData) => {
        resetError()
        setLoading(true)
        try {
            const result = await authApi.forgotPassword(userData)
            if (result.success) {
                setIsSendingEmail(true)
                setUserEmail(userData.email)
            } else {
                const errorMessage = AuthErrorHandler.handleForgotPasswordError(result)
                setServerError(errorMessage)
                clearUserEmail()
            }
        } catch (error) {
            const errorMessage = AuthErrorHandler.handleForgotPasswordError(error)
            setServerError(errorMessage)
            clearUserEmail()
        } finally {
            setLoading(false)
        }
    }

    const tryAnotherEmail = () => {
        setIsSendingEmail(false)
    }

    return (
        <main className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#0f101a] text-gray-200 overflow-hidden px-6">
            <Loader />

            {isSendingEmail ? (

                <div className="relative z-10 w-full max-w-[450px] flex flex-col items-center text-center space-y-8">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-2xl"></div>
                        <div className="relative w-20 h-20 bg-[#161722] rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl">
                            <Mail className="text-blue-400" size={40} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                            We've sent password reset instructions to
                        </p>
                        <strong className="text-xl text-white block font-bold tracking-tight">
                            {userEmail}
                        </strong>
                        <p className="text-gray-500 text-xs md:text-sm font-light italic">
                            Please check your inbox and follow the link in the email.
                        </p>
                    </div>

                    <div className="flex flex-col w-full gap-4 pt-4">
                        <button 
                            onClick={tryAnotherEmail}
                            className="w-full h-12 bg-white text-[#0f101a] font-bold rounded-xl hover:bg-gray-200 hover:translate-x-1 active:scale-95 
                            transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Try another email
                        </button>
                        <Link to="/sign-in" className="text-sm text-gray-500 hover:text-white underline underline-offset-8 decoration-white/10 transition-all">
                            Back to sign in
                        </Link>
                    </div>
                </div>
            ) : (

                <AuthAnim className="relative z-10 w-full max-w-[400px]">
                    
                    <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-6 font-sans">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
                                Forgot<br /> password?
                            </h1>
                            <p className="text-[10px] text-blue-400 uppercase tracking-[0.2em] mt-2 font-bold flex items-center gap-2">
                                <Sparkles size={12} /> Recovery mode
                            </p>
                        </div>
                        <Link to="/sign-in" className="text-sm text-gray-500 hover:text-blue-400 underline underline-offset-4 
                            decoration-white/10 transition-all mb-1"
                        > 
                            Back to sign in?
                        </Link>
                    </div>

                    {isError && (
                        <div className='flex w-full justify-center items-center mb-6 font-sans'>
                            <p className='text-sm text-rose-600 font-medium bg-rose-600/10 w-full py-2.5 rounded-xl text-center border border-rose-600/20'>
                                {serverError}
                            </p>
                        </div>
                    )}

                    <div className="bg-[#161722] border border-white/10 p-8 rounded-[32px] shadow-2xl shadow-black/50">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
                            
                            <div className='flex flex-col w-full space-y-2'>
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400/80 ml-1">Email</label>
                                <div className='flex items-center relative w-full focus-within:translate-x-1 transition-all duration-300'>
                                    <Mail className="absolute left-4 w-4 h-4 z-10 opacity-40 text-blue-400" />
                                    <input 
                                        type="email"
                                        placeholder='Enter your email'
                                        className="w-full h-12 pl-12 rounded-xl border border-white/10 bg-[#0f101a] outline-none 
                                        focus:border-white/20 transition-all duration-300 text-sm placeholder:text-gray-700" 
                                        {...register("email" , {
                                            required: "Enter email address",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.email && <p className="text-[11px] text-rose-600 mt-1 ml-1 font-medium animate-pulse">{errors.email.message}</p>}
                            </div>
                            
                            <button
                                type='submit' 
                                className='group text-sm font-bold w-full h-12 bg-white text-[#0f101a] rounded-xl 
                                hover:bg-gray-200 hover:translate-x-1 active:scale-95 transition-all duration-300 disabled:opacity-30 
                                disabled:cursor-not-allowed flex items-center justify-center gap-2'
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Continue"}
                                {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    </div>
                </AuthAnim>
            )}
        </main>
    )
}
export default ForgotPassword 
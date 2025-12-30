import { useLocation , useParams , Link  } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useEffect } from 'react'
import { Lock, Sparkles, ShieldCheck , AlertCircle, CheckCircle2, ArrowRight, MailWarning } from 'lucide-react'

import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'
import { authApi } from '../api/authApi'
import AuthErrorHandler from "../../utils/auth/authErrorHandler"
import Loader from '../../../shared/ui/loader/Loader'

const ResetPassword = () => {

    const isValidToken = useAuthStore(state => state.isValidToken)
    const setIsValidToken = useAuthStore(state => state.setIsValidToken)
    const userEmail = useAuthStore(state => state.userEmail)
    const setIsPasswordReset = useAuthStore(state => state.setIsPasswordReset)
    const resetError = useAuthStore(state => state.resetError)
    const setLoading = useAuthStore(state => state.setLoading)
    const isLoading = useAuthStore(state => state.isLoading)
    const serverError = useAuthStore(state => state.serverError)
    const setServerError = useAuthStore(state => state.setServerError)
    const isError = useAuthStore(state => state.isError)
    const clearUserEmail = useAuthStore(state => state.clearUserEmail)
    const isPasswordReset = useAuthStore(state => state.isPasswordReset)

    const location = useLocation()
    useEffect(() => {
        document.title = "Reset error - AuroraMusics"
        resetError()
    } , [location])

    const { token } = useParams()
    useEffect(() => {
        const checkTokenData = {
            token: token
        }
        checkUrlToken(checkTokenData)
    } , [token])

    const {
        register,
        handleSubmit, 
        watch,
        formState: {errors}
    } = useForm({mode: "onTouched"})
    
    const watchPassword = watch("password")

    const checkUrlToken = async (checkTokenData) => {
        resetError()
        setLoading(true)
        try {
            const result = await authApi.checkResetToken(checkTokenData)
            if (result.success) {
                setIsValidToken(true)
            } else {
                const errorMessage = AuthErrorHandler.handleCheckResetToken(result)
                setServerError(errorMessage)
                setIsValidToken(false)
            }
        } catch (error) {
            const errorMessage = AuthErrorHandler.handleCheckResetToken(error)
            setServerError(errorMessage)
            setIsValidToken(false)
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async (userData) => {
        resetError()
        setLoading(true)
        try {
            const resetPasswordData = {
                email: userEmail,
                new_password: userData.password
            }
            const result = await authApi.resetPassword(resetPasswordData)
            if (result.success) {
                setIsPasswordReset(true)
                clearUserEmail()
            } else {
                const errorMessage = AuthErrorHandler.handleResetPassword(result)
                setServerError(errorMessage)
            }
        } catch(error) {
            const errorMessage = AuthErrorHandler.handleResetPassword(error)
            setServerError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    if (!isValidToken) {
        return (
            <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#0f101a] text-gray-200 px-6">
                <Loader />
                <div className="flex flex-col items-center gap-8 max-w-xl">
                    <div className="flex items-center gap-8">
                        <div className="shrink-0 relative">
                            <div className="absolute -inset-2 bg-rose-500/20 rounded-full blur-xl"></div>
                            <AlertCircle className="relative text-rose-500" size={56} />
                        </div>
                        <div className="h-20 w-px bg-white/10"></div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-white tracking-tight">Invalid or Expired Link</h1>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                The reset link may have expired, or has<br /> already been used.
                            </p>
                        </div>
                    </div>
                    <Link to="/forgot-pass" className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-blue-400 transition-all">
                        Request new reset link <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        )
    }

    if (isPasswordReset) {
        return (
            <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#0f101a] text-gray-200 px-6">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-green-500/10 rounded-full blur-2xl"></div>
                        <CheckCircle2 className="relative text-green-500 shadow-2xl" size={64} />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Password changed</h1>
                        <p className="text-gray-500 font-light italic">Your security credentials have been updated.</p>
                    </div>
                    <Link to="/sign-in" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#0f101a] font-bold rounded-xl 
                        hover:bg-gray-200 transition-all active:scale-95"
                    >
                        Back to sign in
                    </Link>
                </div>
            </div>
        )
    }

    if (!userEmail) {
        return (
            <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#0f101a] text-gray-200 px-6">
                <div className="flex flex-col items-center gap-8 max-w-xl">
                    <div className="flex items-center gap-8">
                        <div className="shrink-0 relative">
                            <MailWarning className="relative text-blue-400" size={56} />
                        </div>
                        <div className="h-20 w-px bg-white/10"></div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-white tracking-tight">Email not found</h1>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Unknown error, your email was not found,<br /> please enter your email again.
                            </p>
                        </div>
                    </div>
                    <Link to="/forgot-pass" className="text-sm font-medium text-blue-400 hover:text-blue-300 underline underline-offset-8 
                        decoration-blue-400/20 transition-all"
                    >
                        Enter your email again
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <main className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#0f101a] text-gray-200 overflow-hidden px-6">
            
            <Loader />

            <AuthAnim className="relative z-10 w-full max-w-[400px]">
                
                <div className="flex flex-col items-center mb-8 border-b border-white/5 pb-6">
                    <div className="relative mb-4">
                        <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur-md"></div>
                        <div className="relative w-12 h-12 bg-[#1a1b26] rounded-xl border border-white/15 flex items-center justify-center shadow-lg">
                            <Lock className="text-blue-400" size={24} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        Reset Password <Sparkles className="text-blue-400" size={18} />
                    </h1>
                    <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] mt-1 font-medium italic">Enter your new credentials</p>
                </div>

                {isError && (
                    <div className='flex w-full justify-center items-center mb-6'>
                        <p className='text-sm text-rose-600 font-medium bg-rose-600/10 w-full py-2.5 rounded-xl text-center border border-rose-600/20'>
                            {serverError}
                        </p>
                    </div>
                )} 

                <div className="bg-[#161722] border border-white/10 p-8 rounded-[24px] shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">  
                        
                        <div className='flex flex-col w-full space-y-2'>
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400/90 ml-1">New Password</label>
                            <div className='flex items-center relative w-full focus-within:translate-x-1 transition-all duration-300'>
                                <Lock className="absolute left-4 w-4 h-4 z-10 opacity-50 text-blue-400" />
                                <input 
                                    type="password" 
                                    placeholder='••••••••'
                                    className="w-full h-11 pl-11 rounded-xl border border-white/10 bg-[#0f101a] outline-none focus:border-white/20 
                                    transition-all duration-300 text-sm" 
                                    {...register("password" , {
                                        required: "This field is required",
                                        minLength: { value: 8, message: "Password is too short" },
                                        maxLength: { value: 128, message: "Password is too long" }
                                    })}
                                />
                            </div>
                            {errors.password && <p className="text-[11px] text-rose-600 mt-1 ml-1 font-medium">{errors.password.message}</p>}
                        </div>

                        <div className='flex flex-col w-full space-y-2'>
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400/90 ml-1">Confirm Password</label>
                            <div className='flex items-center relative w-full focus-within:translate-x-1 transition-all duration-300'>
                                <Lock className="absolute left-4 w-4 h-4 z-10 opacity-50 text-blue-400" />
                                <input 
                                    type="password" 
                                    placeholder='••••••••'
                                    className="w-full h-11 pl-11 rounded-xl border border-white/10 bg-[#0f101a] outline-none 
                                    focus:border-white/20 transition-all duration-300 text-sm" 
                                    {...register("repeatPassword" , {
                                        required: "Repeat your password",
                                        validate: (value) => value === watchPassword || "Passwords do not match"
                                    })}
                                />
                            </div>
                            {errors.repeatPassword && <p className="text-[11px] text-rose-600 mt-1 ml-1 font-medium animate-pulse">{errors.repeatPassword.message}</p>}
                        </div>

                        <button 
                            type='submit' 
                            disabled={isLoading}
                            className='group text-sm font-bold w-full h-12 bg-white text-[#0f101a] rounded-xl 
                                hover:bg-gray-200 hover:translate-x-1 active:scale-95 transition-all duration-300 disabled:opacity-30 
                                disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            >
                            {isLoading ? "Updating..." : "Update Password"}
                            {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-gray-700">
                    <ShieldCheck size={14} />
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold italic text-gray-600">Secure Database Reset</span>
                </div>
            </AuthAnim>
        </main>
    )
}
export default ResetPassword 
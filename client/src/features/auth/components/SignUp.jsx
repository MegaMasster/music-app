import { Link , useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useEffect , useState } from 'react'
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'
import ReCAPTCHA from "react-google-recaptcha"

import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'
import { authApi } from '../api/authApi'
import AuthErrorHandler from "../../utils/auth/authErrorHandler"
import Loader from '../../../shared/ui/loader/Loader'

const SignUp = () => {

    const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)
    const setUserEmail = useAuthStore(state => state.setUserEmail)
    const resetError = useAuthStore(state => state.resetError)
    const setLoading = useAuthStore(state => state.setLoading)
    const isLoading = useAuthStore(state => state.isLoading)
    const serverError = useAuthStore(state => state.serverError)
    const setServerError = useAuthStore(state => state.setServerError)
    const isError = useAuthStore(state => state.isError)
    const clearUserEmail = useAuthStore(state => state.clearUserEmail)

    const [captchaToken, setCaptchaToken] = useState(null)

    const location = useLocation()
    useEffect(() => {
        document.title = "Sign Up - AuroraMusics"
        resetError()
    } , [location])

    const {
        register,
        handleSubmit, 
        watch,
        formState: {errors}
    } = useForm({mode: "onTouched"})
    
    const watchPassword = watch("password")

    const handleCaptchaChange = (value) => {
        setCaptchaToken(value)
    }

    const onSubmit = async (userData) => {
        const userDataWhithCaptchaToken = {
            ...userData,
            captchaToken: captchaToken
        }

        if (!captchaToken) {
            setServerError("Сomplete the reCAPTCHA verification.")
            return
        }

        resetError()
        setLoading(true)
        try {
            const result = await authApi.signUp(userDataWhithCaptchaToken)
            if (result.success) {
                setUserEmail(userData.email)
                setIsAuthenticated(true)
            } else {
                clearUserEmail()
                const errorMessage = AuthErrorHandler.handlerSignUpError(result)
                setServerError(errorMessage)
            }
        } catch(error) {
            clearUserEmail()
            const errorMessage = AuthErrorHandler.handlerSignUpError(error)
            setServerError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#0f101a] text-gray-200 overflow-hidden px-6">
            
            <Loader />

            <AuthAnim className="relative z-10 w-full max-w-[420px]">

                <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                            Sign up <Sparkles className="text-blue-400" size={20} />
                        </h1>
                        <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] mt-1 font-medium">Create new account</p>
                    </div>
                    <Link to="/sign-in" className="text-sm underline opacity-40 hover:opacity-100 hover:text-amber-500 transition-all duration-300"> 
                        Sign in
                    </Link>
                </div>

                {isError && (
                    <div className='flex w-full justify-center items-center mb-6'>
                        <p className='text-sm text-rose-600 font-medium bg-rose-600/10 w-full py-2 rounded-lg text-center border border-rose-600/20'>
                            {serverError}
                        </p>
                    </div>
                )} 

                <div className="bg-white/5 border border-white/10 p-8 rounded-[24px] shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                        
                        <div className='flex flex-col w-full space-y-2'>
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 ml-1">Email</label>
                            <div className='flex items-center relative w-full focus-within:translate-x-1 transition-all duration-300'>
                                <Mail className={`absolute left-4 w-4 h-4 z-10 ${!captchaToken ? 'opacity-20' : 'opacity-50 text-blue-400'}`} />
                                <input 
                                    type="email"
                                    placeholder='Email'
                                    className="w-full h-11 pl-11 rounded-xl border border-white/10 bg-black/20 outline-none focus:border-white/20 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 text-sm" 
                                    {...register("email" , {
                                        required: "Enter email address",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    disabled={!captchaToken}
                                />
                            </div>
                            {errors.email && <p className="text-[11px] text-rose-600 mt-1 ml-1 font-medium">{errors.email.message}</p>}
                        </div>
                        
                        <div className='flex flex-col w-full space-y-2'>
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 ml-1">Password</label>
                            <div className='flex items-center relative w-full focus-within:translate-x-1 transition-all duration-300'>
                                <Lock className={`absolute left-4 w-4 h-4 z-10 ${!captchaToken ? 'opacity-20' : 'opacity-50 text-blue-400'}`} />
                                <input 
                                    type="password" 
                                    placeholder='Password'
                                    className="w-full h-11 pl-11 rounded-xl border border-white/10 bg-black/20 outline-none focus:border-white/20 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 text-sm" 
                                    {...register("password" , {
                                        required: "This field is required",
                                        minLength: { value: 8, message: "Password is too short" },
                                        maxLength: { value: 128, message: "Password is too long" }
                                    })}
                                    disabled={!captchaToken}
                                />
                            </div>
                            {errors.password && <p className="text-[11px] text-rose-600 mt-1 ml-1 font-medium">{errors.password.message}</p>}
                        </div>

                        <div className='flex flex-col w-full space-y-2'>
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 ml-1">Repeat Password</label>
                            <div className='flex items-center relative w-full focus-within:translate-x-1 transition-all duration-300'>
                                <Lock className={`absolute left-4 w-4 h-4 z-10 ${!captchaToken ? 'opacity-20' : 'opacity-50 text-blue-400'}`} />
                                <input 
                                    type="password" 
                                    placeholder='Repeat password'
                                    className="w-full h-11 pl-11 rounded-xl border border-white/10 bg-black/20 outline-none focus:border-white/20 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 text-sm" 
                                    {...register("repeatPassword" , {
                                        required: "Repeat your password",
                                        validate: (value) => value === watchPassword || "Passwords do not match"
                                    })}
                                    disabled={!captchaToken}
                                />
                            </div>
                            {errors.repeatPassword && <p className="text-[11px] text-rose-600 mt-1 ml-1 font-medium">{errors.repeatPassword.message}</p>}
                        </div>

                        <button 
                            type='submit' 
                            className='group text-sm font-bold w-full h-12 bg-white text-[#0f101a] rounded-xl 
                                hover:bg-gray-200 hover:translate-x-1 active:scale-95 transition-all duration-300 disabled:opacity-30 
                                disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            disabled={isLoading || !captchaToken}
                        >
                            {isLoading ? "Signing Up..." : "Continue"}
                            {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>}
                        </button>

                        <div className='flex items-center justify-center w-full pt-2'>
                            <ReCAPTCHA
                                hl="en"
                                theme="dark"
                                sitekey="6LeItCosAAAAAISOsInS99z2FykMQh2N32Qz61Sd"
                                onChange={handleCaptchaChange}
                            />
                        </div>

                    </form>
                </div>
            </AuthAnim>
        </main>
    )
}
export default SignUp 
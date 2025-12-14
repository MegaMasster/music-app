import { Link , useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useEffect , useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha"

import passwordIcon from "../../../assets/images/password-icon.png"
import emailIcon from "../../../assets/images/email-icon.png"
import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'
import { authApi } from '../api/authApi'
import AuthErrorHandler from '../../utils/auth/authErrorHandler'
import Loader from '../../../shared/ui/loader/Loader'

const SignIn = () => {

    const {
        setIsAuthenticated,
        setIsEmailVerified,
        resetError,
        setLoading,
        isLoading,
        setServerError,
        serverError,
        isError,
        clearUserEmail
    } = useAuthStore()

    const [captchaToken, setCaptchaToken] = useState(null)

    const location = useLocation()
    useEffect(() => {
        document.title = "Sign In - AuroraMusics"
        resetError()
    } , [location])

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({mode: "onChange"})

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

        clearUserEmail()
        resetError()
        setLoading(true)
        try {
            const result = await authApi.signIn(userDataWhithCaptchaToken)
            if (result.success) {
                setIsAuthenticated(true)
                setIsEmailVerified(true)
            } else {
                const errorMessage = AuthErrorHandler.handlerSignInError(result)
                setServerError(errorMessage)
            }   
        } catch (error) {
            const errorMessage = AuthErrorHandler.handlerSignInError(error)
            setServerError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="wrapper">

            <Loader/>

            <AuthAnim className="flex flex-col justify-evenly rounded-2x
                w-80 h-100 md:w-85 md:h-100 lg:w-90 lg:h-110"
            >

                <div className="flex justify-between items-center">
                    <h1 className="text-lg md:text-xl lg:text-2xl">Sign in</h1>
                    <div className='flex justify-center items-end h-7 rounded'>
                        <Link to="/sign-up" className="underline opacity-40
                            hover:text-amber-600 transition-colors"> 
                            Sign up
                        </Link>
                    </div>
                </div>

                {isError && (
                    <div className='flex w-full justify-center items-center mt-5'>
                        <p className='text-md text-rose-600'>{serverError}</p>
                    </div>
                )} 

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-evenly items-center h-[65%] ">
                    <div className='flex flex-col w-full'>
                        <div className='flex items-center relative w-full 
                            focus-within:translate-x-2 transition-all duration-250'
                        >
                            <img 
                                src={emailIcon}
                                alt="password icon"
                                className={`absolute w-5 h-5 left-4 select-none ${!captchaToken ? 'opacity-50' : ''}`}
                                style={{ filter: 'invert(1)' }}
                            />
                            <input 
                                type="email"
                                placeholder='Email'
                                className="w-full h-10 lg:h-11 pl-12 rounded border border-gray-600 outline-0 
                                focus:border-gray-500 transition-all duration-300
                                disabled:cursor-not-allowed disabled:opacity-50" 
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
                        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                    
                    <div className='flex flex-col w-full'>
                        <div className='flex items-center relative w-full 
                            focus-within:translate-x-2 transition-all duration-250'
                        >
                            <img 
                                src={passwordIcon}
                                alt="password icon"
                                className={`absolute w-5 h-5 left-4 select-none ${!captchaToken ? 'opacity-50' : ''}`}
                                style={{ filter: 'invert(1)' }}
                            />
                                <input 
                                    type="password" 
                                    placeholder='Password'
                                    className="w-full h-10 lg:h-11 pl-12 rounded border border-gray-600 outline-0
                                    focus:border-gray-500 transition-all duration-250
                                    disabled:cursor-not-allowed disabled:opacity-50" 
                                    {...register("password" , {
                                        required: "This field is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password is too short"
                                        },
                                        maxLength: {
                                            value: 128,
                                            message: "Password is too long"
                                        }
                                    })}
                                    disabled={!captchaToken}
                                />
                        </div>
                        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <button 
                        type='submit' 
                        className='text-[16px] md:text-lg w-full h-10 lg:h-11 bg-amber-500 rounded 
                        hover:bg-amber-400 hover:translate-x-2 hover:cursor-pointer active:scale-95
                        transition-all duration-250 

                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 
                        disabled:hover:bg-amber-500
                        disabled:active:scale-100'
                        disabled = {isLoading || !captchaToken}
                    >
                        {isLoading ? "Signing In..." : "Continue"}
                    </button>

                    <div className='flex items-center w-full'>
                        <ReCAPTCHA
                            hl="en"
                            size="normal"
                            sitekey="6LeItCosAAAAAISOsInS99z2FykMQh2N32Qz61Sd"
                            onChange={handleCaptchaChange}
                        />
                    </div>

                </form>
                <div className='flex justify-center items-start h-[10%]'>
                    <Link 
                        to="/forgot-pass"
                        className='opacity-40 underline hover:text-amber-600 transition-colors'
                    >
                        Lost your password?
                    </Link>
                </div>
            </AuthAnim>

        </main>

    )
}
export default SignIn 
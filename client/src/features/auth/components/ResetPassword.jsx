import { useLocation , useParams , Link  } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useEffect } from 'react'

import passwordIcon from "../../../assets/images/password-icon.png"
import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'
import { authApi } from '../api/authApi'
import AuthErrorHandler from "../../utils/auth/authErrorHandler"
import Loader from '../../../shared/ui/loader/Loader'

const ResetPassword = () => {

    const {
        setLoading,
        isLoading,
        resetError,
        setServerError,
        serverError,
        isError,
        clearUserEmail,
        userEmail,
        isValidToken,
        setIsValidToken,
        setIsPasswordReset,
        isPasswordReset
    } = useAuthStore()

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
    } = useForm({mode: "onChange"})
    
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
            <div className='wrapper'>

                <Loader/>

                <div className="flex flex-col items-center gap-5">
                    <div className="flex items-center gap-5">
                        <h1 className="">Invalid or Expired Link</h1>
                        <div className="h-20 w-px bg-white"></div>
                        <p className="">The reset link may have expired, or has<br></br> already been used.</p>
                    </div>
                    <Link to="/forgot-pass" className="opacity-40 underline hover:text-amber-600 transition-colors">
                        Request new reset link
                    </Link>
                </div>
            </div>
        )
    }

    if (isPasswordReset) {
        return (
            <div className='wrapper'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className="">Password changed successfully</h1>
                    <Link to="/sign-in" className="opacity-40 underline hover:text-amber-600 transition-colors">
                        Back to sign in
                    </Link>
                </div>
            </div>
        )
    }

    if (!userEmail) {
        return (
            <div className='wrapper'>
                <div className='flex flex-col justify-center items-center'>
                    <div className="flex justify-center items-center gap-5">
                        <h1 className="">Error</h1>
                        <div className="h-20 w-px bg-white"></div>
                        <p className="">Unknown error, your email was not found, <br/> please enter your email again.</p>
                    </div>
                    <Link to="/forgot-pass" className="opacity-40 underline hover:text-amber-600 transition-colors">
                        Enter your email again
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <main className="wrapper">
            
            <Loader/>

            <AuthAnim className="flex flex-col justify-evenly rounded-2x
                w-80 h-70 md:w-85 md:h-75 lg:w-90 lg:h-80"
            >

                <div className="flex justify-center items-center">
                    <h1 className="text-lg md:text-xl lg:text-2xl">Reset password</h1>
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
                                src={passwordIcon}
                                alt="password icon"
                                className='absolute w-5 h-5 left-4 select-none'
                                style={{filter: 'invert(1)'}}
                            />
                            <input 
                                type="password" 
                                placeholder='Password'
                                className="w-full h-10 lg:h-11 pl-12 rounded border border-gray-600 outline-0
                                focus:border-gray-500 transition-all duration-250" 
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
                            />
                        </div>
                        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <div className='flex flex-col w-full'>
                        <div className='flex items-center relative w-full 
                            focus-within:translate-x-2 transition-all duration-250'
                        >
                            <img 
                                src={passwordIcon}
                                alt="password icon"
                                className='absolute w-5 h-5 left-4 select-none'
                                style={{ filter: 'invert(1)' }}
                            />
                            <input 
                                type="password" 
                                placeholder='Repeat password'
                                className="w-full h-10 lg:h-11 pl-12 rounded border border-gray-600 outline-0
                                focus:border-gray-500 transition-all duration-250" 
                                {...register("repeatPassword" , {
                                    required: "Repeat your password",
                                    validate: (value) => 
                                        value === watchPassword || "Passwords do not match"
                                })}
                            />
                        </div>
                        {errors.repeatPassword && <p className="text-sm text-red-600">{errors.repeatPassword.message}</p>}
                    </div>

                    <button 
                        type='submit' 
                        disabled={isLoading}
                        className='text-[16px] md:text-lg w-full h-10 lg:h-11 bg-amber-500 rounded 
                        hover:bg-amber-400 hover:translate-x-2 hover:cursor-pointer active:scale-95
                        transition-all duration-250'
                    >
                        {isLoading ? "Reseting..." : "Continue"}
                    </button>
                </form>
            </AuthAnim>

        </main>

    )
}
export default ResetPassword 
import { Link , useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useEffect } from 'react'

import passwordIcon from "../../../assets/images/password-icon.png"
import emailIcon from "../../../assets/images/email-icon.png"
import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'
import { authApi } from '../api/authApi'
import AuthErrorHandler from '../../utils/auth/authErrorHandler'

const SignIn = () => {

    const location = useLocation()

    const {
        setIsAuthenticated,
        setIsEmailVerified,
        resetError,
        setLoading,
        isLoading,
        setServerError,
        serverError,
        isError,
        setUserEmail,
        clearUserEmail
    } = useAuthStore()

    useEffect(() => {
        document.title = "Sign In - AuroraSounds"
        resetError()
    } , [location])

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({mode: "onChange"})

    const onSubmit = async (userData) => {
        clearUserEmail()
        resetError()
        setLoading(true)
        try {
            const result = await authApi.signIn(userData)
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

            {isLoading && (
                <div className="fixed inset-0 bg-opacity-5 backdrop-blur-md flex justify-center items-center z-50">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <AuthAnim className="flex flex-col justify-evenly w-90 h-80 rounded-2x">

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Sign in</h1>
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
                                className='absolute w-5 h-5 left-4 select-none'
                                style={{ filter: 'invert(1)' }}
                            />
                            <input 
                                type="email"
                                placeholder='Email'
                                className="w-full h-11 pl-12 rounded border border-gray-600 outline-0 
                                focus:border-gray-500 transition-all duration-300" 
                                {...register("email" , {
                                    required: "Enter email address",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
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
                                className='absolute w-5 h-5 left-4 select-none'
                                style={{ filter: 'invert(1)' }}
                            />
                                <input 
                                    type="password" 
                                    placeholder='Password'
                                    className="w-full h-11 pl-12 rounded border border-gray-600 outline-0
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

                    <button 
                        type='submit' 
                        className='text-lg w-full h-11 bg-amber-500 rounded 
                        hover:bg-amber-400 hover:translate-x-2 hover:cursor-pointer active:scale-95
                        transition-all duration-250'
                    >
                        {isLoading ? "Signing In..." : "Continue"}
                    </button>
                </form>
                <div className='flex justify-center items-center'>
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
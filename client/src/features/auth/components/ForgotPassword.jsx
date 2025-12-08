import { Link , useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useEffect } from 'react'

import emailIcon from "../../../assets/images/email-icon.png"
import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'
import { authApi } from '../api/authApi'
import AuthErrorHandler from '../../utils/auth/authErrorHandler'
import Loader from '../../../shared/ui/loader/Loader'

const ForgotPassword = () => {

    const {
        setLoading,
        isLoading,
        resetError,
        setServerError,
        serverError,
        isError,
        setUserEmail,
        clearUserEmail,
        isSendingEmail,
        setIsSendingEmail,
        userEmail
    } = useAuthStore()

    const location = useLocation()
    useEffect(() => {
        document.title = "Forgot password - AuroraSounds"
        resetError()
    } , [location])

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({mode: "onChange"})

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
        <main className="wrapper">

            <Loader/>

            {isSendingEmail ? (
                <div className='wrapper'>

                    <div className='flex flex-col justify-center text-center items-center gap-4'>
                        <p className="text-sm md:text-lg  text-amber-100">We've sent password reset instructions to your email address .</p>
                        <strong className="text-sm md:text-lg text-amber-200">{userEmail}</strong>
                        <p className="text-sm md:text-lg text-amber-100">Please check your inbox and follow the link in the email.</p>        
                        <button 
                            onClick={tryAnotherEmail}
                            className="text-[16px] w-[60%] h-10 md:text-lg md:h-11 lg:h-11 min-w-[175px] bg-amber-500 rounded 
                            hover:bg-amber-400 hover:translate-x-2 hover:cursor-pointer active:scale-95
                            transition-all duration-250"
                        >
                            Try another email
                        </button>
                        <Link to="/sign-in" className="underline opacity-40
                            hover:text-amber-600 transition-colors">
                            Back to sign in
                        </Link>
                    </div>

                </div>
            ) : (

                <AuthAnim className="flex flex-col justify-evenly rounded-2x
                    w-77 h-65 md:w-82 md:h-72 lg:w-90 lg:h-80"
                >

                    <div className="flex justify-between items-center">
                        <h1 className="text-lg md:text-xl lg:text-2xl">Forgot<br></br> password?</h1>
                        <div className='flex justify-center items-end h-7 w-35 rounded'>
                            <Link to="/sign-in" className="underline opacity-40
                                hover:text-amber-600 transition-colors"> 
                                Back to sign in?
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
                                    className="w-full h-10 lg:h-11 pl-12 rounded border border-gray-600 outline-0 
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
                        
                        <button
                            type='submit' 
                            className='text-[16px] md:text-lg w-full h-10 lg:h-11 bg-amber-500 rounded 
                            hover:bg-amber-400 hover:translate-x-2 hover:cursor-pointer active:scale-95
                            transition-all duration-250'
                        >
                            {isLoading ? "Forgoting..." : "Continue"}
                        </button>
                    </form>
                </AuthAnim>
            )}
        </main>
    )
}
export default ForgotPassword 
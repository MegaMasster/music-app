import { Link , useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useEffect } from 'react'

import emailIcon from "../../../assets/images/email-icon.png"
import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'

const ForgotPassword = () => {

    const location = useLocation()

    const {
        setLoading , 
        setIsSendingEmail,
        isSendingEmail,
        userEmail,
        setUserEmail,
        resetError
    } = useAuthStore()

    useEffect(() => {
        document.title = "Forgot password - AuroraSounds"
        resetError()
    } , [location])

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({mode: "onChange"})

    const onSubmit = (data) => {
        setIsSendingEmail(true)
        setUserEmail(data.email)
        console.log(data)
    }

    return (
        <main className="wrapper">
            {isSendingEmail ? (
                <div className='wrapper'>

                    <div className='flex flex-col justify-center items-center gap-4'>
                        <p className="">We've sent password reset instructions to your email address <strong>{userEmail}</strong>.</p>
                        <p className="">Please check your inbox and follow the link in the email.</p>        
                        <button 
                            onClick={() => setIsSendingEmail(false)}
                            className="text-lg w-[60%] h-11 bg-amber-500 rounded 
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

                <AuthAnim className="flex flex-col justify-evenly w-90 h-80 rounded-2x">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl">Forgot<br></br> password?</h1>
                        <div className='flex justify-center items-end h-7 w-35 rounded'>
                            <Link to="/sign-in" className="underline opacity-40
                                hover:text-amber-600 transition-colors"> 
                                Back to sign in?
                            </Link>
                        </div>
                    </div>

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

                        <button
                            type='submit' 
                            className='text-lg w-full h-11 bg-amber-500 rounded 
                            hover:bg-amber-400 hover:translate-x-2 hover:cursor-pointer active:scale-95
                            transition-all duration-250'
                        >
                            Continue
                        </button>
                    </form>
                </AuthAnim>
            )}
        </main>
    )
}
export default ForgotPassword 
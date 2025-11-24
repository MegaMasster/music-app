import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"

import nameIcon from "../../../assets/images/name-icon.png"
import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'

const UserName = () => {

    const {
        setLoading ,
        setUserName
    } = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({mode: "onChange"})

    const onSubmit = (data) => {
        setUserName(true)
        console.log(data)
    }

    return (
        <main className="wrapper">
            <AuthAnim className="flex flex-col justify-evenly w-90 h-80 rounded-2x">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">User name</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-evenly items-center h-[65%] ">
                    <div className='flex flex-col w-full'>
                        <div className='flex items-center relative w-full 
                            focus-within:translate-x-2 transition-all duration-250'
                        >
                            <img 
                                src={nameIcon}
                                alt="password icon"
                                className='absolute w-5 h-5 left-4'
                                style={{ filter: 'invert(1)' }}
                            />
                            <input 
                                type="text" 
                                placeholder='Username'
                                className="w-full h-11 pl-12 rounded border border-gray-600 outline-0
                                focus:border-gray-500 transition-all duration-250" 
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 3,
                                        message: "Username must be at least 3 characters"
                                    },
                                    maxLength: {
                                        value: 14, 
                                        message: "Username must be less than 14 characters"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_]+$/,
                                        message: "Username can only contain letters, numbers and underscore"
                                    }
                                })}
                            />
                    </div>
                    {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
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
        </main>
    )
}
export default UserName 
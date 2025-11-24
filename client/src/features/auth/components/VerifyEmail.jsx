import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

import AuthAnim from '../../../shared/ui/authAnimation/authAnim'
import useAuthStore from '../../../shared/stores/useAuthStore'

const VerifyEmail = () => {
    const { 
        setIsEmailVerified,
        setIsAuthenticated
    } = useAuthStore()
    const inputRefs = useRef([])
    const [values, setValues] = useState(Array(6).fill(''))

    const handleChange = (index, value) => {
        const newValues = [...values]
        newValues[index] = value
        setValues(newValues)
        
        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const allFilled = values.every(value => value !== '')
        if (!allFilled) return
        setIsEmailVerified(true)
    }

    const setIsAuthenticatedFunction = () => {
        setIsAuthenticated(false)
    }

    return (
        <main className="wrapper">
            <AuthAnim className="flex flex-col justify-evenly w-90 h-80 rounded-2x">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Verify email</h1>
                    <button
                        onClick={setIsAuthenticatedFunction}
                    >    
                        <Link to="/sign-in" className="underline opacity-40 hover:text-amber-600 transition-colors">
                            Back to sign in?
                        </Link>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col justify-evenly items-center h-[65%]">
                    <div className='flex flex-col w-full items-center'>
                        <div className="flex justify-center space-x-3 mb-4">
                            {[0,1,2,3,4,5].map(index => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="w-12 h-12 text-center text-xl border-2 border-gray-600 rounded-lg focus:border-amber-500 outline-none bg-transparent"
                                    ref={el => inputRefs.current[index] = el}
                                    onChange={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                        handleChange(index, e.target.value)
                                    }}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                />
                            ))}
                        </div>
                        {values.some(value => value === '') && (
                            <p className="text-sm text-red-600">Please enter all 6 digits</p>
                        )}
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

export default VerifyEmail
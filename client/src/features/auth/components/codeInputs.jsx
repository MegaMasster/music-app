import { useRef , useState } from "react"

const CodeInput = ({ onCodeComplete }) => {
    const [values, setValues] = useState(['', '', '', '', '', ''])
    const inputRefs = useRef([])

    const handleChange = (index, value) => {
        const newValues = [...values]
        newValues[index] = value
        setValues(newValues)

        // Автоматически переходим к следующему инпуту
        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }

        // Если все поля заполнены, вызываем колбэк
        if (newValues.every(val => val !== '')) {
            onCodeComplete(newValues.join(''))
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    return (
        <div className='flex flex-col w-full items-center'>
            <div className="flex justify-center space-x-3 mb-4">
                {[0,1,2,3,4,5].map(index => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 text-center text-xl border-2 border-gray-600 rounded-lg 
                        focus:border-amber-500 outline-none bg-transparent"
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
    )
}
export default CodeInput
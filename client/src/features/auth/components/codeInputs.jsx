import { useRef , useState } from "react"

const CodeInput = ({ onCodeComplete }) => {
    const [values, setValues] = useState(['', '', '', '', '', ''])
    const inputRefs = useRef([])

    const handleChange = (index, value) => {
        const newValues = [...values]
        newValues[index] = value
        setValues(newValues)

        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }

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
            <div className="flex justify-center space-x-2 md:space-x-3 mb-4">
                {[0, 1, 2, 3, 4, 5].map(index => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-10 h-12 md:w-12 md:h-14 text-center text-xl font-bold border border-white/10 rounded-xl 
                        focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none bg-[#0f101a] text-white transition-all duration-200"
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
                <p className="text-[11px] text-rose-500/80 font-medium tracking-wide">Please enter all 6 digits</p>
            )}
        </div>
    )
}
export default CodeInput
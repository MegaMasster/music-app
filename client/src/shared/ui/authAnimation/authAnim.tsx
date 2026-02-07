import { motion , Variants } from "framer-motion"
import { ReactNode , FC } from "react"

interface AuthAnimProps {
    children: ReactNode,
    className?: string
}

const AuthAnim: FC<AuthAnimProps> = ({children , className=""}) => {

    const SignInAnimation: Variants = {
        hidden: {
            x: 35,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity:1,
            transition: {type: "spring", duration: 1.8}
        }
    }

    return (
        <>
            <motion.div
                variants={SignInAnimation} 
                initial="hidden" 
                animate="visible"
                className={className}
            >
                {children}
            </motion.div>
        </>
    )
}
export default AuthAnim
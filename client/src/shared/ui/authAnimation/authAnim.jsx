import { motion } from "framer-motion"

const AuthAnim = ({children , className=""}) => {

    const SignInAnimation = {
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
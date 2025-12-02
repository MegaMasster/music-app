import jwt from "jsonwebtoken"

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            })
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        })
    }
}
export default authenticateToken
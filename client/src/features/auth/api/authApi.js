import { api } from "./apiConfig"
import { AUTH_ENDPOINTS } from "./authEndpoints"

export const authApi = {
    signUp: async (userData) => {
        const response = await api.post(AUTH_ENDPOINTS.SIGN_UP , userData)
        return response
    },

    verifyEmail: async (data) => {
        const response = await api.post(AUTH_ENDPOINTS.VERIFY_EMAIL , data)
        return response
    },

    verifyToken: async () => {
        const response = await api.get(AUTH_ENDPOINTS.VERIFY_TOKEN)
        return response
    },

    signIn: async (userData) => {
        const response = await api.post(AUTH_ENDPOINTS.SIGN_IN , userData)
        return response
    },

    forgotPassword: async (userData) => {
        const response = await api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD , userData)
        return response
    },

    checkResetToken: async (data) => {
        const response = await api.post(AUTH_ENDPOINTS.CHECK_RESET_TOKEN , data)
        return response
    },

    resetPassword: async (userData) => {
        const response = await api.patch(AUTH_ENDPOINTS.RESET_PASSWORD , userData)
        return response
    }
}
import { api } from "./apiConfig"

export const authApi = {

    signUp: async (userData) => {
        const response = await api.post("/api/auth/signup" , userData)
        return response
    },

    VerifyEmail: async (data) => {
        const response = await api.post("api/auth/verifyemail" , data)
        return response
    }

}
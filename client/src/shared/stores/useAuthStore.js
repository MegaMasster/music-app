import { create } from "zustand"
import { persist } from "zustand/middleware"

const useAuthStore = create(
    persist (( set ) => 
        ({
            isLoading: false,
            isSendingEmail: false, 
            userEmail: null,
            isAuthenticated: false,
            isEmailVerified: false,
            serverError: "",
            isError: false,
            isValidToken: false,
            isEmailFound: false,

            setLoading: (loadingState) => set({isLoading: loadingState}),
            
            setIsSendingEmail: (isSendingEmailState) => set({isSendingEmail: isSendingEmailState}),
            setUserEmail: (email) => set({userEmail: email}),

            setIsAuthenticated: (isAuthenticatedState) => set({isAuthenticated: isAuthenticatedState}),
            setIsEmailVerified: (isEmailVerifiedState) => set({isEmailVerified: isEmailVerifiedState}),

            setServerError: (error) => set({serverError: error , isError: true}),
            resetError: () => set({serverError: "" , isError: false}),

            setUserEmail: (email) => set({userEmail: email}),
            clearUserEmail: () => set({userEmail : null}),

            setIsValidToken: (isValid) => set({isValidToken: isValid}),

            setIsEmailFound: (isFound) => set({isEmailFound: isFound})
    
        }) , {
            name: "temp_email_verification",
            partialize: (state) => ({
                userEmail: state.userEmail
            })
        }
    )
)
export default useAuthStore
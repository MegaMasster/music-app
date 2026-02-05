import { create } from "zustand"
import { persist , devtools } from "zustand/middleware"

interface AuthStates {
    isLoading: boolean,
    isSendingEmail: boolean,
    userEmail: string | null,
    isAuthenticated: boolean,
    isEmailVerified: boolean,
    serverError: string | null,
    isError: boolean,
    isValidToken: boolean,
    isPasswordReset: boolean
}

interface AuthActions {
    setLoading: (loadingState: boolean) => void,
    setIsSendingEmail: (isSendingEmailState: boolean) => void,
    setIsAuthenticated: (isAuthenticatedState: boolean) => void,
    setIsEmailVerified: (isEmailVerifiedState: boolean) => void,
    setServerError: (error: string | null) => void,
    resetError: () => void
    setUserEmail: (email: string | null) => void,
    clearUserEmail: () => void,
    setIsValidToken: (isValid: boolean) => void,
    setIsPasswordReset: (isResetting: boolean) => void
}

type AuthStore = AuthStates & AuthActions

const useAuthStore = create<AuthStore>()(
    devtools (
        persist (( set ) => 
            ({
                isLoading: false,
                isSendingEmail: false, 
                userEmail: null,
                isAuthenticated: false,
                isEmailVerified: false,
                serverError: null,
                isError: false,
                isValidToken: false,
                isPasswordReset: false,

                setLoading: (loadingState) => set({isLoading: loadingState} , false , "auth/setLoading"),
                
                setIsSendingEmail: (isSendingEmailState) => set({isSendingEmail: isSendingEmailState}, false , "auth/setIsSendingEmail"),

                setIsAuthenticated: (isAuthenticatedState) => set({isAuthenticated: isAuthenticatedState}, false , "auth/setIsAuthenticated"),
                setIsEmailVerified: (isEmailVerifiedState) => set({isEmailVerified: isEmailVerifiedState}, false , "auth/setIsEmailVerified"),

                setServerError: (error) => set({serverError: error , isError: true}, false , "auth/setServerError"),
                resetError: () => set({serverError: null , isError: false}, false , "auth/resetError"),

                setUserEmail: (email) => set({userEmail: email}, false , "auth/setUserEmail"),
                clearUserEmail: () => set({userEmail : null}, false , "auth/clearUserEmail"),

                setIsValidToken: (isValid) => set({isValidToken: isValid}, false , "auth/setIsValidToken"),
                setIsPasswordReset: (isResetting) => set({isPasswordReset: isResetting}, false , "auth/setIsPasswordReset")
        
            }) , {
                name: "temp_email_verification",
                partialize: (state) => ({
                    userEmail: state.userEmail
                })
            }
        )
    )
)
export default useAuthStore

// const store = create(persist (( set ) => ({}) , { } ))
// const store2 = create(persist (( set ) => ({}) , {}))
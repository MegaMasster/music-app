import { create } from "zustand"

const useAuthStore = create(
    ( set ) => ({
        isLoading: false,
        isSendingEmail: false, 
        userEmail: null,
        isAuthenticated: false,
        isEmailVerified: false,
        isUserNameSet: false,
        serverError: "",
        isError: false,

        setLoading: (loadingState) => set({isLoading: loadingState}),
        
        setIsSendingEmail: (isSendingEmailState) => set({isSendingEmail: isSendingEmailState}),
        setUserEmail: (email) => set({userEmail: email}),

        setIsAuthenticated: (isAuthenticatedState) => set({isAuthenticated: isAuthenticatedState}),
        setIsEmailVerified: (isEmailVerifiedState) => set({isEmailVerified: isEmailVerifiedState}),

        setUserName: (isUserNameState) => set({isUserNameSet: isUserNameState}),

        setServerError: (error) => set({serverError: error , isError: true}),
        resetError: () => set({serverError: "" , isError: false}),
    })
)
export default useAuthStore
const BASE_URL = import.meta.env.VITE_API_URL;

const request = async (endpoint , options={}) => {
    const url = `${BASE_URL}${endpoint}`

    const controller = new AbortController()
    const timer = setTimeout(() => {
        controller.abort()
    } , 8000)

    const config = {
        headers: {
        'Content-Type' : "application/json",
        ...options.headers
        },
        signal: controller.signal,
        ...options
    }

    try {
        const response = await fetch(url , config)
        clearTimeout(timer)

        if(!response.ok) {
            const errorData = await response.json()
            const error = new Error(errorData.message || "Server error")
            error.status = response.status
            throw error
        }

        const data = await response.json()

        return {
            success: true,
            email: data.email,
            id: data.id
        }
    } catch (error) {
        clearTimeout(timer)

        if (error.name === "AbortError") {
            return {
                success: false,
                message: "Request timeout",
                status: 408
            }
        }

        return {
            success: false,
            status: error.status || 500,
            message: error.message
        }
    }
}


export const api = {

    post: (endpoint , userData) => 
        request(endpoint , {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(userData)
        }),
    
    get: (endpoint) => 
        request(endpoint , {
            method: "GET",
            credentials: "include"
        }),
    
    patch: (endpoint , userData) =>
        request(endpoint , {
            method: "PATCH",
            body: JSON.stringify(userData)
        })
    

}
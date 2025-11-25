const BASE_URL = process.env.REACT_APP_API_URL

const request = async (endpoint , options={}) => {
    const url = `${BASE_URL}${endpoint}`

    const controller = new AbortController()
    const timer = setTimeout(() => {
        controller.abort()
    } , 8000)

    const config = {
        headers: {
        'Content-Type': "application/json",
        ...options.headers
        },
        signal: controller.signal,
        ...options
    }

    try {
        clearTimeout(timer)
        const response = await fetch(url , config)

        if(!response.ok) {
            const errorData = await response.json()
            const error = new Error(errorData.message || "Server error")
            error.status = response.status
            throw error
        }

        const data = await response.json()

        return {
            success: true,
            access_token: data.token
        }
    } catch (error) {
        clearTimeout(timeout)

        if (error.name === "AbortError") {
            return {
                success: false,
                status: 408
            }
        }

        return {
            success: false,
            status: error.status || 500
        }
    }
}



// начало отсюда (вызываем в коде эти методы) и только потом в функцию request
export const api = {

    post: (endpoint , data) => 
        request(endpoint , {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data)
        })

}
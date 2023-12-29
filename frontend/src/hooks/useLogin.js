import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

/**
 * Creates a custom context hook for state management 
 * of user that logs in. Makes a POST request for authentication 
 * of user and stores email and token in local storage 
 * to keep them logged in till the token expires
 */
export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    const { dispatch } = useAuthContext()

    const login = async(email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN_USER', payload: json})
            setIsLoading(false)
        }

    }

    return { login, isLoading, error }
}
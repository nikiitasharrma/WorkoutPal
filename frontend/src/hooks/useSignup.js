import { useAuthContext } from "./useAuthContext"
import { useState } from "react"

/**
 * Creates a custom context hook for state management 
 * of user that signs up. Makes a POST request to create 
 * the user in db and stores email and token in local 
 * storage to keep them logged in till the token expires
 */
export const useSignup = () => {
    
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)

    const { dispatch } = useAuthContext()

    const signup = async(email, password) => {
        setIsLoading(true)
        setError(null) //resetting error to null

        const response = await fetch('/api/user/signup',{
            method: "POST",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        })

        const json = await response.json() 

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save the user to local storage (jwt and email)
            localStorage.setItem('user', JSON.stringify(json))
            //update authContext
            dispatch({type: 'LOGIN_USER', payload: json})
            setIsLoading(false)
        }

    }
    return { signup, isLoading, error }
}
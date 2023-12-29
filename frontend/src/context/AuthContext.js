import { createContext, useReducer, useEffect } from 'react'

/**
 * Creates an auth context for state management of user
 */
export const AuthContext = createContext()

/**
 * defines a reducer function to handle state updates 
 * based on dispatch actions.
 * Determines type of action and updates user state accordingly.
 */
export const authReducer = (state, action)=>{
    switch(action.type){
        case 'LOGIN_USER':
            return{
                user: action.payload
            }
        case 'LOGOUT_USER':
            return{
                user: null
            }
        default:
            return state
    }
}

export const  AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(authReducer,{
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type: 'LOGIN_USER', payload: user})
        }
    }, [])

    console.log('AuthContext state: ', state)

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}


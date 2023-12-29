import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

/**
 * Creates a custom context hook for state management of users
 */
export const useAuthContext = ()=>{
    const context = useContext(AuthContext);

    if(!context){
        throw Error('useAuthContext hook must be used inside the AuthContextProvider')
    }

    return context
}
import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

/**
 * Creates a custom context hook for state management 
 * of user that logs out
 */
export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT_USER'})
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}
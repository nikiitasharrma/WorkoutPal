import {createContext, useReducer} from 'react'

/**
 * Creates  WorkoutsContext for managing state for workouts
 */
export const WorkoutsContext = createContext()

/**
 * defines a reducer function to handle state updates 
 * based on dispatch actions.
 * Determines type of action and updates workouts state accordingly.
 */
export const WorkoutsReducer=(state, action)=>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return{
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                workouts:[action.payload, ...state.workouts]
            }
        case "DELETE_WORKOUT":
            return{
                workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
            }
        default:
            return state
    }

}

/**
 * Creates a provider component to wrap the root application and
 * returns the provider with the state and dispatch function as context 
 * values making them available to be accessed by all wrapped components.
 * 
 */
export const WorkoutsContextProvider =({children})=>{

    const [state, dispatch] = useReducer(WorkoutsReducer,{
        workouts: null
    })
    return(
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}
import { WorkoutsContext } from "../context/WorkoutsContext";
import { useContext } from "react";

/**
 * Creates a custom context hook for state management of workouts
 */
export const useWorkoutsContext=()=>{
    const context = useContext(WorkoutsContext)

    if(!context){
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
    }

    return context
}
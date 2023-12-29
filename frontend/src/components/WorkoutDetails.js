import { useAuthContext } from "../hooks/useAuthContext"
import {useWorkoutsContext} from "../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

/**
 * Displays a proped workout as title,reps, load and creation time.
 * Sends a DELETE request when the delete button is clicked.
 */
const WorkoutDetails = ({workout})=>{
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleClick = async()=>{
        if(!user){
            return
        }
        const response = await fetch('/api/workouts/'+ workout._id,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json() //workout that has been deleted
        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails
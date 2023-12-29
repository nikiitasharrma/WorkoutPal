import { Link } from "react-router-dom" 
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

/**
 * If a user exists, displays it's email and logout button
 * If user doesn't exist, displays Login and SignIn buttons
 */
const Navbar = ()=>{
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }

    return(
        <header>
            <div className="container">
                <Link to='/'>
                    <h2>Workout Pal</h2>
                </Link>
                <nav>
                    {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>)}
                    {!user && (
                    <div>
                        <Link to='/login'>Log In</Link>
                        <Link to='/signup'>Sign up</Link>
                    </div>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
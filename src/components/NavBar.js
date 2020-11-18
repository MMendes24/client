import React from "react"
import { Link, useHistory } from "react-router-dom"

const NavBar = () => {
    const id = localStorage.getItem("user")
    const history = useHistory()

    const logOut = () => {
        localStorage.clear()
        history.push("/")
    }

    return (
        <div>
            <h2>Campaign Journal</h2>
            <nav>
                <Link to={`/home/${id}`}>Home</Link>
                <button onClick={logOut}>Log Out</button>
            </nav>

        </div>
    )
}

export default NavBar
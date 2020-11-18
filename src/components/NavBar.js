import React from "react"
import { useHistory } from "react-router-dom"
import Link from '@material-ui/core/Link';

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

                <Link
                    component="button"
                    variant="button"
                    onClick={() => {
                        history.push(`/home/${id}`);
                    }}
                >
                    Home
                </Link>

                <Link
                    component="button"
                    variant="button"
                    onClick={logOut}
                >
                    Log Out
                </Link>
            </nav>

        </div>
    )
}

export default NavBar
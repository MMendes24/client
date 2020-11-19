import React from "react"
import { useHistory } from "react-router-dom"

// styling
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    navLink: {
        fontSize: 18,
        margin: theme.spacing(1),
    }
}));

const NavBar = () => {
    const id = localStorage.getItem("user")
    const history = useHistory()

    const classes = useStyles()

    const logOut = () => {
        localStorage.clear()
        history.push("/")
    }

    return (
        <Grid
        className={classes.root}
        container
        direction="row"
        justify="flex-start`"
        alignItems="center"
        >
            <Typography variant="h2" gutterBottom>Campaign Journal</Typography>
            <nav>

                <Link
                    className={classes.navLink}
                    component="button"
                    variant="button"
                    onClick={() => {
                        history.push(`/home/${id}`);
                    }}
                >
                    Home
                </Link>

                <Link
                    className={classes.navLink}
                    component="button"
                    variant="button"
                    onClick={logOut}
                >
                    Log Out
                </Link>
            </nav>
        </Grid>
    )
}

export default NavBar
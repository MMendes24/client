import React from "react"
import { useHistory } from "react-router-dom"

// styling
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    navLink: {
        fontSize: 20,
        margin: theme.spacing(1),
    },
    "&:hover": {
        color: "#262626"
    }
}));

const NavBar = () => {
    // for material-ui
    const classes = useStyles();

    const history = useHistory()

    const logOut = () => {
        localStorage.clear()
        history.push("/")
    }

    return (
        <Grid
            className={classes.root}
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            <header>
                <Link
                    variant="h2"
                    gutterBottom
                    onClick={() => {
                        history.push(`/home/${localStorage.getItem("user")}`);
                    }}

                >
                    Campaign Journal
                    </Link>
            </header>
            <nav>

                <Link
                    className={classes.navLink}
                    component="button"
                    variant="button"
                    onClick={() => {
                        history.push(`/home/${localStorage.getItem("user")}`);
                    }}
                >
                    Home
                </Link>

                <Link
                    className={classes.navLink}
                    component="button"
                    variant="button"
                    color="secondary"
                    onClick={logOut}
                >
                    Log Out
                </Link>
            </nav>
        </Grid>
    )
}

export default NavBar
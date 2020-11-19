import React from "react"
import { useHistory } from "react-router-dom"

//styling
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: "100%"
        },
    },
}));


const Campaign = (props) => {
    // for material-ui
    const classes = useStyles();

    const history = useHistory()

    const { name, desc, id } = props.campaign


    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Card>
                <CardContent>
                    <Typography variant="h2" gutterBottom>{name}</Typography>
                    <Typography variant="h3" gutterBottom>{desc}</Typography>
                    <CardActions>
                        <Button color="primary" size="medium" variant="contained" onClick={() => history.push(`/campaign/${id}`)}>More</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Campaign
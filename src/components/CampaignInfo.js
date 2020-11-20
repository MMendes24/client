import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import axiosAuth from "../utils/axiosAuth"

//styling
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: "50%"
        },
    },
    cardStyles: {
        margin: theme.spacing(1),
        background: "#262626"
    },
    buttonGeneric: {
        margin: theme.spacing(0.5),
    }
}));


const CampaignInfo = (props) => {
    // for material-ui
    const classes = useStyles();

    //setting state
    const [camp, setCamp] = useState([])
    const [worlds, setWorlds] = useState([])
    const [chars, setChars] = useState([])
    const [countries, setCountries] = useState([])

    //grabbing campaign id
    const { id } = useParams()
    const history = useHistory()

    const getCamps = () => {
        axiosAuth()
            .get(`campaigns/${id}`)
            .then(res => {
                setCamp(res.data.campaigns)
            })
            .catch(err => {
                console.log("didn't work")
            })
    }

    const getWorlds = () => {
        axiosAuth()
            .get(`/campaigns/${id}/worlds`)
            .then(res => {
                setWorlds(res.data.worlds)
            })
            .catch(err => {
                console.error("Failed to GET worlds!")
            })
    }

    const getChars = () => {
        axiosAuth()
            .get(`/campaigns/${id}/characters`)
            .then(res => {
                setChars(res.data.characters)
            })
            .catch(err => {
                console.error("Failed to GET characters!")
            })
    }

    const getCountries = () => {
        axiosAuth()
            .get(`/campaigns/${id}/countries`)
            .then(res => {
                setCountries(res.data.countries)
            })
            .catch(err => {
                console.error("Failed to GET countries!")
            })
    }

    const deleteCamp = () => {
        axiosAuth()
            .delete(`campaigns/${id}`)
            .then(res => {
                const dashId = localStorage.getItem("user")
                history.push(`/home/${dashId}`)
            })
            .catch(err => {
                console.log("didn't work")
            })
    }

    const deleteWorld = (world) => {
        axiosAuth()
            .delete(`/campaigns/${id}/worlds/${world}`)
            .then(res => {
                getWorlds()
            })
            .catch(err => {
                console.error("Failed to delete worlds!")
            })
    }

    const deleteChar = (char) => {
        axiosAuth()
            .delete(`/campaigns/${id}/characters/${char}`)
            .then(res => {
                getChars()
            })
            .catch(err => {
                console.error("Failed to delete characters!")
            })
    }

    const deleteCountry = (country) => {
        axiosAuth()
            .delete(`/campaigns/${id}/countries/${country}`)
            .then(res => {
                getCountries()
            })
            .catch(err => {
                console.error("Failed to delete countries!")
            })
    }

    useEffect(() => {
        getCamps()
        getWorlds()
        getChars()
        getCountries()
    }, [])

    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <section>
                <Typography variant="h1" gutterBottom>
                    Campaign
                </Typography>
                <Typography variant="h3" gutterBottom>{camp.name}</Typography>
                <Typography variant="h3" gutterBottom>{camp.desc}</Typography>
                <Button className={classes.buttonGeneric} variant="outlined" color="primary" onClick={() => history.push(`/campaign/${id}/edit`)}>Edit</Button>
                <Button className={classes.buttonGeneric} variant="outlined" color="secondary" onClick={() => deleteCamp()}>Delete</Button>
            </section>

            <section>
                <Typography variant="h2" gutterBottom>Worlds</Typography>
                <Button variant="contained" size="large" color="primary" onClick={() => history.push(`/campaign/${id}/add-world`)}>Create World</Button>
                {worlds.map(world => (
                    <Card className={classes.cardStyles} key={world.id}>
                        <CardContent>
                            <Typography variant="h3" gutterBottom>{world.name}</Typography>
                            <Typography variant="h5" gutterBottom>Description: {world.description}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" color="primary" onClick={() => history.push(`/campaign/${id}/worlds/${world.id}/edit-world`)}>Edit</Button>
                            <Button variant="outlined" color="secondary" onClick={() => deleteWorld(world.id)}>Delete</Button>
                        </CardActions>
                    </Card>
                ))}
            </section>

            <section>
                <Typography variant="h2" gutterBottom>Characters</Typography>
                <Button variant="contained" size="large" color="primary" onClick={() => history.push(`/campaign/${id}/add-char`)}>Add Character</Button>
                {chars.map(char => (
                    <Card className={classes.cardStyles} key={char.id}>
                        <CardContent>
                            <Typography variant="h3" gutterBottom>{char.name}</Typography>
                            <Typography variant="h5" gutterBottom>Description: {char.description}</Typography>
                            <Typography variant="h5" gutterBottom>Ancestry: {char.ancestry}</Typography>
                            <Typography variant="h5" gutterBottom>Level: {char.level}</Typography>
                            <Typography variant="h5" gutterBottom>Class: {char.class}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" color="primary" onClick={() => history.push(`/campaign/${id}/characters/${char.id}/edit-char`)}>Edit</Button>
                            <Button variant="outlined" color="secondary" onClick={() => deleteChar(char.id)}>Delete</Button>
                        </CardActions>
                    </Card>
                ))}
            </section>

            <section>
                <Typography variant="h2" gutterBottom>Countries</Typography>
                <Button variant="contained" size="large" color="primary" onClick={() => history.push(`/campaign/${id}/add-country`)}>Found Country</Button>
                {countries.map(country => (
                    <Card className={classes.cardStyles} key={country.id}>
                        <CardContent>
                            <Typography variant="h3" gutterBottom>{country.name}</Typography>
                            <Typography variant="h5">Description: {country.description}</Typography>
                            <Typography variant="h5">Ruler: {country.ruler}</Typography>
                            <Typography variant="h5">Founded: {country.founded}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" color="primary" onClick={() => history.push(`/campaign/${id}/countries/${country.id}/edit-country`)}>Edit</Button>
                            <Button variant="outlined" color="secondary" onClick={() => deleteCountry(country.id)}>Delete</Button>
                        </CardActions>
                    </Card>
                ))}
            </section>
        </Grid>
    )
}

export default CampaignInfo
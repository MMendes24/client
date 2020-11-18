import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import axiosAuth from "../utils/axiosAuth"

//styling
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
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
        axiosAuth().get(`campaigns/${id}`)
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

    useEffect(() => {
        getCamps()
        getWorlds()
        getChars()
        getCountries()
    }, [])

    return (
        <div className={classes.root}>
            <section className="camp-sec">
                <Typography variant="h1" gutterBottom>
                    Campaign
                </Typography>
                <Typography variant="h3" gutterBottom>{camp.name}</Typography>
                <Typography variant="h3" gutterBottom>{camp.desc}</Typography>
                <Button variant="contained" color="primary" onClick={() => history.push(`/campaign/${id}/edit`)}>Edit</Button>
                <Button variant="contained" color="secondary">Delete</Button>
            </section>

            <section className="world-sec">
                <Typography variant="h2" gutterBottom>Worlds</Typography>
                <Button variant="contained" color="primary" onClick={() => history.push(`/campaign/${id}/add-world`)}>Create World</Button>
                {worlds.map(world => (
                    <div className="world-card" key={world.id}>
                        <Typography variant="h3" gutterBottom>{world.name}</Typography>
                        <Typography variant="h5" gutterBottom>Description: {world.description}</Typography>
                        <Button variant="contained" color="primary" onClick={() => history.push(`/campaign/${id}/worlds/${world.id}/edit-world`)}>Edit</Button>
                        <Button variant="contained" color="secondary">Delete</Button>
                    </div>
                ))}
            </section>

            <section className="char-sec">
                <Typography variant="h2" gutterBottom>Characters</Typography>
                <Button variant="contained" color="primary" onClick={() => history.push(`/campaign/${id}/add-char`)}>Add Character</Button>
                {chars.map(char => (
                    <div className="char-card" key={char.id}>
                        <Typography variant="h3" gutterBottom>{char.name}</Typography>
                        <Typography variant="h5" gutterBottom>Description: {char.description}</Typography>
                        <Typography variant="h5" gutterBottom>Ancestry: {char.ancestry}</Typography>
                        <Typography variant="h5" gutterBottom>Level: {char.level}</Typography>
                        <Typography variant="h5" gutterBottom>Class: {char.class}</Typography>
                        <Button variant="contained" color="primary" onClick={() => history.push(`/campaign/${id}/characters/${char.id}/edit-char`)}>Edit</Button>
                        <Button variant="contained" color="secondary">Delete</Button>
                    </div>
                ))}
            </section>

            <section className="countries-sec">
                <Button variant="contained" color="primary" onClick={() => history.push(`/campaign/${id}/add-country`)}>Found Country</Button>
                <Typography variant="h2" gutterBottom>Countries</Typography>
                {countries.map(country => (
                    <div className="country-card" key={country.id}>
                        <Typography variant="h3" gutterBottom>{country.name}</Typography>
                        <Typography variant="h5">Description: {country.description}</Typography>
                        <Typography variant="h5">Ruler: {country.ruler}</Typography>
                        <Typography variant="h5">Founded: {country.founded}</Typography>
                        <Button variant="contained" color="primary" onClick={() => history.push(`/campaign/${id}/countries/${country.id}/edit-country`)}>Edit</Button>
                        <Button variant="contained" color="secondary">Delete</Button>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default CampaignInfo
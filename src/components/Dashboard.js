import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import axiosAuth from "../utils/axiosAuth"

import Campaign from "./Campaign"

//styling
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    buttonStyles: {
        margin: theme.spacing(2),
    }
}));

const Dashboard = (props) => {
    // for material-ui
    const classes = useStyles();

    const [campaigns, setCampaigns] = useState([])
    const { id } = useParams()
    const history = useHistory()

    const getCampaigns = () => {
        const verify = localStorage.getItem("user")
        if (verify === id) {
            axiosAuth().get(`campaigns/user-campaigns/${id}`)
                .then(res => {
                    console.log(res.data)
                    setCampaigns(res.data.campaigns)
                })
                .catch(err => {
                    console.log("didn't work")
                })
        } else {
            console.error("You are not the authorized user.")
        }
    }

    useEffect(() => {
        getCampaigns()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Typography variant="h2" gutterBottom>Your Campaigns</Typography>
            <section className="card-catalogue">
                {campaigns.map(campaign => (
                    <Campaign key={campaign.id} campaign={campaign} />
                ))}
            </section>
            <Button className={classes.buttonStyles} color="primary" size="large" variant="contained" onClick={() => history.push(`/add-campaign/${id}`)}>New Campaign</Button>
        </Grid>
    )
}

export default Dashboard
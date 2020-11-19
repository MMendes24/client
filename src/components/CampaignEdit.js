import React, { useEffect, useState } from "react"
import axiosAuth from "../utils/axiosAuth"
import { useHistory, useParams } from "react-router-dom"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

//styling
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    buttonStyles: {
        fontSize: 14,
        margin: theme.spacing(2),
        width: "10%"
    },
    categoryClass: {
        fontSize: 16,
        width: "20%"
    },
    descClass: {
        fontSize: 16,
        width: "20%"
    }
}));

const campaignEditSchema = Yup.object({
    name: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    description: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
})

const initialCamp = {
    name: "",
    description: "",
    user_id: ""
}

const CampaignEdit = () => {
    // for material ui
    const classes = useStyles()

    const history = useHistory()
    const { id } = useParams()
    const [camp, setCamp] = useState(initialCamp)

    const getCampaign = () => {
        axiosAuth()
            .get(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}`)
            .then(res => {
                console.log("Data retrieved")
                setCamp({
                    name: res.data.campaigns.name,
                    description: res.data.campaigns.description,
                    user_id: res.data.campaigns.user_id
                })
            })
            .catch(err => {
                console.error("Unable to GET campaign")
            })
    }

    const editCampaign = (values) => {
        axiosAuth()
            .put(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}`, values)
            .then(res => {
                console.log("Updated successfully")
                history.push(`/campaign/${id}`)
            })
            .catch(err => {
                console.error("Data rejected")
            })
    }

    useEffect(() => {
        getCampaign()
    }, [])

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: camp.name,
                description: camp.description,
                user_id: camp.user_id
            }}
            validationSchema={campaignEditSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                editCampaign(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <Grid
                        className={classes.root}
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography variant="h3" gutterBottom>Campaign Title:</Typography>
                        <Field className={classes.categoryClass} type="text" name="name" />

                        {errors.name && touched.name ? (
                            <div className="error">{errors.name}</div>
                        ) : null}

                        <Typography variant="h3" gutterBottom>Campaign Description:</Typography>
                        <Field className={classes.descClass} component="textarea" rows="12" name="description" />

                        {errors.description && touched.description ? (
                            <div className="error">{errors.description}</div>
                        ) : null}
                        <Button className={classes.buttonStyles} color="primary" size="large" variant="contained" type="submit" disabled={isSubmitting}>
                            Edit
                        </Button>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default CampaignEdit
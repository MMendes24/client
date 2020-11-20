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
    },
    error: {
        fontSize: 14
    }
}));


const countryEditSchema = Yup.object({
    name: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    description: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    ruler: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    founded: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
})

const initialCountry = {
    campaign_id: "",
    name: "",
    founded: "",
    ruler: "",
    description: "",
}

const CountryEdit = () => {
    // for material ui
    const classes = useStyles()

    const history = useHistory()
    const { id, countryId } = useParams()
    const [country, setCountry] = useState(initialCountry)

    const getCountry = () => {
        axiosAuth()
            .get(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/countries/${countryId}`)
            .then(res => {
                console.log("Data retrieved")
                setCountry({
                    campaign_id: res.data.country.campaign_id,
                    name: res.data.country.name,
                    founded: res.data.country.founded,
                    ruler: res.data.country.ruler,
                    description: res.data.country.description,
                })
            })
            .catch(err => {
                console.error("Unable to GET world")
            })
    }

    const editCountry = (values) => {
        axiosAuth()
            .put(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/countries/${countryId}`, values)
            .then(res => {
                console.log("Updated successfully")
                history.push(`/campaign/${id}`)
            })
            .catch(err => {
                console.error("Data rejected")
            })
    }

    useEffect(() => {
        getCountry()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Formik
            enableReinitialize
            initialValues={{
                campaign_id: country.campaign_id,
                name: country.name,
                founded: country.founded,
                ruler: country.ruler,
                description: country.description,
            }}
            validationSchema={countryEditSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                editCountry(values)
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
                        <Typography variant="h3" gutterBottom>Country's Name:</Typography>
                        <Field className={classes.categoryClass} type="text" name="name" />

                        {errors.name && touched.name ? (
                            <Typography className={classes.error} variant="body1" gutterBottom color="error">{errors.name}</Typography>
                        ) : null}


                        <Typography variant="h3" gutterBottom>Country's Ruler:</Typography>
                        <Field className={classes.categoryClass} type="text" name="ruler" />

                        {errors.ruler && touched.ruler ? (
                            <Typography className={classes.error} variant="body1" gutterBottom color="error">{errors.ruler}</Typography>
                        ) : null}

                        <Typography variant="h3" gutterBottom>Founded</Typography>
                        <Field className={classes.categoryClass} type="text" name="founded" />

                        {errors.founded && touched.founded ? (
                            <Typography className={classes.error} variant="body1" gutterBottom color="error">{errors.founded}</Typography>
                        ) : null}

                        <Typography variant="h3" gutterBottom>Character's Description:</Typography>
                        <Field className={classes.descClass} component="textarea" rows="12" name="description" />

                        {errors.description && touched.description ? (
                            <Typography className={classes.error} variant="body1" gutterBottom color="error">{errors.description}</Typography>
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

export default CountryEdit
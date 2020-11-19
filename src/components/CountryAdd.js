import React from "react"
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

const countryAddchema = Yup.object({
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

const CountryAdd = () => {
    // for material ui
    const classes = useStyles()

    const history = useHistory()
    const { id } = useParams()

    const createCountry = (values) => {
        axiosAuth()
            .post(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/countries`, values)
            .then(res => {
                console.log("Data sent")
                history.push(`/campaign/${id}`)
            })
            .catch(res => {
                console.error("Data rejected")
            })
    }

    return (
        <Formik
            initialValues={{
                campaign_id: parseInt(id, 10),
                name: "",
                ruler: "",
                founded: "",
                description: "",
            }}
            validationSchema={countryAddchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                createCountry(values)
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

                        <Typography variant="h3" gutterBottom>Country's Description:</Typography>
                        <Field className={classes.descClass} component="textarea" rows="12" name="description" />

                        {errors.description && touched.description ? (
                            <Typography className={classes.error} variant="body1" gutterBottom color="error">{errors.description}</Typography>
                        ) : null}

                        <Button className={classes.buttonStyles} color="primary" size="large" variant="contained" type="submit" disabled={isSubmitting}>
                            Create
                        </Button>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default CountryAdd
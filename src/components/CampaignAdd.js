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
            margin: theme.spacing(1),
        },
    },
    buttonStyles: {
        margin: theme.spacing(2),
    }
}));

const campaignAddSchema = Yup.object({
    name: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    description: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
})


const CampaignAdd = () => {
    // for material ui
    const classes = useStyles()

    const history = useHistory()
    const { id } = useParams()

    const createCampaign = (values) => {
        axiosAuth()
            .post("https://campaign-journal-api.herokuapp.com/api/campaigns", values)
            .then(res => {
                console.log("Data sent")
                history.push(`/home/${id}`)
            })
            .catch(res => {
                console.log(values)
                console.error("Data rejected")
            })
    }

    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
                user_id: parseInt(id, 10)
            }}
            validationSchema={campaignAddSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                createCampaign(values)
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
                        <Field type="text" name="name" />

                        {errors.name && touched.name ? (
                            <Typography variant="body1" color="error">{errors.name}</Typography>
                        ) : null}

                        <Typography variant="h3" gutterBottom>Campaign Description:</Typography>
                        <Field type="text" name="description" />

                        {errors.description && touched.description ? (
                            <Typography variant="body1" color="error">{errors.description}</Typography>
                        ) : null}

                        <Button color="primary" size="large" variant="contained" type="submit" disabled={isSubmitting}>
                            Submit
                    </Button>
                    </Grid>
                </Form>

            )}
        </Formik>
    )
}

export default CampaignAdd
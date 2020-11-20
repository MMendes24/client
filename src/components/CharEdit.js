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

const charEditchema = Yup.object({
    name: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    description: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    ancestry: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    class: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
})


const initialChar = {
    campaign_id: "",
    name: "",
    level: "",
    class: "",
    ancestry: "",
    description: "",
}

const CharEdit = () => {
    // for material ui
    const classes = useStyles()

    const history = useHistory()
    const { id, charId } = useParams()
    const [char, setChar] = useState(initialChar)

    const getChar = () => {
        axiosAuth()
            .get(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/characters/${charId}`)
            .then(res => {
                console.log("Data retrieved")
                console.log(res.data)
                setChar({
                    campaign_id: res.data.character.campaign_id,
                    name: res.data.character.name,
                    level: res.data.character.level,
                    class: res.data.character.class,
                    ancestry: res.data.character.ancestry,
                    description: res.data.character.description,
                })
            })
            .catch(err => {
                console.error("Unable to GET world")
            })
    }

    const editChar = (values) => {
        axiosAuth()
            .put(`https://campaign-journal-api.herokuapp.com/api/campaigns/${id}/characters/${charId}`, values)
            .then(res => {
                console.log("Updated successfully")
                history.push(`/campaign/${id}`)
            })
            .catch(err => {
                console.error("Data rejected")
            })
    }

    useEffect(() => {
        getChar()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Formik
            enableReinitialize
            initialValues={{
                campaign_id: char.campaign_id,
                name: char.name,
                level: char.level,
                class: char.class,
                ancestry: char.ancestry,
                description: char.description,
            }}
            validationSchema={charEditchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                editChar(values)
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
                        <Typography variant="h3" gutterBottom>Character's Name:</Typography>
                        <Field className={classes.categoryClass} type="text" name="name" />

                        {errors.name && touched.name ? (
                            <Typography className={classes.error} variant="body1" gutterBottom color="error">{errors.name}</Typography>
                        ) : null}

                        <Typography variant="h3" gutterBottom>Character's Ancestry:</Typography>
                        <Field className={classes.categoryClass} type="text" name="ancestry" />

                        {errors.ancestry && touched.ancestry ? (
                            <Typography className={classes.error} variant="body1" gutterBottom color="error">{errors.ancestry}</Typography>
                        ) : null}

                        <Typography variant="h3" gutterBottom>Character's Class:</Typography>
                        <Field className={classes.categoryClass} type="text" name="class" />

                        {errors.class && touched.class ? (
                            <Typography className={classes.error} variant="body1" gutterBottom color="error">{errors.class}</Typography>
                        ) : null}

                        <Typography variant="h3" gutterBottom>Character's Level</Typography>
                        <Field as="select" name="level">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                        </Field>

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

export default CharEdit
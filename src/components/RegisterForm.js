import React from "react"
import axios from "axios"
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
    },
    error: {
        fontSize: 14
    }
}));


const registerSchema = Yup.object({
    username: Yup.string()
        .max(256, 'Maximum length of 256 characters and it must be unique.')
        .required('Required.'),
    password: Yup.string()
        .max(256, 'Maximum length of 256 characters.')
        .required('Required.'),
    email: Yup.string().email()
        .max(256, 'Enter a valid and unique email address.')
        .required('Required.'),
})

const RegisterForm = () => {
    // for material ui
    const classes = useStyles()

    const userRegister = (values) => {
        axios.post("https://campaign-journal-api.herokuapp.com/api/users/register", values)
            .then(res => {
                console.log("Data sent")
            })
            .catch(res => {
                console.log("Data rejected")
            })
    }

    return (
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    email: "",
                }}
                validationSchema={registerSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    userRegister(values)
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
                            <Typography variant="h2" gutterBottom>Register</Typography>
                            <Typography variant="h4" gutterBottom>Username:</Typography>
                            <Field type="username" name="username" />

                            {errors.username && touched.username ? (
                                <Typography variant="body1" color="error" className={classes.error}>{errors.username}</Typography>
                            ) : null}

                            <Typography variant="h4" gutterBottom>Password:</Typography>
                            <Field type="password" name="password" />

                            {errors.password && touched.password ? (
                                <Typography variant="body1" color="error" className={classes.error}>{errors.password}</Typography>
                            ) : null}

                            <Typography variant="h4" gutterBottom>Email</Typography>
                            <Field type="password" name="email" />

                            {errors.email && touched.email ? (
                                <Typography variant="body1" color="error" className={classes.error}>{errors.email}</Typography>
                            ) : null}

                            <Button className={classes.buttonStyles} color="primary" size="large" variant="contained" type="submit" disabled={isSubmitting}>
                                Register
                            </Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
    )
}

export default RegisterForm
import React from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Formik, Form, Field } from "formik"
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
    formStyles: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    registerButton: {
        fontSize: 16,
    },
    buttonStyles: {
        fontSize: 18,
        width: "50%"
    },
    error: {
        fontSize: 14
    }
}));

const loginSchema = Yup.object({
    username: Yup.string()
        .max(256, "Please enter a valid username.")
        .required("Required."),
    password: Yup.string()
        .max(256, "Please enter a valid password.")
        .required("Required."),
})

const LoginForm = () => {
    // for material ui
    const classes = useStyles()

    const history = useHistory()

    const userLogin = (values) => {
        axios.post("https://campaign-journal-api.herokuapp.com/api/users/login", values)
            .then(res => {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", res.data.user.id);
                const id = res.data.user.id
                history.push(`/home/${id}`)
            })
            .catch(err => {
                console.error("Invalid data")
            })
    }

    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Typography variant="h1" gutterBottom>Campaign Journal</Typography>
            <Typography variant="h2" gutterBottom>The most fantastical app on the web!</Typography>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    userLogin(values)
                    setSubmitting(false)
                    resetForm()
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Grid
                            className={classes.formStyles}
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Typography variant="h2" gutterBottom>Login</Typography>
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

                            <Button className={classes.buttonStyles} color="primary" size="large" variant="contained" type="submit" disabled={isSubmitting}>
                                Login
                            </Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Typography variant="h3" gutterBottom>Don't have an account yet? <Button color="primary" size="large" className={classes.registerButton} onClick={() => history.push("/register")}>Register here!</Button></Typography>
        </Grid>
    )
}

export default LoginForm
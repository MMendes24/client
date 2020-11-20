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
    background: {
        width: "50%"
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
        className="bg"
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
            <header>
                <h1>Campaign Journal</h1>
                <h2>The most fantastical app on the web!</h2>
            </header>
            <section>
                <h2>Login</h2>
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
                            <label>Username:</label>
                            <Field type="username" name="username" />

                            {errors.username && touched.username ? (
                                <div className="error">{errors.username}</div>
                            ) : null}

                            <label>Password:</label>
                            <Field type="password" name="password" />

                            {errors.password && touched.password ? (
                                <div className="error">{errors.password}</div>
                            ) : null}

                            <button type="submit" disabled={isSubmitting}>
                                Submit
                        </button>
                        </Form>
                    )}
                </Formik>
                <h3>Don't have an account yet? Register here!</h3>
            </section>
        </Grid>
    )
}

export default LoginForm
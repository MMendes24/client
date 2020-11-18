import React from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

const loginSchema = Yup.object({
    username: Yup.string()
        .max(256, "Please enter a valid username.")
        .required("Required."),
    password: Yup.string()
        .max(256, "Please enter a valid password.")
        .required("Required."),
})

const LoginForm = () => {
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
        <div>
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
        </div>
    )
}

export default LoginForm
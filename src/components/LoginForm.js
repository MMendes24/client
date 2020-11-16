import React from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { Formik, Form, Field } from "formik"

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
                console.log("are you serious?")
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
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        userLogin(values)
                        setSubmitting(false)
                        resetForm()
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="username" name="username" />
                            <Field type="password" name="password" />
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
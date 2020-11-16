import React from "react"
import axios from "axios"
import { Formik, Form, Field } from "formik"

const LoginForm = () => {

    const userLogin = (values) => {
        axios.post("https://campaign-journal-api.herokuapp.com/api/users/login", values)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token);
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
                    initialValues={{ username: '', password: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            userLogin(values)
                            setSubmitting(false);
                        }, 400)
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
            </section>
        </div>
    )
}

export default LoginForm